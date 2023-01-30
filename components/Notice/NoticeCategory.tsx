import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { noticeCategory } from "../../recoil/atoms";

const CategoryHeader = styled.header`
  > span:first-child {
    border-right: 2px solid RGB(113, 85, 63);
    border-top-left-radius: 10px;
  }
`;

const NoticeBtn = styled.span`
  border-top: 2px solid RGB(113, 85, 63);
  display: inline-block;
  width: 100px;
  height: 30px;
  text-align: center;
  padding: 5px;
  background-color: RGB(77, 65, 57);
  border-right: 2px solid RGB(113, 85, 63);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-left: 2px solid RGB(113, 85, 63);
`;

function NoticeCategory() {
  const setCategory = useSetRecoilState(noticeCategory);
  return (
    <CategoryHeader>
      <NoticeBtn onClick={() => setCategory("notice")}>공지사항</NoticeBtn>
      <NoticeBtn onClick={() => setCategory("Release")}>릴리즈노트</NoticeBtn>
    </CategoryHeader>
  );
}
export default NoticeCategory;
