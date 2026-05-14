import { useEffect } from "react";
import { Button, Panel, Title } from "../components";
import { useApi } from "../providers/ApiContext";
import { useNavigate } from "react-router-dom";

export default function Dash() {
  const { api, validate, user } = useApi()
  const navigate = useNavigate()

  useEffect(() => {
    validate()
      .catch((e) => {
        console.error(e)
        navigate('/')
      })
  }, [api])

  async function handleOnLogout() {
    try {
      await api.logout()
      navigate('/about')
    }
    catch (e) {
      console.error(e)
    }
  }

  return <Panel>
    <Title />
    {user && <p>Wellcome
      <span className="underline">{user.username}</span>
    </p>}
    <Button onClick={handleOnLogout}>Logout</Button>
  </Panel>
}
