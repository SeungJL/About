import { useForm } from "react-hook-form";
import styled from "styled-components";
import { LogoAdjustmentImage } from "../../components/ui/DesignAdjustment";
import { usePlaceQuery, useVoteQuery } from "../../hooks/vote/queries";

function StudySpaceControl() {
  const { data } = usePlaceQuery();
  const { register, handleSubmit } = useForm();
  console.log(data);
  return (
    <Layout>
      {data?.map((place, idx) => (
        <Form key={idx} id={`space${idx}`}>
          <ImageContainer>
            <LogoAdjustmentImage place={place} />
          </ImageContainer>
          <SpaceInfo>
            <Status>
              <Branch defaultValue={place?.branch} />

              <input defaultValue={place?.latitude} />

              <input defaultValue={place?.longitude} />
            </Status>
            <Status>
              <Info defaultValue={place?.brand} />
              <input defaultValue={place?.location} />
            </Status>
          </SpaceInfo>
        </Form>
      ))}
    </Layout>
  );
}

const Layout = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  height: 100px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 12px;
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
