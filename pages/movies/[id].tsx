// import { useEffect, useState } from "react";
// import { useQuery } from "react-query";
// import styled from "styled-components";
// import { useSetRecoilState } from "recoil";
// import { useRouter } from "next/router";
// import { fetchDetail } from "../../api/api";

// const Container = styled.div`
//   padding: 0px 20px;
//   display: flex;
//   flex-direction: column;
// `;
// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;
// const Title = styled.span`
//   color: white;
//   font-size: 48px;
//   margin: 25px 0px;
// `;
// const BackBtn = styled.button`
//   color: white;
//   border: none;
//   margin-right: 20px;
//   background: none;
// `;
// const Overview = styled.div`
//   background: linear-gradient(
//     120deg,
//     rgba(174, 110, 70, 0.9) 0%,
//     rgba(81, 44, 17, 1) 100%
//   );
//   padding: 10px;
//   border-radius: 10px;
//   margin-bottom: 20px;
//   > span {
//     margin-right: 5px;
//   }
//   > span:nth-child(2) {
//     margin-right: 15px;
//   }
// `;

// const Content = styled.div`
//   background: linear-gradient(
//     120deg,
//     rgba(174, 110, 70, 0.9) 0%,
//     rgba(81, 44, 17, 1) 100%
//   );
//   border-radius: 10px;
//   padding: 10px;
//   > span {
//     display: inline-block;
//     margin-bottom: 5px;
//   }
// `;
// const ContentItem = styled.div`
//   > span {
//     margin-right: 5px;
//   }
//   > span:nth-child(2) {
//     margin-right: 10px;
//   }
//   margin-bottom: 5px;
// `;
// const ActorSection = styled.div`
//   > span:nth-child(odd) {
//     margin-right: 5px;
//   }
// `;
// const PeopleName = styled.div`
//   margin-bottom: 5px;
// `;

// const Tabs = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   margin: 25px 0px;
//   gap: 10px;
// `;

// const Tab = styled.span`
//   text-align: center;
//   text-transform: uppercase;
//   font-size: 12px;
//   font-weight: 400;
//   background-color: rgba(0, 0, 0, 0.5);
//   padding: 7px 0px;
//   border-radius: 10px;
// `;

// interface Iactors {
//   case: string;
//   castEn: string;
//   peopleNm: string;
//   peopleNmEn: string;
// }
// interface Idirectors {
//   peopleNm: string;
//   peopleNmEn: string;
// }
// interface Igenres {
//   genreNm: string;
// }
// interface ImovieDetail {
//   actors: Iactors[];
//   directors: Idirectors[];
//   genres: Igenres[];
//   typeNm: string;
// }
// interface ImovieBasic {
//   rank: string;
//   name: string;
//   open: string;
//   audiAcc: string;
//   audiChange: string;
//   movieCd: string;
// }
// const Movie = () => {
//   const router = useRouter();
//   const movieId = router.query.id;
//   const state: any = router.query;
//   const [movieBasic, setMovieBasic] = useState<ImovieBasic>();
//   const [basicLoading, setBasicLoading] = useState(true);

//   const { isLoading: detailLoading, data: detailData } = useQuery(
//     ["movieDetail", movieId],
//     () => fetchDetail(movieId)
//   );
//   useEffect(() => {
//     setMovieBasic(state);
//     setBasicLoading(false);
//   }, [movieId]);

//   return <>{basicLoading ? <div>Loading...</div> : <Container></Container>}</>;
// };
// export default Movie;
