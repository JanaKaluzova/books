export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const parseDateRead = (dateRead?: string): number => {
  if (!dateRead) return -1
  const [month, year] = dateRead.split(' ')
  return Number(year) * 12 + MONTHS.indexOf(month)
}
