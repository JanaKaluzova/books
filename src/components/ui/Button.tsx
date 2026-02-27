import { FC, ButtonHTMLAttributes } from 'react'
import { BUTTON_PRIMARY, BUTTON_GHOST, MODAL_CLOSE_BUTTON } from '../../styles'

const VARIANT_STYLES = {
  primary: BUTTON_PRIMARY,
  ghost: BUTTON_GHOST,
  icon: MODAL_CLOSE_BUTTON,
} as const

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANT_STYLES
}

export const Button: FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  return (
    <button className={`${VARIANT_STYLES[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
