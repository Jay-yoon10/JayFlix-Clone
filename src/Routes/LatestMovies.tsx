import React from 'react';
// import { Box, boxVariants, Info, infoVariants } from './Home';
// import { makeImagePath } from './utils';

// interface ILatestMovies {
//   movie: {
//     id: number;
//     title: string;
//     backdrop_path: string;
//   };
//   onBoxClicked(movieId: number): void;
// }
// export default function LatestMovies({ movie, onBoxClicked }: ILatestMovies) {
//   return (
//     <Box
//       layoutId={movie.id + ''}
//       key={movie.id}
//       whileHover='hover'
//       initial='normal'
//       variants={boxVariants}
//       transition={{ type: 'tween' }}
//       bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
//       onClick={() => onBoxClicked(movie.id)}
//     >
//       <Info variants={infoVariants}>
//         <h4>{movie.title}</h4>
//       </Info>
//     </Box>
//   );
// }
