import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '../../components/Form'
import { Header } from '../../components/Header'
import { SearchForm } from '../../components/SearchForm'
import {
  ActionsContainer,
  FormContainer,
  ItemContainer,
  TableContent,
} from './styles'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Table } from '../../components/Table'
import { PencilSimple, TrashSimple } from 'phosphor-react'
import { NewItemModal } from '../../components/NewItemModal'

export interface Fornecedor {
  id: number
  nome: string
  cpf: string
  telefone: string
}

const fornecedoresList: Fornecedor[] = [
  {
    id: 1,
    nome: 'Fornecedor 1',
    cpf: '111.111.111-11',
    telefone: '(99) 11111-1111',
  },
  {
    id: 2,
    nome: 'Fornecedor 2',
    cpf: '222.222.222-22',
    telefone: '(99) 22222-2222',
  },
  {
    id: 3,
    nome: 'Fornecedor 3',
    cpf: '333.333.333-33',
    telefone: '(99) 33333-3333',
  },
  {
    id: 4,
    nome: 'Fornecedor 4',
    cpf: '444.444.444-44',
    telefone: '(99) 44444-4444',
  },
]

const newFornecedorFormSchema = z.object({
  nome: z.string().nonempty('Nome é obrigatário'),
  cpf: z.string(),
  telefone: z.string(),
})

type NewFornecedorFormData = z.infer<typeof newFornecedorFormSchema>

export function Fornecedores() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])
  const [editFornecedor, setEditFornecedor] = useState<Fornecedor | null>(null)

  useEffect(() => {
    setFornecedores(fornecedoresList)
  }, [])

  const newFornecedorForm = useForm<NewFornecedorFormData>({
    resolver: zodResolver(newFornecedorFormSchema),
  })

  const { handleSubmit, reset, register, setValue } = newFornecedorForm

  function handleClearModal() {
    reset()
    setEditFornecedor(null)
    setIsModalOpen(true)
  }

  function handleCreateFornecedor(data: NewFornecedorFormData) {
    setFornecedores((state) => [
      ...state,
      {
        id: Math.floor(Math.random() * 1000),
        ...data,
      },
    ])

    setIsModalOpen(false)
  }

  function handleEditFornecedor(fornecedor: Fornecedor) {
    setEditFornecedor(fornecedor)

    setValue('nome', fornecedor.nome)
    setValue('cpf', fornecedor.cpf)
    setValue('telefone', fornecedor.telefone)

    setIsModalOpen(true)
  }

  function handleUpdateFornecedor(data: NewFornecedorFormData) {
    setFornecedores((state) =>
      state.map((fornecedor) =>
        fornecedor.id === editFornecedor?.id
          ? { ...fornecedor, ...data }
          : fornecedor,
      ),
    )
    setIsModalOpen(false)
  }

  function handleDeleteFornecedor(fornecedor: Fornecedor) {
    setFornecedores((state) =>
      state.filter((fornecedorState) => fornecedorState.id !== fornecedor.id),
    )
  }

  return (
    <>
      <Header
        title="Fornecedores"
        text="Novo Fornecedor"
        handleClearModal={handleClearModal}
      />

      <ItemContainer>
        <SearchForm text="Busque por fornecedores" />
        <TableContent>
          <Table.Header>
            <Table.Row>
              <Table.Head>Nome</Table.Head>
              <Table.Head>CPF</Table.Head>
              <Table.Head>Telefone</Table.Head>
              <Table.Head>Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {fornecedores.map((fornecedor) => {
              return (
                <Table.Row key={fornecedor.id}>
                  <Table.Data>{fornecedor.nome}</Table.Data>
                  <Table.Data>{fornecedor.cpf}</Table.Data>
                  <Table.Data>{fornecedor.telefone}</Table.Data>
                  <Table.Data>
                    <button onClick={() => handleEditFornecedor(fornecedor)}>
                      <PencilSimple size={24} weight="bold" />
                    </button>
                    <button onClick={() => handleDeleteFornecedor(fornecedor)}>
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
        title={editFornecedor ? 'Editar Fornecedor' : 'Novo Fornecedor'}
      >
        <FormProvider {...newFornecedorForm}>
          <FormContainer
            onSubmit={
              editFornecedor
                ? handleSubmit(handleUpdateFornecedor)
                : handleSubmit(handleCreateFornecedor)
            }
          >
            <Form.Input type="text" {...register('nome')} placeholder="Nome" />
            <Form.ErrorMessage field="nome" />
            <Form.Input type="text" {...register('cpf')} placeholder="CPF" />
            <Form.ErrorMessage field="cpf" />
            <Form.Input
              type="text "
              {...register('telefone')}
              placeholder="Telefone"
            />
            <Form.ErrorMessage field="cpf" />

            <ActionsContainer>
              <Form.Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                variant="secondary"
              >
                Cancelar
              </Form.Button>
              <Form.Button type="submit" variant="primary">
                {editFornecedor ? 'Salvar' : 'Cadastrar'}
              </Form.Button>
            </ActionsContainer>
          </FormContainer>
        </FormProvider>
      </NewItemModal>
    </>
  )
}
