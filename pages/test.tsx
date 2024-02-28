import dayjs from "dayjs";
import styled from "styled-components";
import { useAdminStudyRecordQuery } from "../hooks/admin/quries";

import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useMonthCalcMutation } from "../hooks/admin/mutation";
import { useImageUploadMutation } from "../hooks/image/mutations";
function Test() {
  const { data } = useAdminStudyRecordQuery(
    dayjs("2024-02-19"),
    dayjs("2024-02-25"),
    null,
    "강남"
  );
  console.log(data);

  const { data: data2 } = useAdminStudyRecordQuery(
    dayjs("2023-12-04"),
    dayjs("2023-12-10"),
    null,
    "양천"
  );

  const { mutate } = useMonthCalcMutation({
    onSuccess(data) {
      console.log(2, data);
      console.log("SUC");
    },
    onError(err) {
      console.error(err);
    },
  });

  const handleForm = (e) => {
    e.preventDefault();
    console.log(1234);
  };

  const { mutate: A } = useImageUploadMutation({
    onSuccess(data) {
      console.log("222");
    },
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
        <Button type="button" onClick={submitForm}>
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
