import { Button, Collapse, Input, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import styled from "styled-components";
import ModalPortal from "../../components/common/ModalPortal";
import { useFailToast } from "../../hooks/CustomToast";
import { usePromotionQuery } from "../../hooks/promotion/queries";
import PromotionApplyModal from "../../modals/promotion/PromotionApplyModal";
import { IPromotionApply } from "../../types/page/promotion";

type FormValues = {
  uniName: string;
};

function PromotionApply() {
  const failToast = useFailToast();

  const { isOpen, onToggle } = useDisclosure();
  const [value, setValue] = useState("");
  const [filterData, setFilterData] = useState<IPromotionApply[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [uniName, setUniName] = useState<any>();

  const { data: promotionArr } = usePromotionQuery();

  const resolver: Resolver<FormValues> = async (values) => {
    let errorType = "";
    let errorMessage = "";
    if (!values.uniName) {
      errorType = "required";
      errorMessage = "학교를 입력해주세요!";
    } else if (values.uniName.slice(-3) !== "대학교") {
      errorType = "validate";
      errorMessage = "학교 이름은 'ㅇㅇ대학교'로 끝나야 합니다.";
    }
    if (errorType) {
      failToast("free", errorMessage);
      return {
        values: {},
        errors: {
          uniName: {
            type: errorType,
            message: errorMessage,
          },
        },
      };
    }
    return {
      values: values,
      errors: {},
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  useEffect(() => {
    if (value.length > 0 && !isOpen) onToggle();
    if (value.length === 0 && isOpen) onToggle();
    const filtered = promotionArr?.filter(
      (item) => item.name.slice(0, value.length) === value
    );
    if (value.slice(-3) !== "대학교") setFilterData(filtered);
    else setFilterData([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promotionArr, value]);

  const onSubmit = handleSubmit((data) => {
    setIsModal(true);
    setUniName(data.uniName);
  });

  return (
    <>
      <Layout>
        <Form onSubmit={onSubmit}>
          <div>
            <Input
              {...register("uniName", {
                validate: (value) => value.slice(0, -3) === "대학교",
              })}
              placeholder="학교명"
              mr="var(--margin-sub)"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              _focus={{ outline: "none" }}
            />
            {filterData?.length !== 0 && (
              <Collapse in={isOpen} animateOpacity>
                <AutoContent>
                  {filterData?.map((item, idx) => (
                    <AutoItem key={idx} onClick={() => setValue(item.name)}>
                      {item.name}
                    </AutoItem>
                  ))}
                </AutoContent>
              </Collapse>
            )}
          </div>
          <Button type="submit" colorScheme="mintTheme">
            입력
          </Button>
        </Form>
        <ErrorMessage>{errors?.uniName && errors.uniName.message}</ErrorMessage>
      </Layout>
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <PromotionApplyModal setIsModal={setIsModal} uniName={uniName} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  margin: var(--margin-max) 0;
  position: relative;
`;

const Form = styled.form`
  display: flex;
  > div:first-child {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  > button {
    margin-left: var(--margin-sub);
  }
`;

const AutoItem = styled.div`
  padding: var(--padding-md) 0;
  padding-left: 14px;
  border-bottom: var(--border-sub);
`;

const AutoContent = styled.div`
  width: calc(100% - 68px);
  max-height: 160px;
  position: absolute;
  z-index: 10;
  background-color: white;
  padding: var(--padding-sub) 0;
  overflow-y: auto;
`;

const ErrorMessage = styled.div`
  margin-top: var(--margin-sub);
  margin-left: var(--margin-min);
  font-size: 12px;
  color: var(--color-red);
  min-height: 18px;
`;

export default PromotionApply;
