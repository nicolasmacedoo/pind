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
import { useContext, useState } from 'react'
import { Table } from '../../components/Table'
import { NewItemModal } from '../../components/NewItemModal'
import { PencilSimple, TrashSimple } from 'phosphor-react'
import { ClientsContext } from '../../contexts/ClientsContext'

interface Client {
  id: string
  user_id: string
  name: string
  cpf: string
  phone: string
}
interface UpdateClientInput {
  id?: string
  user_id?: string
  name?: string
  cpf?: string
  phone?: string
}

const newClientFormSchema = z.object({
  name: z.string().nonempty('Nome é obrigatário'),
  cpf: z.string(),
  phone: z.string(),
})

type NewClientFormData = z.infer<typeof newClientFormSchema>

export function Clientes() {
  const { clients, createClient, updateClient, deleteClient } =
    useContext(ClientsContext)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editClient, setEditClient] = useState<Client | null>(null)

  const newProductForm = useForm<NewClientFormData>({
    resolver: zodResolver(newClientFormSchema),
  })

  const { handleSubmit, reset, register, setValue } = newProductForm

  function handleClearModal() {
    reset()
    setEditClient(null)
    setIsModalOpen(true)
  }

  function handleEditClient(client: Client) {
    setEditClient(client)
    setValue('name', client.name)
    setValue('cpf', client.cpf)
    setValue('phone', client.phone)
    setIsModalOpen(true)
  }

  async function handleCreateClient(data: NewClientFormData) {
    createClient(data)
    setIsModalOpen(false)
  }

  function handleUpdateClient(data: UpdateClientInput) {
    if (editClient) {
      updateClient(editClient.id, data)
      reset()
      setIsModalOpen(false)
    }
  }

  function handleDeleteClient(id: string) {
    deleteClient(id)
  }

  return (
    <>
      <Header
        title="Clientes"
        text="Novo Cliente"
        handleClearModal={handleClearModal}
      />
      <ItemContainer>
        <SearchForm text="Busque por clientes" />
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
            {clients.map((client) => {
              return (
                <Table.Row key={client.id}>
                  <Table.Data>{client.name}</Table.Data>
                  <Table.Data>{client.cpf}</Table.Data>
                  <Table.Data>{client.phone}</Table.Data>
                  <Table.Data>
                    <button onClick={() => handleEditClient(client)}>
                      <PencilSimple size={24} weight="bold" />
                    </button>
                    <button onClick={() => handleDeleteClient(client.id)}>
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
        title={editClient ? 'Editar Cliente' : 'Novo Cliente'}
      >
        <FormProvider {...newProductForm}>
          <FormContainer
            onSubmit={
              editClient
                ? handleSubmit(handleUpdateClient)
                : handleSubmit(handleCreateClient)
            }
          >
            <Form.Input type="text" {...register('name')} placeholder="Nome" />
            <Form.ErrorMessage field="nome" />
            <Form.Input type="text" {...register('cpf')} placeholder="CPF" />
            <Form.ErrorMessage field="cpf" />
            <Form.Input
              type="text "
              {...register('phone')}
              placeholder="Telefone"
            />
            <Form.ErrorMessage field="phone" />

            <ActionsContainer>
              <Form.Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                variant="secondary"
              >
                Cancelar
              </Form.Button>
              <Form.Button type="submit" variant="primary">
                {editClient ? 'Salvar' : 'Cadastrar'}
              </Form.Button>
            </ActionsContainer>
          </FormContainer>
        </FormProvider>
      </NewItemModal>
    </>
  )
}
