
import { useParams } from 'react-router-dom'
import AnalysisReport from '../Report';

export default function About() {
  const params = useParams();
  const idVideo = params.id;
  return (
    <div>
    <div>video: {idVideo}</div>
    <div><AnalysisReport></AnalysisReport></div>
    </div>
  )
}
