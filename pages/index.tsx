import axios from 'axios';
import dayjs from 'dayjs';
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next';
import {useState} from "react";
import dbConnect from "../libs/dbConnect";
import ParticipationModel, { Participant, Participation } from "../models/participationModel";

const Home: NextPage<{
  participation: Participation
}> = ({ participation }) => {
  const [attendence, setAttendence] = useState<Participation>(participation)

  if (!participation) 
    return (
      <div>
        invalid date
      </div>
    )

  const today = dayjs(participation.date).startOf('day')
  const todayStr = today.format('YYYY-MM-DD')
  const isAttending = attendence.participants.some(p => p.name === 'gggg')

  const attend = async () => {
    const participant: Participant = {
      name: 'gggg',
      time: '01:00',
    }

    const { data } = await axios.patch(`/api/participate?date=${todayStr}`, {
      operation: 'append',
      participant,
    })

    setAttendence(data as Participation)
  }

  const absent = async () => {
    const participant: Participant = {
      name: 'gggg',
      time: '',
    }

    const { data } = await axios.patch(`/api/participate?date=${todayStr}`, {
      operation: 'delete',
      participant,
    })

    setAttendence(data as Participation)
  }


  return (
    <div>
      <h2>{todayStr}</h2>
      <p>{attendence.participants.length}명</p>
      <ul>
        {
          attendence.participants.map(p => (
            <li key={p.name}>
              <span>{p.name}</span>
              <span>{p.time}</span>
            </li>
          ))
        }
      </ul>
      {
        !isAttending ? (<button onClick={attend}>참가</button>) : (<button onClick={absent}>불참</button>)
      }
      
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query })=> {
  await dbConnect()
  
  const queryDate = query.date as string
  let today = dayjs().startOf('day').format('YYYY-MM-DD')
  if (queryDate && dayjs(queryDate, 'YYYY-MM-DD').isValid()) {
    today = queryDate
  }

  const participation = await ParticipationModel.findOne({ date: today }) as Participation
  const participationObj = participation.toObject()
  participationObj._id = participationObj._id.toString()
  participationObj.createdAt = (participationObj.createdAt as Date).toISOString()
  participationObj.updatedAt = (participationObj.updatedAt as Date).toISOString()

  return { props: { participation: participationObj } }
}

export default Home
