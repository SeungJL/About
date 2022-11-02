import { Container, Text, RadioGroup, Radio, HStack } from "@chakra-ui/react";
import React, { FC } from "react";

const Confirm: FC<{
  confirmed: boolean,
  setConfirmed: (confirmed: boolean) => void,
}> = ({ confirmed, setConfirmed }) => (
  <>
    <Container>
      <Text>투표하신 날에 최대한 참여하실 수 있도록 장소 재조정을 하고 있는데 <strong>장소가 변경되어도 상관없을까요?</strong></Text>
      <Text fontSize='xs'>(아니오를 선택하실 경우, 장소가 고정됩니다)</Text>
      <Container margin='10px 0'>
        <RadioGroup defaultValue={String(confirmed)} onChange={(value: string) => { console.log(value); setConfirmed(value === 'true')}}>
          <HStack spacing={5}>
            <Radio colorScheme='green' value='false'>
              네
            </Radio>
            <Radio colorScheme='red' value='true'>
              아니요 (장소 고정)
            </Radio>
          </HStack>
        </RadioGroup>
      </Container>
    </Container>
  </>
)

export default Confirm