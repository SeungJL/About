import { IPlace } from "../place";

export default interface UpdateParticipants {
  operation: 'append' | 'delete' | 'time_update' | 'place_update',
  time?: string,
  place?: string,
}