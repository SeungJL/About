import dayjs from 'dayjs';
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next';
import { getInterestingDate } from '../libs/dateUtils';

const Root: NextPage = () => <div/>

export const getServerSideProps: GetServerSideProps = async ()=> {
  
  const today = getInterestingDate()

  return {
    redirect: {
      permanent: false,
      destination: `/${today.format('YYYY-MM-DD')}`,
    },
    props:{},
  }
}


export default Root
