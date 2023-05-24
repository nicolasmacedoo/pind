import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useCan } from '../hooks/useCan'
import { useNavigate } from 'react-router-dom'

export function Metrics() {
  const { user, signOut } = useContext(AuthContext)
  const navigate = useNavigate()

  const userCanSeeMetrics = useCan({
    permissions: user?.permissions,
  })

  if (!userCanSeeMetrics) {
    navigate('/dashboard')
  }

  return (
    <>
      {userCanSeeMetrics && <div>Métricas</div>}
      <button onClick={signOut}>Log Out</button>
    </>
  )
}
