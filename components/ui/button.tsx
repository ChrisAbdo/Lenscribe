import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/utils/utils';

const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-[#333]',
  {
    variants: {
      variant: {
        default:
          'bg-black hover:bg-black/80 text-white dark:hover:bg-white/80 dark:bg-slate-50 dark:text-white',
        destructive:
          'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
        outline:
          'bg-[#eaeaea] dark:bg-[#111] border border-[#999] hover:bg-[#eaeaea]/80 dark:hover:bg-[#111]/80 dark:border-[#333] dark:text-slate-100',
        subtle:
          'bg-[#eaeaea] text-slate-900 hover:bg-[#eaeaea]/80 dark:bg-[#111] dark:hover:bg-[#111]/80 dark:text-slate-100',
        ghost:
          'bg-transparent hover:bg-[#eaeaea] dark:hover:bg-[#111] dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-[#eaeaea] dark:data-[state=open]:bg-[#333]',
        link: 'bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
