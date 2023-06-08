import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { IPlace } from "../../types/studyDetails";

function SpaceSelector({
  spaceArr,
  selectSpace,
  setSelectSpace,
}: ISpaceSelector) {

  const onSpaceClicked = (space: IPlace) => {
    setSelectSpace((old) => {
      if (Array.isArray(old) && old.includes(space))
        return old.filter((item) => item !== space);
      return [...old, space];
    });
  };

  return (
    <Layout>
      {spaceArr?.map((space) => (
        <Wrapper key={space._id}>
          <Space
            isSelected={
              Array.isArray(selectSpace) && selectSpace?.includes(space)
            }
            onClick={() => onSpaceClicked(space)}
          >
            <Image
              src={`${space.image}`}
              alt="spaceImg"
              width={74}
              height={74}
              unoptimized={true}
            />
          </Space>
          <span>{space.branch}</span>
        </Wrapper>
      ))}
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Space = styled.div<{ isSelected: boolean }>`
  border-radius: 12px;
  padding: 3px;
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
  align-items: center;
  border: ${(props) =>
    props.isSelected
      ? "2px solid var(--color-mint)"
      : "1px solid var(--font-h4)"};
`;

interface ISpaceSelector {
  spaceArr: IPlace[];
  selectSpace?: IPlace[];
  setSelectSpace?: Dispatch<SetStateAction<IPlace[]>>;
}

export default SpaceSelector;
