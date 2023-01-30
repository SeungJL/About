import { Container, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react"
import { NextPage } from "next"

const Notice: NextPage = () => (
  <Container>
    <Heading as='h1' marginBottom='10px'>알림</Heading>
    <Tabs variant='enclosed' isFitted colorScheme='green'>
      <TabList>
        <Tab fontSize='lg' fontWeight='600'>공지사항</Tab>
        <Tab fontSize='lg' fontWeight='600'>릴리즈노트</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <VStack>
            <Text fontSize='lg' marginTop='30vh'>공지사항이 아직 없어요</Text>
          </VStack>
        </TabPanel>
        <TabPanel>
          <VStack>
            <Text fontSize='lg' marginTop='30vh'>릴리즈가 아직 없어요</Text>
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Container>
)
  
export default Notice
