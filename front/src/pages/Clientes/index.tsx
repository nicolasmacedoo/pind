import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../../components/Form";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { FormContainer, ItemContainer, TableContent } from "./styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Table } from "../../components/Table";

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

  useEffect(() => {
    setClients(clientsList)
  }, []);

  const newProductForm = useForm<NewClientFormData>({
    resolver: zodResolver(newClientFormSchema)
  })

  const { handleSubmit, reset } = newProductForm;

  async function handleCreateClient(data: NewClientFormData) {
    await new Promise(resolve => setTimeout(resolve, 3000))
    setClients(state => [...state, {
      id: Math.floor(Math.random() * 1000),
      ...data
    }])
    console.log(data)
    reset()
    //codigo fechar o modal
    setIsModalOpen(false)
  }

  return (
    <>
      <Header title="Clientes" text="Novo Cliente" isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <FormProvider {...newProductForm}>
        <FormContainer onSubmit={handleSubmit(handleCreateClient)}>
          <Form.Input type="text" name="nome" placeholder="Nome" />
          <Form.ErrorMessage field='nome' />
          <Form.Input type="text" name="cpf" placeholder="CPF" />
          <Form.ErrorMessage field='cpf' />
          <Form.Input type="text " name="telefone" placeholder="Telefone" />
          <Form.ErrorMessage field='telefone' />
          
          <Form.Button type='submit'>Cadastrar</Form.Button>
          {/* TODO: fechar o formulario e atualizar a lista de produtos */}
        </FormContainer>
      </FormProvider>
      </Header>
      <ItemContainer>
        <SearchForm text="Busque por clientes"/>
        <TableContent>
          <Table.Header>
            <Table.Row>
              <Table.Head>Nome</Table.Head>
              <Table.Head>CPF</Table.Head>
              <Table.Head>Telefone</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {clients.map(client => {
              return (
                <Table.Row key={client.id}>
                  <Table.Data>{client.nome}</Table.Data>
                  <Table.Data>{client.cpf}</Table.Data>
                  <Table.Data>{client.telefone}</Table.Data>
                </Table.Row>
              )
            })}
          </Table.Body>
        </TableContent>
      </ItemContainer>
    </>
  )
}