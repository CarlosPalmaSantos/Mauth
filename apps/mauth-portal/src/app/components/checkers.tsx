export type Checker = {
  type: 'value' | 'input-key',
  fun: (obj: any) => boolean,
  msg: string
}

type Callback = (msg: string) => void

type CheckResult = {
  success: (cb: Callback) => CheckResult,
  error: (cb: Callback) => CheckResult,
}

export function Check(field: string, value: any, ...checkers: Checker[]): CheckResult {
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
    type: 'value',
    msg: '%f must not be empty',
    fun: (str: string) => /./.test(str)
  },
  isEqualsKey(key: string, field?: string) {
    return {
      type: 'input-key',
      msg: `Does not match ${field ?? key}`,
      fun: ({ value, items }:
        { value: string, items: Record<string, { val: string }> }) => {
        return items[key].val === value
      }
    }
  }
} satisfies Record<string,
  Checker |
  ((arg: any) => Checker)>


