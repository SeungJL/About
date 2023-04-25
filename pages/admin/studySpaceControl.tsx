import { useForm } from "react-hook-form";
import { DefaultValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import { LogoAdjustmentImage } from "../../components/ui/DesignAdjustment";
import { usePlaceQuery, useVoteQuery } from "../../hooks/vote/queries";

function StudySpaceControl() {
  const { data } = usePlaceQuery();
  const { register, handleSubmit, watch } = useForm({});

  const onValid = (data) => {
    
  };
  return (
    <>
      <Header title="스터디 장소 정보" url="/admin" />
      <Layout>
        {data?.map((place, idx) => (
          <Form key={idx} id={`place${idx}`} onSubmit={handleSubmit(onValid)}>
            <div>
              <ImageContainer>
                <LogoAdjustmentImage place={place} />
              </ImageContainer>
              <SpaceInfo>
                <Status>
                  <Branch
                    defaultValue={place?.branch}
                    {...register(`branch-${idx}`)}
                  />

                  <input
                    defaultValue={place?.latitude}
                    {...register(`latitude-${idx}`)}
                  />

                  <input
                    defaultValue={place?.longitude}
                    {...register(`longitude-${idx}`)}
                  />
                </Status>
                <Status>
                  <Info
                    defaultValue={place?.brand}
                    {...register(`brand-${idx}`)}
                  />
                  <input
                    defaultValue={place?.location}
                    {...register(`location-${idx}`)}
                  />
                  <input
                    defaultValue={place?.status}
                    {...register(`status-${idx}`)}
                  />
                </Status>
              </SpaceInfo>
            </div>
            <input defaultValue={place?.image} {...register(`image-${idx}`)} />
            <button
              form={`place${idx}`}
              style={{
                background: "var(--color-red)",
                width: "60px",
                alignSelf: "center",
                marginTop: "10px",
                color: "white",
                borderRadius: "9px",
              }}
              type="submit"
            >
              변경
            </button>
          </Form>
        ))}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  height: 150px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  padding: 12px;
  > div {
    display: flex;
  }
`;

const ImageContainer = styled.div`
  width: 77px;
  height: 77px;
  border: 1px solid var(--font-h5);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const SpaceInfo = styled.div`
  color: var(--font-h2);
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  > input {
    width: 80px;
  }
`;

const Branch = styled.input`
  font-weight: 800;
  font-size: 16px;
  color: var(--font-h1);
`;

const Info = styled.input`
  color: var(--font-h3);
  font-size: 12px;
`;

export default StudySpaceControl;
