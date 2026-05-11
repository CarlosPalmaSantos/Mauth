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
        <Button onClick={() => { console.log('login') }}>Login</Button>
      </Panel>
    </div>
  );
}

export default Login;
