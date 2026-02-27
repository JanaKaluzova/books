import { forwardRef, InputHTMLAttributes } from 'react'
import { INPUT } from '../../styles'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <div>
        <label className="mb-1.5 block text-xs font-medium text-text-secondary">
          {label}
        </label>
        <input ref={ref} className={`${INPUT} ${className}`} {...props} />
      </div>
    )
  }
)

TextField.displayName = 'TextField'
