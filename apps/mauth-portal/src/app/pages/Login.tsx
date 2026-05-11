import { useState } from "react";
import { Button, Input, Panel } from "../components";
import { Title } from "../components";

export function Login() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='min-h-screen bg-base flex items-center justify-center'>
      <Panel>
        <Title />
        <div className='flex flex-col gap-8'>
          <Input
            title="Username"
            value={user}
            onChange={setUser}
            type='text' />
          <Input
            title="Password"
            value={password}
            onChange={setPassword}
            type='password' />
        </div>
        <div className="flex flex-col gap-8 items-center">
          <Button onClick={() => { console.log('register') }}>Login</Button>
          <div className="flex flex-col gap-2">
            <span className="text-md text-text">Have you already an account?</span>
            <a href=" /register" className="text-md text-lavender font-bold hover:underline">Sign up</a>
          </div>
        </div>

      </Panel>
    </div>
  );
}

export default Login;
