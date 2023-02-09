export function fetchFamousBooks() {
  return fetch("/api/book", {
    method: "get",
  }).then((response) => response.json());
}

export function fetchMovies(date: number) {
  return fetch(
    `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=${
      date - 1
    }`
  ).then((response) =>
    response
      .json()
      .then((response) => response.boxOfficeResult.dailyBoxOfficeList)
  );
}

export function fetchDetail(movieId: any) {
  return fetch(
    `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888&movieCd=${movieId}`
  )
    .then((response) => response.json())
    .then((response) => response.movieInfoResult.movieInfo);
}
export async function fetchChartData(dateArr: number[], movieId: any) {
  const dateMovie: any = await [];

  for (let i = 0; i < dateArr.length; i++) {
    let response = await fetch(
      `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=${
        dateArr[i] - 1
      }`
    ).then((response) =>
      response
        .json()
        .then((response) => response.boxOfficeResult.dailyBoxOfficeList)
    );

    let audiAcc = response.filter((item: any) => {
      return item.movieCd === movieId;
    });

    await dateMovie.push({ see: audiAcc[0].audiAcc, date: dateArr[i] - 1 });
  }
  return await dateMovie;
}
