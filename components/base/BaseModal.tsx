import { useSearchParams } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import DailyCheckWinModal from "../../modals/aboutHeader/dailyCheckModal/DailyCheckWinModal";
import AlphabetModal from "../../modals/common/AlphabetModal";
import WriteDrawer from "../../modals/home/writeDrawer";
import ErrorUserInfoPopUp from "../../modals/pop-up/ErrorUserInfoPopUp";
import { transferAlphabetState } from "../../recoil/transferDataAtoms";
import { transferDailyCheckWinState } from "../../recoils/transferRecoils";
import { DispatchBoolean } from "../../types/reactTypes";
import GuestBottomNav from "../layout/atoms/GuestBottomNav";

interface IBaseModal {
  isGuest: boolean;
  isError: boolean;
  setIsError: DispatchBoolean;
}

function BaseModal({ isGuest, isError, setIsError }: IBaseModal) {
  const searchParams = useSearchParams();
  const isWriteModal = !!searchParams.get("write");
  console.log(isWriteModal);
  const [transferAlphabet, setTransferAlphabet] = useRecoilState(
    transferAlphabetState
  );

  const dailyCheckWin = useRecoilValue(transferDailyCheckWinState);

  return (
    <>
      {!!dailyCheckWin && <DailyCheckWinModal />}
      {isGuest && <GuestBottomNav />}
      {isError && <ErrorUserInfoPopUp setIsModal={setIsError} />}
      {isWriteModal && <WriteDrawer />}
      {transferAlphabet && (
        <AlphabetModal
          setIsModal={() => setTransferAlphabet(null)}
          alphabet={transferAlphabet}
        />
      )}
    </>
  );
}

export default BaseModal;
