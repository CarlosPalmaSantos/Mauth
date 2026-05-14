import { Panel, Title } from "../components";
import { Checkers } from "../components/checkers";
import Form from "../components/input";
import { useApi } from "../providers/ApiContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Register() {
  const { api, validate } = useApi()
  const navigate = useNavigate()

  useEffect(() => {
    validate()
      .then(() => navigate('/validate', {
        state: { redir: '/register' }
      })).catch(() => navigate('/register'))
  }, [api])



  async function handleRegister(inputs: Record<string, string>) {
    try {
      await api.register({
        username: inputs.username,
        email: inputs.email,
        password: inputs.password
      })

      navigate('/dash')

    } catch (e) {
      if (e instanceof Error)
        throw e
    }
  }

  return (
    <Panel>
      <Title />
      <div className='flex flex-col gap-4 md:gap-8 items-center'>
        <Form
          submitText="Register"
          onSubmit={handleRegister}
          info={{
            text: 'Already have an account?',
            linkText: 'Login',
            linkRef: '/login',
          }}
          inputs={[{
            title: 'Username',
            key: 'username',
            value: '',
            type: 'text',
            checkers: [Checkers.isEmpty]
          }, {
            title: 'Email',
            key: 'email',
            value: '',
            type: 'text',
            checkers: [Checkers.isEmpty]
          }, {
            title: 'Password',
            key: 'password',
            value: '',
            type: 'password',
            checkers: [Checkers.isEmpty]
          }, {
            title: 'Confirm password',
            key: 'c_password',
            value: '',
            type: 'password',
            checkers: [Checkers.isEqualsKey('password')]
          }]}
          grid
        />
      </div>
    </Panel >
  );
}

export default Register;
