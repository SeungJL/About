import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import { isChangedCategoryName, nameToKr } from "../../libs/utils/membersUtil";

import { categoryState } from "../../recoil/membersAtoms";

export default function CategoryStatus({ name }: any) {
  const category = useRecoilValue(categoryState);
  const status = category.status;
  const isChanged = isChangedCategoryName(category.name, status);
  return (
    <>
      {name == category.name && isChanged ? (
        <ChangedName name={category.name} status={status} />
      ) : (
        <span>{nameToKr(name)}</span>
      )}

      {name !== category.name ? (
        ""
      ) : status === "up" ? (
        <FontAwesomeIcon icon={faArrowUp} size="xs" />
      ) : status === "down" ? (
        <FontAwesomeIcon icon={faArrowDown} size="xs" />
      ) : (
        ""
      )}
    </>
  );
}

const ChangedName = ({ name, status }) => {
  return name === "gender" && status;
};
