import { Box, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'

const Unauthorized: NextPage = () => (
  <Box>
    <Text as='span' margin='auto 0'>권한이 없습니다</Text>
  </Box>
)

export default Unauthorized
