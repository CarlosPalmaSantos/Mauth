import { useState } from "react";
import { Button, Check, Checkers, ErrorPanel, Input, Panel, Title } from "../components";
import { InfoPanel } from "../components/info-panel";

export function Register() {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [err, setErr] = useState<string | undefined>('API IS NOT WORKING !!!')

  async function handleRegister() {
  }

  return (
    <Panel>
      <Title />
      <div className='flex flex-col gap-4 md:gap-8 items-center'>
        <ErrorPanel error={err} />
        <div className='flex flex-col md:flex-row gap-4 md:gap-8 '>
          <Input
            title="Username"
            value={user}
            onChange={setUser}
            type='text' />
          <Input
            title="Email"
            value={email}
            onChange={setEmail}
            type='email' />
        </div>
        <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
          <Input
            title="Password"
            value={password}
            onChange={setPassword}
            type='password' />
          <Input
            title="Confirm password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            type='password' />
        </div>
      </div>
      <div className="flex flex-col gap-8 items-center">
        <Button onClick={handleRegister}>Register</Button>
        <InfoPanel
          text="Already have an account?"
          linkText="Login"
          linkRef="/login"
        />
      </div>
    </Panel >
  );
}

export default Register;
