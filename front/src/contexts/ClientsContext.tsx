import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../services/api'

interface Client {
  id: string
  user_id: string
  name: string
  cpf: string
  phone: string
}

interface CreateClientInput {
  name: string
  cpf: string
  phone: string
}

interface UpdateClientInput {
  name?: string
  cpf?: string
  phone?: string
}

interface ClientsContextType {
  clients: Client[]
  createClient: (data: CreateClientInput) => Promise<void>
  updateClient: (id: string, data: UpdateClientInput) => Promise<void>
  deleteClient: (id: string) => Promise<void>
}

interface ClientsProviderProps {
  children: ReactNode
}

export const ClientsContext = createContext({} as ClientsContextType)

export function ClientsProvider({ children }: ClientsProviderProps) {
  const [clients, setClients] = useState<Client[]>([])

  async function fetchClients() {
    try {
      const response = await api.get('/clients')
      setClients(response.data)
    } catch (err) {
      console.error('Erro ao buscar os clientes', err)
    }
  }

  async function createClient(data: CreateClientInput) {
    try {
      const response = await api.post('/clients', data)
      setClients([...clients, response.data])
    } catch (err) {
      console.log('Erro ao criar o cliente', err)
    }
  }

  async function updateClient(id: string, data: UpdateClientInput) {
    try {
      const response = await api.put(`/clients/${id}`, data)
      console.log(response.data)
      setClients(
        clients.map((client) => (client.id === id ? response.data : client)),
      )
    } catch (err) {
      console.log('Erro ao atualizar o cliente', err)
    }
  }

  async function deleteClient(id: string) {
    try {
      await api.delete(`/clients/${id}`)
      setClients(clients.filter((client) => client.id !== id))
    } catch (err) {
      console.log('Erro ao deletar o cliente', err)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return (
    <ClientsContext.Provider
      value={{ clients, createClient, updateClient, deleteClient }}
    >
      {children}
    </ClientsContext.Provider>
  )
}
