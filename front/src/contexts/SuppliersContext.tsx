import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../services/api'

interface Supplier {
  id: string
  user_id: string
  name: string
  cnpj: string
  phone: string
}

interface CreateSupplierInput {
  name: string
  cnpj: string
  phone: string
}

interface UpdateSupplierInput {
  name?: string
  cnpj?: string
  phone?: string
}

interface SupplierContexType {
  suppliers: Supplier[]
  createSupplier: (data: CreateSupplierInput) => Promise<void>
  updateSupplier: (id: string, data: UpdateSupplierInput) => Promise<void>
  deleteSupplier: (id: string) => Promise<void>
}

interface SupplierProviderProps {
  children: ReactNode
}

export const SuppliersContext = createContext({} as SupplierContexType)

export function SupplierProvider({ children }: SupplierProviderProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  async function fetchSuppliers() {
    try {
      const response = await api.get('/suppliers')
      setSuppliers(response.data)
    } catch (err) {
      console.error('Erro ao buscar fornecedores')
    }
  }

  async function createSupplier(data: CreateSupplierInput) {
    try {
      const reponse = await api.post('/suppliers', data)
      setSuppliers([...suppliers, reponse.data])
    } catch (err) {
      console.error('Erro ao criar fornecedor')
    }
  }

  async function updateSupplier(id: string, data: UpdateSupplierInput) {
    try {
      const response = await api.put(`/suppliers/${id}`, data)
      setSuppliers(
        suppliers.map((supplier) =>
          supplier.id === id ? response.data : supplier,
        ),
      )
    } catch (err) {
      console.error('Erro ao atualizar fornecedor')
    }
  }

  async function deleteSupplier(id: string) {
    try {
      await api.delete(`/suppliers/${id}`)
      setSuppliers((state) => state.filter((state) => state.id !== id))
    } catch (err) {
      console.error('Erro ao deletar fornecedor')
    }
  }

  useEffect(() => {
    fetchSuppliers()
  }, [])

  return (
    <SuppliersContext.Provider
      value={{ suppliers, createSupplier, updateSupplier, deleteSupplier }}
    >
      {children}
    </SuppliersContext.Provider>
  )
}
