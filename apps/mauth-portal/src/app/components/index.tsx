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
  h-full md:h-fit
  w-full md:w-fit md:max-w-[65%]
  justify-center
  bg-base md:bg-mantle
  md:rounded-4xl md:drop-shadow-[-1_0_15px] md:drop-shadow-black/25
  p-4 md:p-8
  '>
    <div className='
  flex flex-col
  gap-10 md:gap-16
  md:p-12
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
        px-10
        py-5 md:py-6
        rounded-3xl
        text-xl font-bold
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
    <div className="flex flex-col gap-0.5">
      <span className='text-md md:text-xl font-bold text-subtext-1 text-left ml-4'>{title}:</span>
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
        p-3 md:p-4
        w-full
        bg-surface-0
        text-text text-center text-2xl
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
  return <h1 className='text-6xl font-bold text-text drop-shadow-[0_0_5px] drop-shadow-text/50 p-1 md:p-4'>MAUTH</h1>
}
