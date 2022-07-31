import { Box, Radio, RadioGroup, Stack, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { IParticipantNote } from "../../models/vote";

const Note: FC<{
  note: IParticipantNote,
  setNote: (note: IParticipantNote) => void,
}> = ({ note, setNote }) => {

  return (
    <>
      <Box marginBottom='10px'>
      <Heading as='h3' fontSize='lg' display='inline-block'>
        점심식사
      </Heading>
        <RadioGroup defaultValue='absent' onChange={(value: "absent" | "attend" | "no_select") => setNote({ ...note, lunch: value })}>
          <Stack spacing={5} direction='row'>
            <Radio colorScheme='green' value='attend'>
              네
            </Radio>
            <Radio colorScheme='yellow' value='absent'>
              아니요
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>

      <Box marginBottom='10px'>
        <Heading as='h3' fontSize='lg'>
          저녁식사
        </Heading>
        <RadioGroup defaultValue='absent' onChange={(value: "absent" | "attend" | "no_select") => setNote({ ...note, dinner: value })}>
          <Stack spacing={5} direction='row'>
            <Radio colorScheme='green' value='attend'>
              네
            </Radio>
            <Radio colorScheme='yellow' value='absent'>
              아니요
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>

      <Box marginBottom='10px'>
        <Heading as='h3' fontSize='lg'>
          저녁식사 이후
        </Heading>
        <RadioGroup defaultValue='absent' onChange={(value: "absent" | "attend" | "no_select") => setNote({ ...note, afterDinner: value })}>
          <Stack spacing={5} direction='row'>
            <Radio colorScheme='green' value='attend'>
              네
            </Radio>
            <Radio colorScheme='yellow' value='absent'>
              아니요
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
    </>
  )
}

export default Note
