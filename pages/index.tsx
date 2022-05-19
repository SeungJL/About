import axios from 'axios';
import dayjs from 'dayjs';
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next';

const Root: NextPage = () => <div/>

export const getServerSideProps: GetServerSideProps = async ()=> {
  
  const today = dayjs().startOf('day')

  return {
    redirect: {
      permanent: false,
      destination: `/${today.format('YYYY-MM-DD')}`,
    },
    props:{},
  }
}


export default Root
