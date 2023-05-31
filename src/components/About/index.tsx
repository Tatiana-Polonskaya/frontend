
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate();
  return (
    <div>About <>блаблабла <p onClick= {() => navigate(-1)}>Назад</p>блаблабла</></div>
  )
}
