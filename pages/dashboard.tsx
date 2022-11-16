import { useContext, useEffect } from "react"
import { Can } from "../components/Can"
import { AuthContext } from "../contexts/AuthContext"
import { setupAPIClient } from "../services/api"
import { api } from "../services/setupAPIClient"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext)


  useEffect(() => {
    api.get('/me').then(response => console.log(response)).catch(err => console.error(err))
  })

  return (
    <>
      <h1>dashboard {user?.email}</h1>
      <button onClick={signOut}>Sair</button>
      <Can permissions={['metrics.list']}>
        <div>Metricas</div>
      </Can>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  return {
    props: {}
  }
})