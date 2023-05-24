import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { setCookie, parseCookies, destroyCookie } from "nookies";


type User = {
  email: string;
  id: string
  // permissions: string[];
  // roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<string>;
  signOut(): void;
  user: User | undefined;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)
 
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user;
  const navigate = useNavigate();

  useEffect(() => {
    const { 'pind.token': token } = parseCookies()

    if (token) {
      api.get('/me').then(response => {	
        const { email, id } = response.data;

        setUser({ email, id })
      })
      .catch(() => {
        destroyCookie(undefined, 'pind.token')
        destroyCookie(undefined, 'pind.refreshToken')

        navigate('/')
      })
    }
    else(
      navigate('/')
    )
  }, [navigate])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      })

      const { token, refreshToken, user } = response.data      

      setCookie(undefined, 'pind.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setCookie(undefined, 'pind.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setUser({
        email,
        id: user.id
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      navigate('/dashboard')
      //navigate('/produtos')

      return 'Sucesso'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      //console.log(error.response?.data.message)
      return error.response?.data.message
    }
  }

  function signOut() {
    destroyCookie(undefined, 'pind.token')
    destroyCookie(undefined, 'pind.refreshToken')

    setUser(undefined)
    navigate('/')
  }

  return (
      <AuthContext.Provider value={{ signIn, signOut ,isAuthenticated, user }}>
        {children}
      </AuthContext.Provider>
  )
}