import { useState } from "react";
import { Button, Input } from "../components";

export function Login() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='min-h-screen bg-base flex items-center justify-center'>
      <div className='flex flex-col text-center bg-mantle p-10 rounded-4xl gap-14 drop-shadow-[0_0_20px] drop-shadow-mantle/50 items-center'>
        <h1 className='text-5xl font-bold text-text mb-4'>Mauth Portal</h1>
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
        <Button>Login</Button>
      </div>
    </div>
  );
}

export default Login;
