import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { api } from "../services/api"
import { useCan } from "../hooks/useCan"
import { Can } from "../components/Can"
import { Link } from "react-router-dom"

export function Dashboard() {
  const { user } = useContext(AuthContext)

  const userCanSeeMetrics = useCan({
    roles: ['administrator']
  })

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      { userCanSeeMetrics && <div>Métricas</div>}
      <Can permissions={['metrics.list']}>
        <div>Numero de vendas</div>
      </Can>
      <Link to={'/metrics'}><button>Metricas</button></Link>
    </>
  )
}