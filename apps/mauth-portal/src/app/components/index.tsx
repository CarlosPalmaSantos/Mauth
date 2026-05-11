import React, { HTMLInputTypeAttribute, ReactNode, useState } from "react";

type InputProps = {
  className?: string,
  placeholder?: string,
  title?: string,
  type: HTMLInputTypeAttribute
  value: string,
  onChange: (value: string) => void
}

export function Panel({ children }: { children: ReactNode }) {
  return <div className='
  flex flex-col
  gap-12
  text-center
  bg-mantle
  p-10 rounded-4xl drop-shadow-[0_0_15px] drop-shadow-crust/50'>
    {children}
  </div>
}

type ButtonProps = {
  children: ReactNode,
  onClick: () => void,
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        w-fit
        px-10 py-6
        rounded-3xl
        text-xl font-bold
        bg-lavender hover:bg-lavender/70
        hover:cursor-pointer
        focus:ring-2 focus:ring-lavender focus:outline-none focus:bg-lavender/70
        transition-all
        ">
      {children}
    </button>
  )
}

export function Input({ type, placeholder, title, value, onChange }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className='text-xl font-bold text-subtext-1 text-left ml-4'>{title}:</p>
      <input
        placeholder={placeholder}
        value={value}
        onChange={ev => onChange(ev.target.value)}
        className={`
        bg-surface-0
        text-text text-center text-2xl
        placeholder-subtext-0/50
        p-6
        rounded-3xl
        font-bold        border-none
        hover:bg-surface-0/70
        focus:ring-2 focus:ring-lavender focus:outline-none focus:bg-surface-0/70
        transition-all
        caret-lavender
      `}
        type={type} />
    </div>
  )
}
