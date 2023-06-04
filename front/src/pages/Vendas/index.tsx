import { useContext, useState } from 'react'
import { Header } from '../../components/Header'
import { NewItemModal } from '../../components/NewItemModal'
import { z } from 'zod'
import { FormProvider, useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ActionsContainer,
  AddButton,
  FieldsContainer,
  FormContainer,
  RemoveButton,
  SelectField,
  SpanError,
} from './styles'
import { Form } from '../../components/Form'
import { Trash } from 'phosphor-react'
import { ClientsContext } from '../../contexts/ClientsContext'
import { ProductsContext } from '../../contexts/ProductsContext'
import axios from 'axios'

const newOrderFormSchema = z.object({
  client: z.string().nonempty({ message: 'Campo obrigatório' }),
  products: z
    .array(
      z.object({
        // name: z.string().nonempty({ message: 'Campo obrigatório' }),
        id: z.string().nonempty({ message: 'Campo obrigatório' }),
        quantity: z.coerce.number().min(1, 'Quantidade mínima é 1'),
      }),
    )
    .min(1, 'Deve haver pelo menos um produto'),
})

type NewOrderFormData = z.infer<typeof newOrderFormSchema>

export function Vendas() {
  const { clients } = useContext(ClientsContext)
  const { products } = useContext(ProductsContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const newOrderForm = useForm<NewOrderFormData>({
    resolver: zodResolver(newOrderFormSchema),
  })

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = newOrderForm

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  })

  function addNewProduct() {
    append({ id: '', quantity: 0 })
  }

  function removeProduct(index: number) {
    remove(index)
  }

  function handleClearModal() {
    reset()
    setIsModalOpen(true)
    remove(fields.length - 1)
  }

  function handleCreateOrder(data: NewOrderFormData) {
    const total = data.products.reduce((acc, product) => {
      const price = products.find((p) => p.id === product.id)?.price
      if (price) {
        return acc + product.quantity * price
      }
      return 0
    }, 0)

    console.log(total)

    axios.post('http://localhost:3000/order', data).then((response) => {
      console.log(response.data)
    })

    console.log(JSON.stringify(data, null, 2))
    reset()
    remove(fields.length - 1)
  }

  return (
    <>
      <Header
        title="Vendas"
        text="Nova Venda"
        handleClearModal={handleClearModal}
      />

      {/* MODAL */}
      <NewItemModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleClearModal={handleClearModal}
        title="Nova Venda"
      >
        <FormProvider {...newOrderForm}>
          <FormContainer onSubmit={handleSubmit(handleCreateOrder)}>
            <Form.Field>
              <Form.Label>Cliente</Form.Label>
              <SelectField {...register('client')}>
                <option value="">Selecione ...</option>
                {clients.map((client) => {
                  return (
                    <option key={client.id} value={client.name}>
                      {client.name}
                    </option>
                  )
                })}
              </SelectField>
              <Form.ErrorMessage field="client" />
            </Form.Field>

            <Form.Field>
              <Form.Label>
                Produtos
                <AddButton type="button" onClick={addNewProduct}>
                  Adicionar
                </AddButton>
              </Form.Label>
              {fields.map((field, index) => {
                return (
                  <FieldsContainer key={field.id}>
                    <Form.Field>
                      <SelectField {...register(`products.${index}.id`)}>
                        <option value="">Selecione ...</option>
                        {products.map((product) => {
                          return (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          )
                        })}
                      </SelectField>
                      <SpanError>
                        {errors.products?.[index]?.id?.message}
                      </SpanError>
                    </Form.Field>

                    <Form.Field>
                      <Form.Input
                        type="number"
                        placeholder="Quantidade"
                        {...register(`products.${index}.quantity`)}
                      />
                      {errors.products?.[index]?.quantity && (
                        <SpanError>
                          {errors.products?.[index]?.quantity?.message}
                        </SpanError>
                      )}
                    </Form.Field>

                    <RemoveButton
                      type="button"
                      onClick={() => removeProduct(index)}
                    >
                      <Trash size={24} weight="bold" />
                    </RemoveButton>
                  </FieldsContainer>
                )
              })}
              <Form.ErrorMessage field="products" />
            </Form.Field>

            <ActionsContainer>
              <Form.Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                variant="secondary"
              >
                Cancelar
              </Form.Button>
              <Form.Button type="submit" variant="primary">
                Cadastrar
              </Form.Button>
            </ActionsContainer>
          </FormContainer>
        </FormProvider>
      </NewItemModal>
    </>
  )
}
