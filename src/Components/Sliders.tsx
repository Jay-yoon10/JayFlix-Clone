import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IGetDataResult } from '../api';
import { makeImagePath } from '../Routes/utils';
import useWindowDimensions from '../useWindowDimensions';

interface ISlider {
  data: IGetDataResult;
  title: string;
  type: string;
  category: string;
  list: string;
}
const Slider = styled(motion.div)`
  position: relative;
  min-height: 22rem;
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
    y: -50,
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
}: ISlider) {
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const [index, setIndex] = useState(0);
  const { scrollY } = useScroll();
  const width = useWindowDimensions();
  const onOverlayClick = () => {
    if (category === 'home') category = '';
    if (type) {
      navigate(type);
    } else {
      navigate(`${category}`);
    }
  };

  const navigate = useNavigate();
  const selectedMovieMatch = useMatch(`/${category}/${type}/:Id`);
  const clickedMovie =
    selectedMovieMatch?.params.Id &&
    data?.results.find(
      (movie) => String(movie.id) === selectedMovieMatch.params.Id
    );

  console.log('selectedMovie', selectedMovieMatch);
  console.log('clickedMovie', clickedMovie);
  console.log('list', list);

  const onBoxClicked = (id: number, menu: string, type: string) => {
    navigate(`/${menu}/${type}/${id}`);
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
        <div>{title}</div>
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
                onClick={() => onBoxClicked(data.id, category, type)}
                layoutId={data.id + '' + list}
              >
                <Info variants={infoVariants}>
                  <h4>{data.title}</h4>
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
            <SelectedMovie
            // style={{
            //   top: scrollY.get() + 50,
            //   left: width / 3.4,
            // }}
            // layoutId={(selectedMovieMatch?.params.Id as any) + list}
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
                  <SelectedMovieTitle>{clickedMovie.title}</SelectedMovieTitle>
                  <BigOverview>{clickedMovie.overview}</BigOverview>
                </>
              )}
            </SelectedMovie>
          </>
        ) : null}
      </AnimatePresence>
    </Slider>
  );
}
