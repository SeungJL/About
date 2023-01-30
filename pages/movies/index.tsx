// import styled from "styled-components";
// import { useEffect, useState } from "react";
// import { fetchMovies } from "../../api/api";
// import { useQuery } from "react-query";
// import { useRouter } from "next/router";

// import Link from "next/link";
// import Seo from "../../components/Seo";

// /*styled-components*/
// const Container = styled.div`
//   padding: 0px 20px;
//   max-width: 480px;
//   margin: 0 auto;
//   height: 100%;
//   overflow: auto;
//   &::-webkit-scrollbar {
//     width: 1px;
//   }
// `;
// const Rank = styled.span`
//   font-weight: 600;
//   color: #fde8e6;
// `;
// const MovieList = styled.div``;
// const Movie = styled.div`
//   padding: 2px;

//   color: white;
//   font-size: 20px;
//   margin-bottom: 10px;
//   border-bottom: 1px solid RGB(253, 232, 230, 0.8);
//   a {
//     padding: 8px;
//     transition: color 0.2s ease-in;
//     display: block;
//   }
//   &:hover {
//     a {
//       color: ${(props) => props.theme.accentColor};
//     }
//   }
// `;
// const MovieTitle = styled.span`
//   font-weight: 400;
//   font-size: 18px;
// `;
// const Title = styled.h1`
//   font-family: "Courgette", cursive;
//   color: #fde8e6;
//   text-shadow: 1px 1px 1px pink;
//   font-size: 40px;
//   margin: 20px 0;
// `;
// const Loader = styled.span`
//   text-align: center;
//   display: block;
// `;
// interface IMovie {
//   rank: string;
//   movieNm: string;
//   openDt: string;
//   audiAcc: string;
//   audiChange: string;
//   movieCd: string;
// }
// var dayjs = require("dayjs");
// const currentDay = Number(dayjs().format("YYYYMMDD"));
// const Movies = () => {
//   const { isLoading, data } = useQuery("allMovies", () =>
//     fetchMovies(currentDay)
//   );
//   const router = useRouter();

//   return (
//     <Container>
//       <Seo title="Movies" />

//       <Title>Movie List - Update</Title>
//       {isLoading ? (
//         <Loader>Loading ...</Loader>
//       ) : (
//         <MovieList>
//           {data?.map((movie: any) => (
//             <Movie key={movie.movieCd}>
//               <Link
//                 href={{
//                   pathname: `/movies/${movie.movieCd}`,
//                   query: {
//                     rank: movie.rank,
//                     name: movie.movieNm,
//                     open: movie.openDt,
//                     audiAcc: movie.audiAcc,
//                     audiChange: movie.audiChange,
//                     movieCd: movie.movieCd,
//                   },
//                 }}
//                 as={`/movies/${movie.movieCd}`}
//               >
//                 <>
//                   <Rank>No.{movie.rank} &nbsp;&nbsp;</Rank>
//                   <MovieTitle>{movie.movieNm} &rarr;</MovieTitle>
//                 </>
//               </Link>
//             </Movie>
//           ))}
//         </MovieList>
//       )}
//     </Container>
//   );
// };
// export default Movies;
