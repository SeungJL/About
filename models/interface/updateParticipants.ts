export default interface UpdateParticipants {
  operation: 'append' | 'delete' | 'time_update',
  time?: string,
}