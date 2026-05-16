import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import { Button } from ".";
import { InfoPanel, InfoPanelProps } from "./info-panel";
import { Checker } from "./checkers";

type InputProps = {
  key: string,
  type: HTMLInputTypeAttribute,
  value: string,

  className?: string,
  placeholder?: string,
  title?: string,
  onChange?: (value: string) => void,
  error?: string,
  checkers?: Checker[]
}


export function Input({ type, placeholder, title, value, onChange, error }: InputProps) {
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

type FormProps = {
  inputs: InputProps[],
  submitText: string,
  onSubmit: (values: Record<string, string>) => Promise<void>,
  info?: InfoPanelProps
  grid?: boolean
}

export default function Form({ inputs, submitText, onSubmit, info, grid }: FormProps) {
  const [items, setItems] = useState<Record<string, { val: string, err?: string }>>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    setItems(
      Object.fromEntries(inputs.map(i => ([i.key, { val: i.value }]))))
  }, [inputs])

  return (
    <div className='flex flex-col gap-10 items-center'>
      {items && <>
        <ErrorPanel error={error} />
        <div className={`
          flex flex-col
          p-0 md:py-4 2xl:p-0
          2xl:flex 2xl:flex-col
          ${grid ? 'md:grid md: grid-cols-2' : ''}
          gap-6 md:gap-4
          items-center
          `}>
          {inputs.map(i => <Input
            key={i.key}
            type={i.type}
            title={i.title}
            placeholder={i.placeholder}
            value={items[i.key].val}
            error={items[i.key].err}
            onChange={
              val => setItems(prev => {
                if (!prev) return prev
                return {
                  ...prev,
                  [i.key]: {
                    ...prev[i.key],
                    val
                  }
                }
              })
            }
          />)}
        </div>
        <div className="flex flex-col gap-6 items-center">
          <Button onClick={async () => {
            let hasErrors = false;
            const newItems = { ...items };

            for (const input of inputs) {
              if (input.checkers) {
                const err = input.checkers
                  .filter(c => {
                    let inp

                    switch (c.type) {
                      case 'value': inp = items[input.key].val
                        break
                      case 'input-key':
                        inp = {
                          value: items[input.key].val,
                          items
                        }
                        break
                    }

                    return !c.fun(inp)
                  })
                  .map(c => c.msg.replace('%f', input.title || input.key).replace('%v', items[input.key].val))[0];

                if (err) {
                  hasErrors = true;
                  newItems[input.key] = { ...newItems[input.key], err };
                } else {
                  newItems[input.key] = { ...newItems[input.key], err: undefined };
                }
              }
            }

            setItems(newItems);

            if (!hasErrors) {
              try {
                const values = Object.fromEntries(
                  Object.entries(items).map(([k, v]) => [k, v.val]));
                await onSubmit(values);
              } catch (e: unknown) {
                console.error(`ERROR CAPTURADO: ${e}`);
                if (e instanceof Error) {
                  setError(e.message);
                }
              }
            } else setError(undefined)

          }}>{submitText}</Button>
          {info && <InfoPanel
            text={info.text}
            linkText={info.linkText}
            linkRef={info.linkRef}
          />}
        </div>
      </>}
    </div >

  )
}
