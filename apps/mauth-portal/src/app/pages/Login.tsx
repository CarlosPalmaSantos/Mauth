import { useState } from "react";
import { Button, Check, Checkers, ErrorPanel, Input, Panel } from "../components";
import { Title } from "../components";
import { InfoPanel } from "../components/info-panel";
import { useNavigate } from "react-router-dom";
import { useApi } from "../providers/ApiContext";

export function Login() {
  const [username, setUsername] = useState('')
  const [userError, setUserError] = useState<string | undefined>(undefined)

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined)

  const navigate = useNavigate()
  const [err, setErr] = useState<string | undefined>(undefined)

  const api = useApi()


  async function handleLogin() {
    // CHECKS
    Check('Username', username, Checkers.isEmpty)
      .success(v => setUserError(undefined))
      .error(setUserError)

    Check('Password', password, Checkers.isEmpty)
      .success(v => setPasswordError(undefined))
      .error(setPasswordError)

    if (!userError && !passwordError)
      api.login({ username, password })
        .then(() => {
          console.log('login :D')
          setErr(undefined)
        })
        .catch((e: Error) => { setErr(e.message) })
  }

  return (
    <Panel>
      <Title />
      <div className='flex flex-col gap-8 items-center'>
        <ErrorPanel error={err} />
        <Input
          title="Username"
          value={username}
          onChange={setUsername}
          error={userError}
          type='text' />
        <Input
          title="Password"
          value={password}
          onChange={setPassword}
          error={passwordError}
          type='password' />
      </div>

      <div className="flex flex-col gap-6 items-center">
        <Button onClick={handleLogin}>Login</Button>
        <InfoPanel
          text="Have you already an account?"
          linkText="Sign up"
          linkRef="/register"
        />
      </div>

    </Panel>
  );
}

export default Login;
