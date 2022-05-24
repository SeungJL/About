export default interface UpdateParticipants {
  operation: 'append' | 'delete',
  time?: string,
}