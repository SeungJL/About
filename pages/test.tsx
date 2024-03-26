import dayjs from "dayjs";
import styled from "styled-components";
import { useAdminStudyRecordQuery } from "../hooks/admin/quries";

import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import {
  useGroupBelongMatchMutation,
  useMonthCalcMutation,
} from "../hooks/admin/mutation";
import { useImageUploadMutation } from "../hooks/image/mutations";
import { studyDateStatusState } from "../recoils/studyRecoils";
function Test() {
  const { data } = useAdminStudyRecordQuery(
    dayjs("2024-03-18"),
    dayjs("2024-03-24"),
    null,
    "수원"
  );
  console.log(data);

  const a = useRecoilValue(studyDateStatusState);

  let AA = "te";
  let BB = "te ";
  if (AA === BB) console.log(444);
  const { data: data2 } = useAdminStudyRecordQuery(
    dayjs("2023-12-04"),
    dayjs("2023-12-10"),
    null,
    "양천"
  );
  // const decodeByAES256 = (encodedTel: string) => {
  //   const bytes = CryptoJS.AES.decrypt(encodedTel, key);
  //   const originalText = bytes.toString(CryptoJS.enc.Utf8);
  //   return originalText;
  // };

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
        {a}
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
