import { useRecoilState } from "recoil";
import AlphabetModal from "../../modals/common/AlphabetModal";
import ErrorUserInfoPopUp from "../../modals/pop-up/ErrorUserInfoPopUp";
import { transferAlphabetState } from "../../recoil/transferDataAtoms";
import { DispatchBoolean } from "../../types/reactTypes";
import GuestBottomNav from "../layout/atoms/GuestBottomNav";

interface IBaseModal {
  isGuest: boolean;
  isError: boolean;
  setIsError: DispatchBoolean;
}

function BaseModal({ isGuest, isError, setIsError }: IBaseModal) {
  const [transferAlphabet, setTransferAlphabet] = useRecoilState(
    transferAlphabetState
  );

  return (
    <>
      {isGuest && <GuestBottomNav />}
      {isError && <ErrorUserInfoPopUp setIsModal={setIsError} />}
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
