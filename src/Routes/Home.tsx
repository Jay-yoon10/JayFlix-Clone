import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getMovies, IGetMoviesResult } from '../api';
import styled from 'styled-components';
import { makeImagePath } from './utils';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import useWindowDimensions from '../useWindowDimensions';
import { useMatch, useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  background: black;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 4rem;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 1.5em;
  width: 50%;
  white-space: no-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Slider = styled(motion.div)`
  position: relative;
  top: -80px;
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  cursor: pointer;
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const SelectedMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  right: 0;
  margin: 0, auto;
  background-color: ${(props) => props.theme.black.lighter};
  /* margin: 0 auto; */
  border-radius: 15px;
  overflow: hidden;
`;
const SelectedMovieCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;
const SelectedMovieTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  /* text-align: center; */
  padding: 20px;
  font-size: 38px;
  position: relative;
  top: -60px;
`;
const BigOverview = styled.p`
  position: relative;
  top: -80px;
  padding: 10px;
  color: ${(props) => props.theme.white.lighter};
`;
const rowVariants = {
  hidden: {
    x: window.outerWidth - 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth + 5,
  },
};
const offset = 6;
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: 'tween',
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: 'tween',
    },
  },
};
export default function Home() {
  const navigate = useNavigate();
  const selectedMovieMatch = useMatch('/movies/:movieId');
  const width = useWindowDimensions();
  const { scrollY } = useScroll();
  console.log(width);
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ['movies', 'nowPlaying'],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const onOverlayClick = () => navigate('/');
  const clickedMovie =
    selectedMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === selectedMovieMatch.params.movieId
    );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                // variants={rowVariants}
                initial={{ x: width - 7 }}
                animate={{ x: 0 }}
                exit={{ x: -width + 7 }}
                key={index}
                transition={{ type: 'tween', duration: 1 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ''}
                      key={movie.id}
                      whileHover='hover'
                      initial='normal'
                      variants={boxVariants}
                      transition={{ type: 'tween' }}
                      bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
                      onClick={() => onBoxClicked(movie.id)}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {selectedMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <SelectedMovie
                  style={{
                    top: scrollY.get() + 50,
                    left: width / 3.4,
                  }}
                  layoutId={selectedMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <SelectedMovieCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            'w500'
                          )})`,
                        }}
                      />
                      <SelectedMovieTitle>
                        {clickedMovie.title}
                      </SelectedMovieTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </SelectedMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
