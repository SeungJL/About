import { useSession } from "next-auth/react";
import styled from "styled-components";
import { useArrivedQuery } from "../../hooks/vote/queries";
import { getToday } from "../../libs/utils/dateUtils";
import { BaseModal } from "../../styles/LayoutStyles";

export default function CheckUserModal() {
  const { data: session } = useSession();
  const user = session.user;
  console.log(user);
  console.log(useArrivedQuery(getToday().subtract(4, "day")).data);
  const messageBox = [
    {
      memo: "2층 칸막이 두번째 자리에 앉아있어요! 연두색 후드!",
      name: "이승주",
    },
    {
      memo: "승주님 옆에 앉아 있어요 ㅋ",
      name: "채민관",
    },
  ];

  return <ModalLayout></ModalLayout>;
}

const ModalLayout = styled.div`
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.4);
  position: absolute;
  width: 330px;
  height: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border-radius: 10px;
`;
