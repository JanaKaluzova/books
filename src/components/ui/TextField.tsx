import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import { INPUT } from '../../styles'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  startAdornment?: ReactNode
  error?: boolean
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, startAdornment, error, className = '', ...props }, ref) => {
    return (
      <div>
        {label && (
          <label htmlFor={props.name} className="mb-1.5 block text-xs font-medium text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          {startAdornment && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary">
              {startAdornment}
            </span>
          )}
          <input
            ref={ref}
            id={props.name}
            className={`${INPUT} ${startAdornment ? 'pl-10' : ''} ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''} ${className}`}
            {...props}
          />
        </div>
      </div>
    )
  }
)

TextField.displayName = 'TextField'

