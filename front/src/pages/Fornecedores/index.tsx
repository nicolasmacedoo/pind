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
import { PencilSimple, TrashSimple } from 'phosphor-react'
import { NewItemModal } from '../../components/NewItemModal'
import { SuppliersContext } from '../../contexts/SuppliersContext'

interface Supplier {
  id: string
  user_id: string
  name: string
  cnpj: string
  phone: string
}
interface UpdateSupplierInput {
  id?: string
  user_id?: string
  name?: string
  cnpj?: string
  phone?: string
}

const newSupplierFormSchema = z.object({
  name: z.string().nonempty('Nome é obrigatário'),
  cnpj: z.string(),
  phone: z.string(),
})

type NewSupplierFormData = z.infer<typeof newSupplierFormSchema>

export function Fornecedores() {
  const { suppliers, createSupplier, deleteSupplier, updateSupplier } =
    useContext(SuppliersContext)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editSupplier, setEditSupplier] = useState<Supplier | null>(null)

  const newSupplierForm = useForm<NewSupplierFormData>({
    resolver: zodResolver(newSupplierFormSchema),
  })

  const { handleSubmit, reset, register, setValue } = newSupplierForm

  function handleClearModal() {
    reset()
    setEditSupplier(null)
    setIsModalOpen(true)
  }

  function handleEditSupplier(supplier: Supplier) {
    setEditSupplier(supplier)

    setValue('name', supplier.name)
    setValue('cnpj', supplier.cnpj)
    setValue('phone', supplier.phone)

    setIsModalOpen(true)
  }

  function handleCreateSupplier(data: NewSupplierFormData) {
    createSupplier(data)
    setIsModalOpen(false)
  }

  function handleUpdateSupplier(data: UpdateSupplierInput) {
    if (editSupplier) {
      updateSupplier(editSupplier.id, data)
      setIsModalOpen(false)
    }
  }

  function handleDeleteSupplier(id: string) {
    deleteSupplier(id)
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
            {suppliers.map((supplier) => {
              return (
                <Table.Row key={supplier.id}>
                  <Table.Data>{supplier.name}</Table.Data>
                  <Table.Data>{supplier.cnpj}</Table.Data>
                  <Table.Data>{supplier.phone}</Table.Data>
                  <Table.Data>
                    <button onClick={() => handleEditSupplier(supplier)}>
                      <PencilSimple size={24} weight="bold" />
                    </button>
                    <button onClick={() => handleDeleteSupplier(supplier.id)}>
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
        title={editSupplier ? 'Editar Fornecedor' : 'Novo Fornecedor'}
      >
        <FormProvider {...newSupplierForm}>
          <FormContainer
            onSubmit={
              editSupplier
                ? handleSubmit(handleUpdateSupplier)
                : handleSubmit(handleCreateSupplier)
            }
          >
            <Form.Input type="text" {...register('name')} placeholder="Nome" />
            <Form.ErrorMessage field="name" />
            <Form.Input type="text" {...register('cnpj')} placeholder="CPF" />
            <Form.ErrorMessage field="cnpj" />
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
                {editSupplier ? 'Salvar' : 'Cadastrar'}
              </Form.Button>
            </ActionsContainer>
          </FormContainer>
        </FormProvider>
      </NewItemModal>
    </>
  )
}
