import { text } from "stream/consumers";
import { Panel, Title } from "../components";
import { Checkers } from "../components/checkers";
import Form from "../components/input";
import { useApi } from "../providers/ApiContext";

export function Register() {
  const api = useApi()

  async function handleRegister(inputs: Record<string, string>) {
    try {
      const res = await api.register({
        username: inputs.username,
        email: inputs.email,
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
      <div className='flex flex-col gap-4 md:gap-8 items-center'>
        <Form
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
          onSubmit={handleRegister}
          info={{
            text: 'Already have an account?',
            linkText: 'Login',
            linkRef: '/login',
          }}
          grid
        />
      </div>
    </Panel >
  );
}

export default Register;
