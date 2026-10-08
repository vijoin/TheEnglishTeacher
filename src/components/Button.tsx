import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'accent' | 'success' | 'danger' | 'warning' | 'outline' | 'ghost'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand text-white shadow-[0_4px_0_0_var(--brand-strong)] hover:brightness-105',
  accent: 'bg-accent text-white shadow-[0_4px_0_0_var(--accent-strong)] hover:brightness-105',
  success: 'bg-emerald-500 text-white shadow-[0_4px_0_0_var(--color-emerald-700)] hover:brightness-105',
  danger: 'bg-rose-500 text-white shadow-[0_4px_0_0_var(--color-rose-700)] hover:brightness-105',
  warning: 'bg-amber-500 text-white shadow-[0_4px_0_0_var(--color-amber-700)] hover:brightness-105',
  outline: 'border-2 border-line bg-surface text-ink shadow-[0_4px_0_0_var(--line)] hover:bg-surface-2',
  ghost: 'text-muted hover:bg-surface-2 hover:text-ink',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
}

export function Button({ variant = 'primary', size = 'md', block, className, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex select-none items-center justify-center gap-2 rounded-2xl font-extrabold tracking-wide transition',
        'active:translate-y-[3px] active:shadow-none disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none',
        size === 'sm' && 'px-3 py-2 text-sm',
        size === 'md' && 'px-5 py-3 text-base',
        size === 'lg' && 'px-6 py-4 text-lg uppercase',
        block && 'w-full',
        VARIANTS[variant],
        className,
      )}
      {...rest}
    />
  )
}
