import dayjs from "dayjs";
import styled from "styled-components";
import { useAdminStudyRecordQuery } from "../hooks/admin/quries";

import { Button } from "@chakra-ui/react";
import { useState } from "react";
import {
  useGroupBelongMatchMutation,
  useMonthCalcMutation,
} from "../hooks/admin/mutation";
import { useImageUploadMutation } from "../hooks/image/mutations";
function Test() {
  const { data } = useAdminStudyRecordQuery(
    dayjs("2024-03-01"),
    dayjs("2024-03-11"),
    null,
    "동대문"
  );
  console.log(data);

  let AA = "te";
  let BB = "te ";
  if (AA === BB) console.log(444);
  const { data: data2 } = useAdminStudyRecordQuery(
    dayjs("2023-12-04"),
    dayjs("2023-12-10"),
    null,
    "양천"
  );

  const { mutate: match } = useGroupBelongMatchMutation({
    onSuccess(data) {
      console.log("SUCSC", data);
    },
  });

  const { mutate } = useMonthCalcMutation({
    onSuccess(data) {},
    onError(err) {
      console.error(err);
    },
  });

  const handleForm = (e) => {
    e.preventDefault();
  };

  const { mutate: A } = useImageUploadMutation({
    onSuccess(data) {},
  });

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImage(file);
  };
  const submitForm = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("path", "hello");

    A(formData);
  };

  return (
    <>
      <Layout>
        <input
          id="imageInput"
          accept="image/*"
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        <Button type="button" onClick={() => match()}>
          클릭
        </Button>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  margin-top: 200px;
  margin-left: 50px;
  display: flex;
`;

export default Test;
