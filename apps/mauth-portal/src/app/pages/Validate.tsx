import { useEffect } from "react";
import { Panel, Spinner, Title } from "../components";
import { useApi } from "../providers/ApiContext";
import { useLocation, useNavigate } from "react-router-dom";

export function Validate() {
  const { api, validate } = useApi()
  const navigate = useNavigate()
  const location = useLocation()
  const redir = location.state?.redir || '/about'

  useEffect(() => {
    validate()
      .then(() => navigate('/dash'))
      .catch(() => navigate(redir))
  }, [api])

  return <Panel>
    <Title />
    <Spinner />
  </Panel>
}
