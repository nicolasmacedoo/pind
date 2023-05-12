import { ReactNode, createContext, useEffect, useState } from "react";

export interface Transaction {
  id: number;
  descricao: string;
  preco: number;
  categoria: string;
  type: 'income' | 'outcome';
  data: string
}

const transactionList:  Transaction[] = [
  {
    id: 1,
    descricao: "Banana",
    preco: 20,
    categoria: "Alimentação",
    type: 'income',
    data: new Date().toISOString()
  },
  {
    id: 2,
    descricao: "Cadeira",
    preco: 200,
    categoria: "Moveis",
    type: 'outcome',
    data: new Date().toISOString()
  },
  {
    id: 3,
    descricao: "Mesa",
    preco: 2300,
    categoria: "Moveis",
    type: 'outcome',
    data: new Date().toISOString()
  },
  {
    id: 4,
    descricao: "Laranja",
    preco: 3000,
    categoria: "Alimentação",
    type: 'income',
    data: new Date().toISOString()
  }
]

interface CreateTransactionInput {
  descricao: string,
  preco: number,
  categoria: string,
  type: "income" | "outcome"
}

interface TransactionContextType {
  transactions: Transaction[];
  createTransaction: (data: CreateTransactionInput) => void;
  editTransaction: (data: CreateTransactionInput, transaction: Transaction | null) => void;
  deleteTransaction: (transaction: Transaction) => void;
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string){
    const url = new URL('http://localhost:3000/transactions')

    if(query) {
      url.searchParams.append('q', query)
      const foundTransaction = transactions.filter(transaction => {
        return transaction.descricao.toLowerCase() === query.toLocaleLowerCase()
      })

      console.log(foundTransaction)
      
      setTransactions(foundTransaction)
    }else {
    // const response = await fetch(url);
    // const data = await response.json();

    // setTransactions(data)
      setTransactions(transactionList)
    }
  }

  function createTransaction(data: CreateTransactionInput) {
    setTransactions(state => [{
      id: Math.floor(Math.random() * 1000),
      data: new Date().toISOString(),
      ...data
    }, 
    ...state,
    ])
  }

  function editTransaction(data: CreateTransactionInput, transaction: Transaction | null) {
    setTransactions(state => state.map(state => 
      state.id === transaction?.id ? 
      {
        id: transaction.id,
        data: transaction.data,
        ...data
      } : state
    ))
  } 

  function deleteTransaction(transaction: Transaction) {
    setTransactions(state => state.filter(state => state.id !== transaction.id))
  }

  useEffect(() => {
    fetchTransactions();
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction, deleteTransaction, editTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}