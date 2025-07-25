'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        orange: "bg-orange-400 border-2 border-black text-black hover:bg-orange-500 hover:text-black",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type BaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
  asChild?: boolean
  animated?: boolean
}

type AnimatedProps = BaseProps & import('framer-motion').MotionProps

export type ButtonProps = BaseProps | AnimatedProps

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, animated = false, ...props }, ref) => {
    // Always call hooks at the top level
    const [MotionButton, setMotionButton] = React.useState<React.ElementType | null>(null);
    React.useEffect(() => {
      if (animated) {
        let mounted = true;
        import('framer-motion').then(mod => {
          if (mounted) setMotionButton(() => mod.motion.button);
        });
        return () => { mounted = false; };
      } else {
        setMotionButton(null);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animated]);

    // Filter out motion props when not using animation
    const filteredProps = animated ? props : Object.fromEntries(
      Object.entries(props).filter(([key]) => !key.startsWith('while') && !key.startsWith('animate') && !key.startsWith('initial') && !key.startsWith('transition'))
    );

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...filteredProps}
        />
      );
    }

    if (animated) {
      if (!MotionButton) return null;
      return (
        <MotionButton
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...filteredProps}
        />
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...filteredProps}
      />
    );
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
