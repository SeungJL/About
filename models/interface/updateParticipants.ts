import { IParticipant } from "../attendence";

export default interface UpdateParticipants {
  operation: 'append' | 'delete',
  participant: IParticipant,
}