import { useParams } from "react-router-dom"

export function Repo() {
  const params = useParams()
  const currentRepository = params['*'] as string

  return (
    <div>
      <h1>{currentRepository}</h1>
    </div>
  )
}