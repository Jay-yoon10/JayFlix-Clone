import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IGetDataResult } from '../api';
import { makeImagePath } from '../Routes/utils';
import ReactStars from 'react-stars';
interface ISlider {
  data: IGetDataResult;
  title: string;
  type: string;
  category: string;
  list: string;
  keyword?: string;
}
const Slider = styled(motion.div)`
  position: relative;
  min-height: 17rem;
  margin-top: 5rem;
  overflow: hidden;
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;
export const Box = styled(motion.div)<{ bgPhoto: string }>`
  display: block;
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
const CategoryTitle = styled(motion.div)`
  font-size: larger;
`;
export const ButtonContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LeftButton = styled(motion.svg)`
  left: 0;
  position: absolute;
  background: hsla(0, 0, 0, 0.5);
  cursor: pointer;
  /* bottom: 0; */
  color: #fff;
  text-align: center;
  top: 5%;
  width: 4%;
  z-index: 20;
  height: 200px;
`;
export const RightButton = styled(motion.svg)`
  position: absolute;
  background: hsla(100, 0, 0, 0.5);
  cursor: pointer;
  right: 0;
  /* bottom: 0; */
  color: #fff;
  text-align: center;
  top: 5%;
  width: 4%;
  z-index: 20;
  height: 200px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 99;
`;
const SelectedMovie = styled(motion.div)`
  position: fixed;
  top: 5rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40vw;
  height: 80vh;
  overflow: auto;
  border-radius: 1.5rem;
  background-color: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.lighter};
  z-index: 100;
`;
export const Info = styled(motion.div)`
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

const SelectedMovieCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 300px;
`;
const SelectedMovieTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  /* text-align: center; */
  padding-top: 20px;
  padding-left: 10px;
  font-size: 35px;
  position: relative;
  top: -60px;
`;
const ModalWrapper = styled.div`
  display: flex;
`;
const LeftSection = styled.div`
  font-weight: bolder;
  display: flex;
  flex-direction: column;
  width: 65%;
`;
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 30%;
`;
const RightSectionInfo = styled.div`
  font-weight: bolder;
  position: relative;
  padding-left: 10px;
  top: -40px;
`;
const ReleaseDate = styled.div``;
const BigOverview = styled.p`
  position: relative;
  padding-left: 10px;
  top: -40px;
  color: ${(props) => props.theme.white.lighter};
`;

const rowVariants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.outerWidth + 180 : window.outerWidth - 180,
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.outerWidth - 180 : -window.outerWidth + 180,
  }),
};
export const boxVariants = {
  normal: { scale: 1 },

  hover: {
    scale: 1.3,
    y: -20,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: 'tween',
    },
  },
};
const categoryVariants = {
  initial: {
    opacity: 0.8,
  },
  hover: {
    scale: 1.2,
    opacity: 1,
    y: 0,
    x: 180,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: 'tween',
    },
  },
};
export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: 'tween',
    },
  },
};
export const offset = 6;

export default function Sliders({
  data,
  title,
  type,
  category,
  list,
  keyword,
}: ISlider) {
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const onOverlayClick = () => {
    if (category === 'home') navigate('/');
    if (category === 'tvHome') navigate('/tv');
    if (category === 'searchHome') navigate(`/search?keyword=${keyword}`);
  };

  const selectedMovieMatch = useMatch(`/${category}/${type}/:Id`);
  const clickedMovie =
    selectedMovieMatch?.params.Id &&
    data?.results.find(
      (movie) => String(movie.id) === selectedMovieMatch.params.Id
    );
  console.log(clickedMovie);

  const onBoxClicked = (menu: string, id: number, type?: string) => {
    if (type) {
      navigate(`/${menu}/${type}/${id}?keyword=${keyword}`);
    } else {
      navigate(`/search/${menu}/${id}?keyword=${keyword}`);
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setBack(false);
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      setBack(true);
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;

      // const minIndex =
      setIndex((prev) =>
        prev === maxIndex ? prev - 1 : prev === 0 ? maxIndex : prev - 1
      );
    }
  };

  return (
    <Slider>
      <AnimatePresence
        initial={false}
        onExitComplete={toggleLeaving}
        custom={back}
      >
        <CategoryTitle
          variants={categoryVariants}
          initial='initial'
          whileHover='hover'
          transition={{ type: 'tween' }}
        >
          {title}
        </CategoryTitle>
        <ButtonContainer>
          <LeftButton
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 720 500'
            onClick={decreaseIndex}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z' />
          </LeftButton>
        </ButtonContainer>
        <Row
          variants={rowVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          key={index}
          transition={{ type: 'tween', duration: 1 }}
          custom={back}
        >
          {data?.results
            // .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((data) => (
              <Box
                key={data.id}
                whileHover='hover'
                initial='normal'
                variants={boxVariants}
                transition={{ type: 'tween' }}
                bgPhoto={makeImagePath(data.backdrop_path, 'w500')}
                onClick={() => onBoxClicked(category, data.id, type)}
                layoutId={data.id + '' + list}
              >
                <Info variants={infoVariants}>
                  <h4>{data.title || data.name}</h4>
                </Info>
              </Box>
            ))}
        </Row>
        <ButtonContainer>
          <RightButton
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 720 500'
            onClick={increaseIndex}
          >
            <motion.path d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z' />
          </RightButton>
        </ButtonContainer>
      </AnimatePresence>
      <AnimatePresence>
        {selectedMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <SelectedMovie>
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
                  <SelectedMovieTitle>{clickedMovie.title}</SelectedMovieTitle>
                  <ModalWrapper>
                    <LeftSection>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </LeftSection>
                    <RightSection>
                      <RightSectionInfo>
                        Released date
                        <ReleaseDate>{clickedMovie.release_date}</ReleaseDate>
                      </RightSectionInfo>
                      <RightSectionInfo>
                        Average Rating
                        <ReactStars
                          count={5}
                          size={24}
                          value={
                            clickedMovie.vote_average
                              ? clickedMovie?.vote_average / 2
                              : 0
                          }
                          color1='#E6E6E6'
                          color2='#ffd700'
                        />
                      </RightSectionInfo>
                    </RightSection>
                  </ModalWrapper>
                </>
              )}
            </SelectedMovie>
          </>
        ) : null}
      </AnimatePresence>
    </Slider>
  );
}
