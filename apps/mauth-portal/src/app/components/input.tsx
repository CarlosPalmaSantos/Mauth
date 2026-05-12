import { HTMLInputTypeAttribute } from "react";

type InputProps = {
  className?: string,
  placeholder?: string,
  title?: string,
  type: HTMLInputTypeAttribute
  value: string,
  onChange?: (value: string) => void,
  onKeyDown?: () => void,
  error?: string
}


export function Input({ type, placeholder, title, value, onChange, onKeyDown, error }: InputProps) {
  return (
    <div className="flex flex-col gap-3 w-80 xl:w-70 2xl:w-100 max-w-full">
      <div className="flex flex-col gap-0.5 w-full">
        <span className='
        text-sm xl:text-xs 2xl:text-lg
        font-bold text-subtext-1 text-left ml-4'>{title}:</span>
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
        text-md xl:text-sm 2xl:text-xl
        placeholder-subtext-0/50
        rounded-4xl md:rounded-3xl
        font-bold        border-none
        hover:bg-surface-0/70
        focus:ring-2 focus:ring-lavender focus:outline-none focus:bg-surface-0/70
        transition-all
        drop-shadow-[0_0_10px] drop-shadow-surface-1/25
        caret-lavender
      `}
          type={type} />
      </div>
      <ErrorPanel error={error} />
    </div>
  )
}

type Checker = {
  fun: (str: string) => boolean,
  msg: string
}

type Callback = (msg: string) => void

type CheckResult = {
  success: (cb: Callback) => CheckResult,
  error: (cb: Callback) => CheckResult,
}

export function Check(field: string, value: string, ...checkers: Checker[]): CheckResult {
  let error: string | null = null

  for (const checker of checkers) {
    if (!checker.fun(value)) {
      error = checker.msg
      break
    }
  }

  const res = {
    success: (cb: Callback) => {
      if (!error) cb(value)
      return res
    },
    error: (cb: Callback) => {
      if (error) cb(error ? error.replace('%f', field).replace('%v', value) : '')
      return res
    }
  }

  return res
}

export const Checkers = {
  isEmpty: {
    msg: '%f must not be empty',
    fun: (str: string) => /./.test(str)
  },
} satisfies Record<string, Checker>

export function ErrorPanel({ error }: { error?: string }) {
  return <div>
    {error && <div className="
      text-error
      font-bold
      text-xs 2xl:text-sm">
      {error}
    </div>}
  </div>
}
