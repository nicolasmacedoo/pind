import { useContext, useState } from 'react'
import { Header } from '../../components/Header'
import {
  ActionsContainer,
  FormContainer,
  ItemContainer,
  PriceHighlight,
  TableContent,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { SearchForm } from '../../components/SearchForm'
import { Table } from '../../components/Table'
import {
  ArrowCircleDown,
  ArrowCircleUp,
  PencilSimple,
  TrashSimple,
} from 'phosphor-react'
import { z } from 'zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../../components/Form'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { NewItemModal } from '../../components/NewItemModal'

interface Transaction {
  id: string
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
  date: Date
}

interface UpdateTransactionInput {
  description?: string
  price?: number
  category?: string
  type?: 'income' | 'outcome'
}

const newTransactionFormSchema = z.object({
  description: z.string().nonempty('Descrição é obrigatária'),
  price: z.coerce.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormData = z.infer<typeof newTransactionFormSchema>

export function Financeiro() {
  const {
    transactions,
    createTransaction,
    deleteTransaction,
    updateTransaction,
  } = useContext(TransactionsContext)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(
    null,
  )
  useState<Transaction | null>(null)

  const newTransactionForm = useForm<NewTransactionFormData>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  const { handleSubmit, reset, register, control, setValue } =
    newTransactionForm

  function handleClearModal() {
    reset()
    setEditTransaction(null)
    setIsModalOpen(true)
  }

  function handleEditTransaction(transaction: Transaction) {
    setEditTransaction(transaction)

    setValue('description', transaction.description)
    setValue('price', transaction.price)
    setValue('category', transaction.category)
    setValue('type', transaction.type)

    setIsModalOpen(true)
  }

  function handleCreateTransaction(data: NewTransactionFormData) {
    createTransaction(data)
    console.log(data)
    setIsModalOpen(false)
  }

  function handleUpdateTransaction(data: UpdateTransactionInput) {
    if (editTransaction) {
      updateTransaction(editTransaction.id, data)
      setIsModalOpen(false)
    }
  }

  return (
    // colocar provider no app?
    <>
      <Header
        title="Financeiro"
        text="Nova transação"
        handleClearModal={handleClearModal}
      />

      <Summary />
      <ItemContainer>
        <SearchForm text="Busque por uma transção" />
        <TableContent>
          <Table.Header>
            <Table.Row>
              <Table.Head>Descrição</Table.Head>
              <Table.Head>Preço</Table.Head>
              <Table.Head>Categoria</Table.Head>
              <Table.Head>Data</Table.Head>
              <Table.Head>Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {transactions?.map((transaction) => {
              return (
                <Table.Row key={transaction.id}>
                  <Table.Data>{transaction.description}</Table.Data>
                  <Table.Data>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </Table.Data>
                  <Table.Data>{transaction.category}</Table.Data>
                  <Table.Data>
                    {/* {dateFormatter.format(new Date(transaction.date))} */}
                    {dateFormatter.format(transaction.date)}
                  </Table.Data>
                  <Table.Data>
                    <button
                      onClick={() => [
                        handleEditTransaction(transaction),
                        setIsModalOpen(true),
                      ]}
                    >
                      <PencilSimple size={24} weight="bold" />
                    </button>
                    <button onClick={() => deleteTransaction(transaction.id)}>
                      <TrashSimple size={24} weight="bold" />
                    </button>
                  </Table.Data>
                </Table.Row>
              )
            })}
          </Table.Body>
        </TableContent>
      </ItemContainer>

      {/* MODAL */}
      <NewItemModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleClearModal={handleClearModal}
        title={editTransaction ? 'Editar transação' : 'Nova transação'}
      >
        <FormProvider {...newTransactionForm}>
          <FormContainer
            onSubmit={
              editTransaction
                ? handleSubmit(handleUpdateTransaction)
                : handleSubmit(handleCreateTransaction)
            }
          >
            <Form.Input
              type="text"
              {...register('description')}
              placeholder="Descrição"
            />
            <Form.ErrorMessage field="description" />
            <Form.Input
              type="number"
              {...register('price', { valueAsNumber: true })}
              placeholder="Preço"
            />
            <Form.ErrorMessage field="price" />
            <Form.Input
              type="text"
              {...register('category')}
              placeholder="Categoria"
            />
            <Form.ErrorMessage field="category" />

            <Controller
              control={control}
              name="type"
              render={({ field }) => {
                return (
                  <TransactionType
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <TransactionTypeButton variant="income" value="income">
                      <ArrowCircleUp size={24} />
                      Entrada
                    </TransactionTypeButton>

                    <TransactionTypeButton variant="outcome" value="outcome">
                      <ArrowCircleDown size={24} />
                      Saida
                    </TransactionTypeButton>
                  </TransactionType>
                )
              }}
            />

            <ActionsContainer>
              <Form.Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                variant="secondary"
              >
                Cancelar
              </Form.Button>
              <Form.Button type="submit" variant="primary">
                {editTransaction ? 'Salvar' : 'Cadastrar'}
              </Form.Button>
            </ActionsContainer>
          </FormContainer>
        </FormProvider>
      </NewItemModal>
    </>
  )
}
