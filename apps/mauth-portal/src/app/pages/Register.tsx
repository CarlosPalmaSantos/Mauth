import { useState } from "react";
import { Button, Input, Panel, Title } from "../components";

export function Register() {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className='min-h-screen bg-base flex items-center justify-center'>
      <Panel>
        <Title />
        <div className='flex flex-col gap-8'>
          <div className='flex flex-row gap-8'>
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
          <div className='flex flex-row gap-8'>
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
        <Button onClick={() => { console.log('login') }}>Register</Button>
      </Panel>
    </div>
  );
}

export default Register;
