{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww29740\viewh16260\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import * as React from "react"\
import \{ Slot \} from "@radix-ui/react-slot"\
import \{ cva, type VariantProps \} from "class-variance-authority"\
import \{ cn \} from "@/lib/utils"\
\
const buttonVariants = cva(\
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",\
  \{\
    variants: \{\
      variant: \{\
        default: "bg-primary text-primary-foreground hover:bg-primary/90",\
        destructive:\
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",\
        outline:\
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",\
        secondary:\
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",\
        ghost: "hover:bg-accent hover:text-accent-foreground",\
        link: "text-primary underline-offset-4 hover:underline",\
      \},\
      size: \{\
        default: "h-10 px-4 py-2",\
        sm: "h-9 rounded-md px-3",\
        lg: "h-11 rounded-md px-8",\
        icon: "h-10 w-10",\
      \},\
    \},\
    defaultVariants: \{\
      variant: "default",\
      size: "default",\
    \},\
  \}\
)\
\
export interface ButtonProps\
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,\
    VariantProps<typeof buttonVariants> \{\
  asChild?: boolean\
\}\
\
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(\
  (\{ className, variant, size, asChild = false, ...props \}, ref) => \{\
    const Comp = asChild ? Slot : "button"\
    return (\
      <Comp\
        className=\{cn(buttonVariants(\{ variant, size, className \}))\}\
        ref=\{ref\}\
        \{...props\}\
      />\
    )\
  \}\
)\
Button.displayName = "Button"\
\
export \{ Button, buttonVariants \}}