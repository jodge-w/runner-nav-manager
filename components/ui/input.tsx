{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import * as React from "react"\
import \{ cn \} from "@/lib/utils"\
\
export interface InputProps\
  extends React.InputHTMLAttributes<HTMLInputElement> \{\}\
\
const Input = React.forwardRef<HTMLInputElement, InputProps>(\
  (\{ className, type, ...props \}, ref) => \{\
    return (\
      <input\
        type=\{type\}\
        className=\{cn(\
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",\
          className\
        )\}\
        ref=\{ref\}\
        \{...props\}\
      />\
    )\
  \}\
)\
Input.displayName = "Input"\
\
export \{ Input \}}