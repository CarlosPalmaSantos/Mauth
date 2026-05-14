import { Panel } from "../components";
import { Title } from "../components";
import { useNavigate } from "react-router-dom";
import { useApi } from "../providers/ApiContext";
import Form from "../components/input";
import { Checkers } from "../components/checkers";
import { useEffect } from "react";

export function Login() {
  const navigate = useNavigate()
  const { api, validate } = useApi()

  useEffect(() => {
    validate()
      .then(() => navigate('/validate', { state: { redir: '/login' } })) // TODO: Cambiar a un dash
      .catch(() => navigate('/login'))
  }, [api])



  async function handleLogin(inputs: Record<string, string>) {
    try {
      const res = await api.login({
        username: inputs.username,
        password: inputs.password
      })

      navigate('/validate')
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
          submitText="Login"
          onSubmit={handleLogin}
          info={{
            text: "Don't have an account?",
            linkText: 'Sign up',
            linkRef: '/register',
          }}
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
        />
      </div>
    </Panel>
  );
}

export default Login;
