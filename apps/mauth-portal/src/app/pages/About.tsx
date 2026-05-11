import { useNavigate } from "react-router-dom";
import { Button, Panel, Title } from "../components";


export function About() {
  const navigate = useNavigate()

  // TODO: Modificar texto por defecto
  return (

    <div className='min-h-screen bg-base flex items-center justify-center'>
      <Panel>
        <Title />
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet, velit vitae blandit venenatis, urna metus semper ex, id eleifend purus risus vel tellus. Morbi eu viverra eros. Nam scelerisque nunc vitae velit tincidunt, eu vulputate orci euismod. Curabitur tincidunt lorem sed risus accumsan feugiat. Proin ut aliquam turpis. Maecenas vel fringilla arcu. Maecenas sit amet elit porta felis volutpat bibendum. Pellentesque sed gravida sapien. Phasellus metus dolor, efficitur sed tempus at, rhoncus ut magna. Nam hendrerit iaculis nibh, eget sollicitudin nisl fringilla gravida. Nullam faucibus vitae eros in accumsan. Quisque eget orci et ex gravida imperdiet sed non lectus. </p>
        <div className='flex flex-row gap-8'>
          <Button onClick={() => navigate('/register')}>Register</Button>
          <Button onClick={() => navigate('/login')}>Login</Button>
        </div>
      </Panel>
    </div>
  )
}

export default About;
