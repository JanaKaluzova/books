import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { INPUT } from '../../styles'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div>
        {label && (
          <label
            htmlFor={props.name}
            className="mb-1.5 block text-xs font-medium text-text-secondary"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={props.name}
          className={`${INPUT} resize-none ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''} ${className}`}
          {...props}
        />
      </div>
    )
  },
)

TextArea.displayName = 'TextArea'
