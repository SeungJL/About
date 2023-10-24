import styled from "styled-components";
import ProfileIcon from "../../components/common/user/Profile/ProfileIcon";

interface IReviewItemHeader {
  writer: any;
  date: string;
}

function ReviewItemHeader({ writer, date }: IReviewItemHeader) {
  const isABOUT = writer.name === "이승주";
  return (
    <Layout>
      <Profile>
        <ProfileIcon user={isABOUT ? "ABOUT" : writer} size="sm" />
        <div>
          <Writer isABOUT={isABOUT}>{isABOUT ? "어바웃" : writer.name}</Writer>
          <span>{date}</span>
        </div>
      </Profile>
      {/* <FontAwesomeIcon icon={faEllipsis} size="lg" /> */}
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 var(--margin-main);
  margin-bottom: var(--margin-sub);
  align-items: center;
`;

const Writer = styled.span<{ isABOUT: boolean }>`
  font-weight: 600;
  font-size: 13px;
  ${(props) =>
    props.isABOUT &&
    `
background: linear-gradient(90deg, #04e19b, #03b1e8);
-webkit-background-clip: text;
color: transparent;
display: inline;`}
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  > div:last-child {
    margin-left: var(--margin-sub);
    display: flex;
    flex-direction: column;

    > span:last-child {
      color: var(--font-h3);
      font-size: 10px;
    }
  }
`;

export default ReviewItemHeader;
