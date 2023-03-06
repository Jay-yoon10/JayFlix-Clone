import { motion } from 'framer-motion';
// import { useQuery } from 'react-query';
// import styled from 'styled-components';
// import { IGetMoviesResult, getTopRated } from '../api';
// import useWindowDimensions from '../useWindowDimensions';
// import {
//   Box,
//   boxVariants,
//   Info,
//   infoVariants,
//   LeftButton,
//   offset,
//   RightButton,
// } from './Home';
// import { makeImagePath } from './utils';
// interface ITopRatedMovies {
//   index: number;
//   onBoxClicked(movieId: number): void;
//   toggleLeaving(): void;
// }
// const Slider = styled(motion.div)`
//   position: relative;
//   top: -80px;
// `;
// const Row = styled(motion.div)`
//   margin-top: 300px;
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
//   gap: 5px;
//   position: absolute;
//   width: 100%;
// `;

// export default function TopRatedMovies({
//   index,
//   onBoxClicked,
// }: ITopRatedMovies) {
//   const width = useWindowDimensions();
//   const { data, isLoading } = useQuery<IGetMoviesResult>(
//     ['movies', 'popular'],
//     getTopRated
//   );
//   return (
//     <>
//       <Row
//         // variants={rowVariants}
//         initial={{ x: width - 7 }}
//         animate={{ x: 0 }}
//         exit={{ x: -width + 7 }}
//         key={index}
//         transition={{ type: 'tween', duration: 1 }}
//       >
//         {data?.results
//           .slice(1)
//           .slice(offset * index, offset * index + offset)
//           .map((movie) => (
//             <>
//               <LeftButton>{'<'}</LeftButton>
//               <Box
//                 // layoutId={movie.id + ''}
//                 key={movie.id}
//                 whileHover='hover'
//                 initial='normal'
//                 variants={boxVariants}
//                 transition={{ type: 'tween' }}
//                 bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
//                 onClick={() => onBoxClicked(movie.id)}
//               >
//                 <Info variants={infoVariants}>
//                   <h4>{movie.title}</h4>
//                 </Info>
//               </Box>
//               <RightButton>{'>'}</RightButton>
//             </>
//           ))}
//       </Row>
//     </>
//   );
// }
