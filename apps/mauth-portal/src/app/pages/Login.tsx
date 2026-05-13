import { Panel } from "../components";
import { Title } from "../components";
import { useNavigate } from "react-router-dom";
import { useApi } from "../providers/ApiContext";
import Form from "../components/input";
import { Checkers } from "../components/checkers";

export function Login() {
  const navigate = useNavigate()
  const api = useApi()


  async function handleLogin(inputs: Record<string, string>) {
    try {
      const res = await api.login({
        username: inputs.username,
        password: inputs.password
      })
    } catch (e) {
      if (e instanceof Error)
        throw e
    }
  }

  return (
    <Panel>
      <Title />
      <div className='flex flex-col gap-8 items-center'>
        <Form
          inputs={[{
            title: 'Username',
            key: 'username',
            value: '',
            type: 'text',
            checkers: [Checkers.isEmpty]
          }, {
            title: 'Password',
            key: 'password',
            value: '',
            type: 'password',
            checkers: [Checkers.isEmpty]
          }]}
          onSubmit={handleLogin}
          info={{
            text: "Don't have an account?",
            linkText: 'Sign up',
            linkRef: '/register',
          }}
        />
      </div>
    </Panel>
  );
}

export default Login;
