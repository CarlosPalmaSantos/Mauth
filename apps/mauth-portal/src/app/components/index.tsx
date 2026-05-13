import { ReactNode } from "react"
export * from './input'

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
  gap-8 md:gap-0 2xl:gap-4
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
        px-10 py-3
        md:px-8
        2xl:px-10 2xl:py-5
        rounded-3xl
        font-bold
        text-md xl:text-sm 2xl:text-xl
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



export function Title() {
  return <h1 className='
  text-5xl 2xl:text-6xl font-bold text-text drop-shadow-[0_0_5px] drop-shadow-text/50 p-1 md:p-4'>MAUTH</h1>
}
