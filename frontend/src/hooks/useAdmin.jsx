import useAuth from './useAuth'
import useProyectos from './useProyectos'

const useAdmin = () => {
  const { proyectDetail } = useProyectos()
  const { auth } = useAuth()

  return proyectDetail.creator ===  auth._id
}

export default useAdmin