import styled from "styled-components";
import Header from "../components/layout/Header";

function CheckGather() {
  return (
    <Layout>
      <Header title="조모임 결과 확인" />
      <Overview>
        먼저 신청 인원을 모두 받지 못해서 죄송해요. 특히 신규 지역은 첫 모임이다
        보니 제한이 더 많았어요. 모임도 스터디도 기회는 많으니까 다음에 뵐 수
        있었으면 좋겠습니다.
      </Overview>
      <HighLightText>Enjoy the gathering!</HighLightText>
      <Main>
        <Item>
          <Location>수원</Location>
          <Teams>
            <Team>
              <span>Team A:</span>
              <Members>오승희 정진안 민 김규원 고소현</Members>
            </Team>
            <Team>
              <span>Team B:</span>
              <Members>김석훈 서윤호 이소정 정채민 신지원</Members>
            </Team>
            <Team>
              <span>Team C:</span>
              <Members>조수연 민복 하정민 권하임</Members>
            </Team>
            <Team>
              <span>Team D:</span>
              <Members>강이슬 최진영 김지훈 임채원 김다은</Members>
            </Team>
            <Team>
              <span>Team E:</span>
              <Members>성호 유회령 권혜지 엄혜민 조현정</Members>
            </Team>
            <Team>
              <span>Team F:</span>
              <Members>승주 진우 장현수 김예원 이수민 이채연</Members>
            </Team>
            <Team>
              <span>Team G:</span>
              <Members>웅섭 준형 양병연 연 구채은 예은</Members>
            </Team>
          </Teams>
        </Item>
        <Item>
          <Location>양천구/당산</Location>
          <Teams>
            <Team>
              <span>Team A:</span>
              <Members>이선호 김희석 조승원 이도경 이윤경</Members>
            </Team>
            <Team>
              <span>Team B:</span>
              <Members>이동원 김영우 형권 김예나 김다현 전라경</Members>
            </Team>
            <Team>
              <span>Team C:</span>
              <Members>재욱 김현준 정철주 박사라 박유미 전세은</Members>
            </Team>
          </Teams>
        </Item>
        <Item>
          <Location>강남 ＆ 안양</Location>
          <Teams>
            <Team>
              <span>Team A:</span>
              <Members>김은새 김현수 이서진 이채원 조혜승 최수영</Members>
            </Team>
            <Team>
              <span style={{ display: "inline-block", width: "max-content" }}>
                Team B:
              </span>
              <Members>
                박주영 김현우 임세웅 조규상 조민준 김민주 송치현 신정민
              </Members>
            </Team>
          </Teams>
        </Item>
      </Main>
    </Layout>
  );
}

const Layout = styled.div``;

const Overview = styled.div`
  margin: 0 var(--margin-main);
  padding: var(--padding-sub) 0;
  font-size: 13px;
  color: var(--font-h2);
  line-height: 1.6;
`;

const HighLightText = styled.div`
  text-align: center;
  font-size: 20px;
  color: var(--color-red);
  font-weight: 600;
  margin-bottom: var(--margin-sub);
`;

const Main = styled.main`
  margin: 0 var(--margin-main);
  margin-top: var(--margin-max);
`;

const Item = styled.div``;

const Location = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: var(--margin-main);
`;

const Teams = styled.div`
  margin-bottom: 32px;
`;

const Team = styled.div`
  display: flex;
  margin-bottom: var(--margin-sub);
  > span:first-child {
    flex: 0.16;
    margin-right: var(--margin-min);
    font-weight: 600;
  }
`;

const Members = styled.div`
  flex: 0.8;
`;

export default CheckGather;
