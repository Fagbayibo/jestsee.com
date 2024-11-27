// Tremor Tooltip [v0.0.2]

import './tooltip.css'

import * as TooltipPrimitives from '@radix-ui/react-tooltip'
import React from 'react'

import { cn } from '@/lib/utils'

import TooltipArrow from './tooltip-arrow'

interface TooltipProps
  extends Omit<TooltipPrimitives.TooltipContentProps, 'content' | 'onClick'>,
    Pick<
      TooltipPrimitives.TooltipProps,
      'open' | 'defaultOpen' | 'onOpenChange' | 'delayDuration'
    > {
  content: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  side?: 'bottom' | 'left' | 'top' | 'right'
  showArrow?: boolean
  triggerAsChild?: boolean
}

type TooltipContentProps = Omit<
  TooltipProps,
  | 'content'
  | 'delayDuration'
  | 'defaultOpen'
  | 'open'
  | 'onClick'
  | 'onOpenChange'
  | 'triggerAsChild'
>

type TooltipProviderProps = Pick<
  TooltipProps,
  'open' | 'defaultOpen' | 'onOpenChange' | 'delayDuration' | 'children'
>

const TooltipProvider = ({
  children,
  delayDuration = 150,
  ...restProps
}: TooltipProviderProps) => {
  return (
    <TooltipPrimitives.Provider delayDuration={delayDuration}>
      <TooltipPrimitives.Root
        tremor-id='tremor-raw'
        delayDuration={delayDuration}
        {...restProps}
      >
        {children}
      </TooltipPrimitives.Root>
    </TooltipPrimitives.Provider>
  )
}
const TooltipTrigger = TooltipPrimitives.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitives.Content>,
  TooltipContentProps
>((props, forwardedRef) => {
  const {
    children,
    showArrow = true,
    sideOffset = 16,
    className,
    ...restProps
  } = props
  return (
    <TooltipPrimitives.Portal>
      <TooltipPrimitives.Content
        ref={forwardedRef}
        align='center'
        className={cn(
          // base
          'max-w-80 select-none rounded-lg px-4 py-3 text-sm leading-relaxed tracking-wide shadow-md',
          // text color
          'text-zinc-300',
          // background color
          'bg-[var(--tooltip-color)]',
          // transition
          'will-change-[transform,opacity]',
          'data-[side=bottom]:animate-slideDownAndFade data-[side=left]:animate-slideLeftAndFade data-[side=right]:animate-slideRightAndFade data-[side=top]:animate-slideUpAndFade data-[state=closed]:animate-hide',
          // other
          'z-50 border border-[var(--tooltip-border-color)]',
          'tooltip-content',
          className
        )}
        sideOffset={sideOffset}
        {...restProps}
      >
        {children}
        {showArrow && <TooltipArrow aria-hidden='true' />}
      </TooltipPrimitives.Content>
    </TooltipPrimitives.Portal>
  )
})

/**
 * simply use this component if the tooltip content is simple
 * and doesn't need any additional configuration
 */
const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitives.Content>,
  TooltipProps
>(
  (
    {
      children,
      content,
      delayDuration,
      defaultOpen,
      open,
      onClick,
      onOpenChange,
      triggerAsChild = false,
      ...props
    }: TooltipProps,
    forwardedRef
  ) => {
    return (
      <TooltipProvider
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
      >
        <TooltipTrigger onClick={onClick} asChild={triggerAsChild}>
          {children}
        </TooltipTrigger>
        <TooltipContent ref={forwardedRef} {...props}>
          {content}
        </TooltipContent>
      </TooltipProvider>
    )
  }
)

Tooltip.displayName = 'Tooltip'

export {
  Tooltip,
  TooltipContent,
  type TooltipProps,
  TooltipProvider,
  TooltipTrigger
}
