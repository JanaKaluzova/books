import { FC, ReactNode } from 'react'
import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Cancel,
  Action,
} from '@radix-ui/react-alert-dialog'
import { MODAL_BACKDROP } from '../../styles'

interface ConfirmDialogProps {
  trigger: ReactNode
  title: string
  description: string
  confirmLabel?: string
  onConfirm: () => void
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  trigger,
  title,
  description,
  confirmLabel = 'Confirm',
  onConfirm,
}) => {
  return (
    <Root>
      <Trigger asChild>{trigger}</Trigger>
      <Portal>
        <Overlay className={`${MODAL_BACKDROP} fixed inset-0 z-[110] animate-[fadeIn_150ms_ease]`} />
        <Content className="fixed left-1/2 top-1/2 z-[120] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-surface-200 bg-white p-6 shadow-2xl animate-[scaleIn_150ms_ease]">
          <Title className="font-serif text-xl font-bold text-text-primary">{title}</Title>
          <Description className="mt-2 text-sm leading-relaxed text-text-secondary">
            {description}
          </Description>
          <div className="mt-6 flex justify-end gap-3">
            <Cancel asChild>
              <button className="rounded-xl px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-100 hover:text-text-primary">
                Cancel
              </button>
            </Cancel>
            <Action asChild>
              <button
                onClick={onConfirm}
                className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition-all duration-200 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 active:scale-[0.98]"
              >
                {confirmLabel}
              </button>
            </Action>
          </div>
        </Content>
      </Portal>
    </Root>
  )
}
