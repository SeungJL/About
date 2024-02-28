import dayjs from "dayjs";
import styled from "styled-components";
import { useAdminStudyRecordQuery } from "../hooks/admin/quries";

import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Step } from "react-joyride";
import { SERVER_URI } from "../constants2/apiConstants";
import { useMonthCalcMutation } from "../hooks/admin/mutation";
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

  const [{ run, steps }, setState] = useState<{
    run: boolean;
    steps?: Step[];
  }>({
    run: false,
    steps: [
      {
        content: <h2>Let begin our journey!</h2>,
        title: <>제목</>,
        locale: { skip: "Skip" },
        placement: "center",
        target: "body",
      },
      {
        content: <h2>Sticky elements</h2>,
        floaterProps: {
          disableAnimation: true,
        },
        spotlightPadding: 20,
        target: ".main_vote_btn",
      },
      {
        content: "These are our super awesome projects!",
        placement: "bottom",
        styles: {
          options: {
            width: 300,
          },
        },
        target: ".demo__projects h2",
        title: "Our projects",
      },
      {
        content: (
          <div>
            You can render anything!
            <br />
            <h3>Like this H3 title</h3>
          </div>
        ),
        placement: "top",
        target: ".demo__how-it-works h2",
        title: "Our Mission",
      },
    ],
  });

  const handleForm = (e) => {
    e.preventDefault();
    console.log(1234);
  };

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImage(file);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("path", "hello");

    await axios
      .post(`${SERVER_URI}/image/upload/vote`, formData)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
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
