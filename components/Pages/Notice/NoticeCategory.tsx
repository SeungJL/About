import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { noticeCategoryState } from "../../../recoil/noticeAtoms";

const CategoryHeader = styled.span`
  > span:first-child {
    border-right: 2px solid hsl(26.4, 28.409090909090907%, 34.509803921568626%);
    border-top-left-radius: 10px;
  }
`;

interface INoticeBtn {
  state: Boolean;
}

const NoticeBtn = styled.span<INoticeBtn>`
  background-color: ${(prop) =>
    prop.state ? "brown" : "rgb(255, 255, 255, 0.9)"};
  border-top: 2px solid RGB(113, 85, 63);
  display: inline-block;
  width: 100px;
  height: 30px;
  text-align: center;
  padding: 5px;
  border-right: 2px solid RGB(113, 85, 63);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-left: 2px solid RGB(113, 85, 63);
`;

function NoticeCategory() {
  const [Category, setCategory] = useRecoilState(noticeCategoryState);
  return (
    <CategoryHeader>
      <NoticeBtn
        state={Category === "notice" && true}
        onClick={() => setCategory("notice")}
      >
        공지사항
      </NoticeBtn>
      <NoticeBtn
        state={Category === "notice" && true}
        onClick={() => setCategory("notice")}
      >
        활동알림
      </NoticeBtn>
    </CategoryHeader>
  );
}
export default NoticeCategory;
