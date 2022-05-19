import { Participant } from "../participationModel";

export default interface UpdateParticipants {
  operation: 'append' | 'delete',
  participant: Participant,
}