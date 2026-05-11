import { useState } from "react";
import { Button, Input, Panel, Title } from "../components";

export function Register() {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <Panel>
      <Title />
      <div className='flex flex-col gap-4 md:gap-8'>
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
        <Button onClick={() => { console.log('login') }}>Register</Button>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-text">Already have an account?</span>
          <a href=" /login" className="text-sm text-lavender font-bold hover:underline">Login</a>
        </div>
      </div>
    </Panel>
  );
}

export default Register;
