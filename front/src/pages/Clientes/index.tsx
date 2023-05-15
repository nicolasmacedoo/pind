import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../../components/Form";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { ActionsContainer, FormContainer, ItemContainer, TableContent } from "./styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { NewItemModal } from "../../components/NewItemModal";
import { PencilSimple, TrashSimple } from "phosphor-react";

export interface Clients {
  id: number
  nome: string;
  cpf: string;
  telefone: string;
}

const clientsList: Clients[] = [
  {
    id: 1,
    nome: 'Cliente 1',
    cpf: '111.111.111-11',
    telefone: '(99) 11111-1111',
  },
  {
    id: 2,
    nome: 'Cliente 2',
    cpf: '222.222.222-22',
    telefone: '(99) 22222-2222',
  },
  {
    id: 3,
    nome: 'Cliente 3',
    cpf: '333.333.333-33',
    telefone: '(99) 33333-3333',
  },
  {
    id: 4,
    nome: 'Cliente 4',
    cpf: '444.444.444-44',
    telefone: '(99) 44444-4444',
  },
]

const newClientFormSchema = z.object({
  nome: z.string()
    .nonempty('Nome é obrigatário'),
  cpf: z.string(),
  telefone: z.string(),
})

type NewClientFormData = z.infer<typeof newClientFormSchema>

export function Clientes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState<Clients[]>([]);
  const [editClient, setEditClient] = useState<Clients | null>(null);

  useEffect(() => {
    setClients(clientsList)
  }, []);

  const newProductForm = useForm<NewClientFormData>({
    resolver: zodResolver(newClientFormSchema)
  })

  const { handleSubmit, reset, register, setValue } = newProductForm;

  function handleClearModal() {
    reset()
    setEditClient(null)
    setIsModalOpen(true)
  }

  async function handleCreateClient(data: NewClientFormData) {
    await new Promise(resolve => setTimeout(resolve, 3000))
    setClients(state => [...state, {
      id: Math.floor(Math.random() * 1000),
      ...data
    }])
    console.log(data)
    reset()
    setIsModalOpen(false)
  }

  function handleEditClient(client: Clients) {
    setEditClient(client)
    setValue('nome', client.nome)
    setValue('cpf', client.cpf)
    setValue('telefone', client.telefone)
    setIsModalOpen(true)
  }

  function handleUpdateClient(data: NewClientFormData) {
    setClients(state => 
      state.map(client => 
        client.id === editClient?.id ? {...client, ...data} : client
    ))
    setIsModalOpen(false)
  }

  function handleDeleteClient(client: Clients) {
    setClients(state => state.filter(cli => cli.id !== client.id))
  }

  return (
    <>
      <Header title="Clientes" text="Novo Cliente" handleClearModal={handleClearModal} />
      <ItemContainer>
        <SearchForm text="Busque por clientes"/>
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
            {clients.map(client => {
              return (
                <Table.Row key={client.id}>
                  <Table.Data>{client.nome}</Table.Data>
                  <Table.Data>{client.cpf}</Table.Data>
                  <Table.Data>{client.telefone}</Table.Data>
                  <Table.Data>
                    <button onClick={() => handleEditClient(client)}>
                      <PencilSimple size={24} weight="bold"/>
                    </button>
                    <button onClick={() => handleDeleteClient(client)}>
                      <TrashSimple size={24} weight="bold"/>
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
          <FormContainer onSubmit={editClient ? handleSubmit(handleUpdateClient) : handleSubmit(handleCreateClient)}>
            <Form.Input type="text" {...register('nome')} placeholder="Nome" />
            <Form.ErrorMessage field='nome' />
            <Form.Input type="text" {...register('cpf')} placeholder="CPF" />
            <Form.ErrorMessage field='cpf' />
            <Form.Input type="text " {...register('telefone')} placeholder="Telefone" />
            <Form.ErrorMessage field='telefone' />
            
            <ActionsContainer>
              <Form.Button type='button' onClick={() => setIsModalOpen(false)} variant="secondary">Cancelar</Form.Button>
              <Form.Button type='submit' variant="primary">{editClient ? 'Salvar' : 'Cadastrar'}</Form.Button>
            </ActionsContainer>
          </FormContainer>
        </FormProvider>
      </NewItemModal>
    </>
  )
}