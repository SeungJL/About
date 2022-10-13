import { HStack, Button, Heading } from "@chakra-ui/react"
import { FC } from "react"
import NextLink from 'next/link'
import { Dayjs } from "dayjs"
import { getPreviousDate, getNextDate, convertToKr, getInterestingDate } from "../libs/utils/dateUtils"
import { DateTitleMode } from "../types/DateTitleMode"


const DateTitle: FC<{
  today: Dayjs,
  mode: DateTitleMode,
}> = ({ today, mode }) => {
  const yesterday = getPreviousDate(today.toDate())
  const tommorrow = getNextDate(today.toDate())

  const dateKrStr = convertToKr(today)
  const interestingDate = getInterestingDate()
  const isAccessibleNextDay = tommorrow.unix() - interestingDate.add(2, 'day').unix() <= 0

  const [yesterdayLink, tommorrowLink] = 
    [yesterday.format('YYYY-MM-DD'), tommorrow.format('YYYY-MM-DD')]
      .map((dateStr) => {
        switch(mode) {
          case 'vote':
            return `/vote/${dateStr}`
          case 'result':
            return `/vote/${dateStr}/result/summary`
        }
      })

  console.log(yesterdayLink)

  return (
    <HStack margin='10px 0'>
      <NextLink href={yesterdayLink}>
        <Button size='sm'>이전날</Button>
      </NextLink>
      <Heading as='h1' size='lg' width='100%' textAlign='center' letterSpacing={-1}>{dateKrStr}</Heading>
      <NextLink href={tommorrowLink}>
        <Button
          size='sm'
          visibility={isAccessibleNextDay ? 'visible' : 'hidden'}
        >
          다음날
        </Button>
      </NextLink>
    </HStack>
  )
}

export default DateTitle
