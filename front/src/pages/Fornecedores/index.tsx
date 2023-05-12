import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../../components/Form";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { FormContainer, ItemContainer, TableContent } from "./styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Table } from "../../components/Table";

export interface Fornecedor {
  id: number
  nome: string;
  cpf: string;
  telefone: string;
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
  nome: z.string()
    .nonempty('Nome é obrigatário'),
  cpf: z.string(),
  telefone: z.string(),
})

type NewFornecedorFormData = z.infer<typeof newFornecedorFormSchema>

export function Fornecedores() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  useEffect(() => {
    setFornecedores(fornecedoresList)
  }, []);

  const newFornecedorForm = useForm<NewFornecedorFormData>({
    resolver: zodResolver(newFornecedorFormSchema)
  })

  const { handleSubmit, reset } = newFornecedorForm;

  function handleCreateFornecedor(data: NewFornecedorFormData) {
    setFornecedores(state => [...state, {
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
      <Header title="Fornecedores" text="Novo Fornecedor" isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <FormProvider {...newFornecedorForm}>
        <FormContainer onSubmit={handleSubmit(handleCreateFornecedor)}>
          <Form.Input type="text" name="nome" placeholder="Nome" />
          <Form.ErrorMessage field='nome' />
          <Form.Input type="text" name="cpf" placeholder="CPF" />
          <Form.ErrorMessage field='cpf' />
          <Form.Input type="text " name="telefone" placeholder="Telefone" />
          <Form.ErrorMessage field='cpf' />
          
          <Form.Button type='submit'>Cadastrar</Form.Button>
          {/* TODO: fechar o formulario e atualizar a lista de produtos */}
        </FormContainer>
      </FormProvider>
      </Header>
      <ItemContainer>
        <SearchForm text="Busque por fornecedores"/>
        <TableContent>
          <Table.Header>
            <Table.Row>
              <Table.Head>Nome</Table.Head>
              <Table.Head>CPF</Table.Head>
              <Table.Head>Telefone</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {fornecedores.map(fornecedor => {
              return (
                <Table.Row key={fornecedor.id}>
                  <Table.Data>{fornecedor.nome}</Table.Data>
                  <Table.Data>{fornecedor.cpf}</Table.Data>
                  <Table.Data>{fornecedor.telefone}</Table.Data>
                </Table.Row>
              )
            })}
          </Table.Body>
        </TableContent>
      </ItemContainer>
    </>
  )
}