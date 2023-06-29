
import { useNavigate, useParams } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate();
  const params = useParams();
  const idVideo = params.id;
  return (
    <div>About <>блаблабла <p onClick= {() => navigate(-1)}>Назад</p>блаблабла</>
    <div>prodId: {idVideo}</div>
    <div>тут должен быть отчет</div>
    </div>
  )
}
