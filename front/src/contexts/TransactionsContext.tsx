import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../services/api'
import { AxiosResponse } from 'axios'

interface Transaction {
  id: string
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
  date: Date
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface UpdateTransactionInput {
  description?: string
  price?: number
  category?: string
  type?: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  updateTransaction: (id: string, data: UpdateTransactionInput) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions() {
    try {
      const response: AxiosResponse<Transaction[]> = await api.get(
        '/transactions',
      )
      console.log(response.data)
      setTransactions(response.data)
    } catch (err) {
      console.error('Erro ao buscar as transações', err)
    }
  }

  async function createTransaction(data: CreateTransactionInput) {
    try {
      const response: AxiosResponse<Transaction> = await api.post(
        '/transactions',
        data,
      )
      setTransactions((state) => [...state, response.data])
    } catch (err) {
      console.log('Erro ao criar a transação', err)
    }
  }

  async function updateTransaction(id: string, data: UpdateTransactionInput) {
    try {
      const response = await api.put(`/transactions/${id}`, data)
      console.log(response.data)
      setTransactions((state) =>
        state.map((state) => (state.id === id ? response.data : state)),
      )
    } catch (err) {
      console.log('Erro ao atualizar a transação', err)
    }
  }

  async function deleteTransaction(id: string) {
    try {
      await api.delete(`/transactions/${id}`)
      setTransactions((state) => state.filter((state) => state.id !== id))
    } catch (err) {
      console.log('Erro ao deletar a transação', err)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
