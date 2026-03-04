import { FC } from 'react'
import {
  Root,
  Trigger,
  Value,
  Icon,
  Content,
  Viewport,
  Item,
  ItemText,
  ScrollUpButton,
  ScrollDownButton,
} from '@radix-ui/react-select'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { INPUT } from '../../styles'

export type SelectOption = {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  error?: boolean
  errorMessage?: string
  options: SelectOption[]
  placeholder?: string
  value?: string
  name?: string
  onChange?: (value: string) => void
}

export const Select: FC<SelectProps> = ({
  label,
  error,
  errorMessage,
  options,
  placeholder,
  value,
  name,
  onChange,
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-text-secondary">
          {label}
        </label>
      )}
      <Root value={value} onValueChange={onChange} name={name}>
        <Trigger
          id={name}
          className={`${INPUT} flex w-full items-center justify-between pr-3 text-left ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''} ${!value ? 'text-text-muted' : ''}`}
        >
          <Value placeholder={placeholder} />
          <Icon>
            <ChevronDown className="h-4 w-4 text-text-secondary" />
          </Icon>
        </Trigger>
        <Content
          className="z-[200] overflow-hidden rounded-xl border border-surface-200 bg-white shadow-xl min-w-[var(--radix-select-trigger-width)]"
          position="popper"
          sideOffset={4}
          style={{ maxHeight: 'min(var(--radix-select-content-available-height), 240px)' }}
        >
          <ScrollUpButton className="flex items-center justify-center py-1 text-text-secondary">
            <ChevronUp className="h-4 w-4" />
          </ScrollUpButton>
          <Viewport className="p-1">
            {options.map((opt) => (
              <Item
                key={opt.value}
                value={opt.value}
                className="cursor-pointer rounded-lg px-3 py-2 text-sm text-text-primary outline-none data-[highlighted]:bg-surface-100 data-[state=checked]:font-medium data-[state=checked]:text-accent-600"
              >
                <ItemText>{opt.label}</ItemText>
              </Item>
            ))}
          </Viewport>
          <ScrollDownButton className="flex items-center justify-center py-1 text-text-secondary">
            <ChevronDown className="h-4 w-4" />
          </ScrollDownButton>
        </Content>
      </Root>
      {errorMessage && (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}
