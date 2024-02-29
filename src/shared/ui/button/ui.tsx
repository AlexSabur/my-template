import { PropsWithChildren, forwardRef } from 'react';
import { VariantProps, tv } from 'tailwind-variants';
 
const button = tv({
  base: 'font-medium bg-blue-500 text-white rounded-full active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-purple-500 text-white'
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'px-4 py-3 text-lg'
    }
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: 'px-3 py-1'
    }
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary'
  }
});
 
type ButtonVariants = VariantProps<typeof button>;
 
interface ButtonProps extends ButtonVariants, PropsWithChildren {
}
 
export const Button = forwardRef<HTMLButtonElement,  ButtonProps>(function Button(props, ref) {
    const className = button(props)

    const refProps = Object.fromEntries(Object.entries(props).filter(([key]) => !button.variantKeys.includes(key)))

    return <button {...refProps} className={className} ref={ref}>{props.children}</button>;
})
