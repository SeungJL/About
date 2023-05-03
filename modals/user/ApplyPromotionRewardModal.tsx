import styled from "styled-components";
import { SetStateAction } from "react";
import {
  ModalLg,
  ModalMain,
  ModalMd,
  ModalSubtitle,
  ModalXs,
  ModalXXL,
} from "../../styles/layout/modal";
import { ModalHeaderXLine } from "../../components/ui/Modal";
import { Button } from "@chakra-ui/react";
import { usePointMutation } from "../../hooks/user/pointSystem/mutation";

function ApplyPromotionRewardModal({
  setIsModal,
}: {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { mutate } = usePointMutation();

  const onComplete = () => {
    mutate(5);
    setIsModal(false);
  };

  return (
    <Layout>
      <ModalHeaderXLine title="리워드 신청" setIsModal={setIsModal} />
      <ModalMain>
        <Overview>
          에브리타임 홍보 게시판에 아래 홍보글을 올려주시면 5 point와 추첨을
          통해 기프티콘을 받을 수 있습니다. 도와주시는 모든 분들 정말
          감사합니다!
        </Overview>

        <Text>
          ☕️대학생들의 카공 및 친목 동아리☕️ <br />
          <br /> 카공 스터디는 많지만 제대로 운영되는 스터디 모임은 거의 없다는
          걸 아시나요? 저희 About는 근처에 사는 대학생들이 편하게 와서 같이
          카공을 할 수 있는 환경을 만들어주기 위한 카공 및 친목 동아리입니다.
          직접 제작한 웹 사이트를 통해 동아리를 체계적으로 관리하고 운영하고
          있고, 동아리원 분은 원하는 장소와 시간에 미리 투표하여 스터디에 참여할
          수 있습니다. 또한 출석체크나 참여율 관리를 포함하여 여러가지 컨텐츠를
          제공하고 있고, 카공 뿐만 아니라 밥을 먹거나, 보드게임, 뒤풀이 등의
          모임도 같이 열리고 있습니다.
          <br />
          <br />
          ☕️가입조건☕️ <br /> <br />
          카공 모임이 메인이 되는 동아리이기 때문에 한 달에 최소 2회 이상
          스터디에 참여 가능한 20대 대학생(졸업생)만 받고 있고, 카공 스터디
          이외의 불온한 목적의 가입자를 엄격하게 금하고 있습니다. 웹 사이트
          내에도 익명의 신고 기능이 존재하고, 종교/정치 문제를 포함하여 타인에게
          피해나 불쾌감을 주는 행위는 즉각 추방됨을 미리 말씀드립니다. <br />
          <br />
          ☕️모임장소☕️ <br /> <br />
          수원: 아주대/수원역/수원시청역/광교중앙역/망포역/송죽동 <br />
          양천구: 당산역/오목교역/등촌역/까치산역 <br />
          안양: 안양역/인덕원역/범계역/금정역
          <br />
          <br />
          미리 궁금하실 분들을 위해 웹 사이트 링크를 걸어두겠습니다. 합격 발표
          이전까지는 반드시 게스트 로그인으로 접속해서 확인해주시기 바랍니다.
          https://votehelper.herokuapp.com <br />
          <br />
          ☕️가입비☕️ <br />
          <br /> 1000원의 가입비가 있습니다. 이벤트와 서버 운용에 사용됩니다.{" "}
          <br />
          <br />
          ☕️가입 신청☕️ <br />
          <br />
          https://docs.google.com/forms/d/1xfTAoxuJJy9KBlhg8eAekB8E7XSk0s9TZwhPQ3z4eh4/edit#responses
          <br />
          <br />
          ☕️관련문의☕️
          <br />
          <br />
          https://open.kakao.com/o/s36ysnpe
        </Text>
        <Message>
          게시완료 눌러주시면 자동으로 적립됩니다!
          <br />
          여러번 지원해도 되니 또 신청해주세요 :)
        </Message>
      </ModalMain>
      <Footer>
        <Button width="50%" onClick={() => setIsModal(false)}>
          다음에
        </Button>
        <Button
          width="50%"
          backgroundColor="var(--color-mint)"
          color="white"
          onClick={onComplete}
        >
          게시완료
        </Button>
      </Footer>
    </Layout>
  );
}

const Layout = styled(ModalXXL)``;

const Overview = styled.div`
  margin-bottom: 28px;
  font-weight: 600;
`;

const Title = styled.div``;

const Text = styled.p`
  padding: 8px 4px;
  border-radius: 12px;
  height: 210px;
  overflow-y: auto;
  background-color: var(--font-h7);
`;

const Message = styled.div`
  margin-top: auto;
  margin-bottom: 8px;
  text-align: center;
  font-weight: 600;
`;

const Footer = styled.footer`
  display: flex;
`;

export default ApplyPromotionRewardModal;
