export interface AttendDTO {
  place: string
  start?: Date
  end?: Date
  confirmed: boolean
  anonymity: boolean
  lunch: 'attend' | 'absent' | 'no_select'
  dinner: 'attend' | 'absent' | 'no_select'
}