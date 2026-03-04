import { SelectOption } from '../components/ui/Select'

const currentYear = new Date().getFullYear()

const option = (value: string, label: string): SelectOption => ({ value, label })

export const yearOptions: SelectOption[] = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => {
  const year = currentYear - i
  return option(String(year), String(year))
})
