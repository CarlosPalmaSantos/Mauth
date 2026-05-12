import { HTMLInputTypeAttribute, ReactNode } from "react";

type InputProps = {
  className?: string,
  placeholder?: string,
  title?: string,
  type: HTMLInputTypeAttribute
  value: string,
  onChange?: (value: string) => void,
  onKeyDown?: () => void
}

export function Panel({ children }: { children: ReactNode }) {
  return <div className='
  flex flex-col
  h-full md:h-fit md:max-h-[95%]
  w-full md:w-fit md:max-w-[65%]
  justify-center
  bg-base md:bg-mantle
  md:rounded-4xl md:drop-shadow-[-1_0_15px] md:drop-shadow-black/25
  p-6 md:p-8
  '>
    <div className='
  flex flex-col
  gap-18 md:gap-10 2xl:gap-16
  text-center items-center
  '>
      {children}
    </div>
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
        px-8 py-3
        2xl:px-10 2xl:py-5
        rounded-3xl
        text-md font-bold
        2xl:text-xl
        bg-lavender hover:bg-lavender/70
        drop-shadow-lavender/20 drop-shadow-[0_0_10px]
        hover:cursor-pointer
        focus:ring-2 focus:ring-lavender focus:outline-none focus:bg-lavender/70
        transition-all
        ">
      {children}
    </button>
  )
}

export function Input({ type, placeholder, title, value, onChange, onKeyDown }: InputProps) {
  return (
    <div className="flex flex-col gap-0.5 w-80 md:w-80 2xl:w-100 max-w-full">
      <span className='text-sm 2xl:text-lg font-bold text-subtext-1 text-left ml-4'>{title}:</span>
      <input
        placeholder={placeholder}
        value={value}
        onChange={ev => { if (onChange) onChange(ev.target.value) }}
        onKeyDown={(ev) => {
          if (ev.key !== 'Enter')
            return

          if (onKeyDown) {
            onKeyDown()
          }

          ev.preventDefault()
          ev.currentTarget.blur()
        }}
        className={`
        p-5 md:p-3 2xl:p-4
        w-full
        bg-surface-0
        text-text text-center
        text-md 2xl:text-xl
        placeholder-subtext-0/50
        rounded-3xl
        font-bold        border-none
        hover:bg-surface-0/70
        focus:ring-2 focus:ring-lavender focus:outline-none focus:bg-surface-0/70
        transition-all
        drop-shadow-[0_0_10px] drop-shadow-surface-1/25
        caret-lavender
      `}
        type={type} />
    </div>
  )
}

export function Title() {
  return <h1 className='
  text-5xl 2xl:text-6xl font-bold text-text drop-shadow-[0_0_5px] drop-shadow-text/50 p-1 md:p-4'>MAUTH</h1>
}
