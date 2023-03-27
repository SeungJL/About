import styled from "styled-components";

import { useState } from "react";
import TimePicker from "react-time-picker";

function Test() {
  const [date, setDate] = useState(new Date());
  return (
    <Layout>
      <TimePicker />
    </Layout>
  );
}

const Layout = styled.div``;

export default Test;
