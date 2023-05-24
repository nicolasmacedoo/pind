import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { ActionsContainer, FormContainer, ItemContainer, TableContent } from "./styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../../components/Form";
import { useContext, useState } from "react";
import { Table } from "../../components/Table";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { priceFormatter, quantityFormatter } from "../../utils/formatter";
import { NewItemModal } from "../../components/NewItemModal";
import { ProductsContext } from "../../contexts/ProductsContext";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit_measurement: string;
  userId: string
}

interface UpdateProductInput {
  id?: string;
  name?: string;
  price?: number;
  quantity?: number;
  unit_measurement?: string;
  userId?: string
}

const newProductFormSchema = z.object({
  name: z.string({
    required_error: 'Nome é obrigatorio',
  })
    .nonempty('Descrição é obrigatoria'),
    price: z.number({
      invalid_type_error: 'Preço é obrigatorio',
    }),
  quantity: z.number(),
  unitMeasurement: z.string(),
})

type NewProductFormData = z.infer<typeof newProductFormSchema>

export function Produtos() {
  const { products, createProduct, updateProduct, deleteProduct } = useContext(ProductsContext)
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  //const [editProduct, setEditProduct] = useState<Product>({} as Product);

  const newProductForm = useForm<NewProductFormData>({
    resolver: zodResolver(newProductFormSchema),
  })

  const { register, handleSubmit, reset, setValue } = newProductForm;


  function handleClearModal() {
    reset()
    // //setEditProduct(null) comentado
    setIsModalOpen(true)
    console.log('limpou')
  }

  function handleEditProduct(product: Product) {
    console.log(product)
    setEditProduct(product)
    // reset(product)
    setValue('name', product.name)
    setValue('quantity', product.quantity)
    setValue('price', product.price)
    setValue('unitMeasurement', product.unit_measurement)
    setIsModalOpen(true)
  }

  function handleCreateProduct(data: NewProductFormData) {
    createProduct(data)
    //setEditProduct(null)
    setIsModalOpen(false)
  }

  
  function handleUpdateProduct(data: UpdateProductInput) {
    if (editProduct) {
      updateProduct(editProduct.id, data)
      reset()
      //setEditProduct(null)
      setIsModalOpen(false)
    }
  }

  function handleDeleteProduct(id: string) {
    deleteProduct(id)
    
    //setEditProduct(null)
    setIsModalOpen(false)
  }

  return (
    <>
      <Header title="Produtos" text='Adicionar produto'  handleClearModal={handleClearModal} />
      <ItemContainer>
        <SearchForm text="Busque por produtos"/>
        <TableContent>
          <Table.Header>
            <Table.Row>
              <Table.Head>Descrição</Table.Head>
              <Table.Head>Preço</Table.Head>
              <Table.Head>Quantidade</Table.Head>
              <Table.Head>Unidade Medida</Table.Head>
              <Table.Head>Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {products.map(product => {
              return (
                <Table.Row key={product.id}>
                  <Table.Data>{product.name}</Table.Data>
                  <Table.Data>{priceFormatter.format(product.price)}</Table.Data>
                  <Table.Data>{quantityFormatter.format(product.quantity)}</Table.Data>
                  <Table.Data>{product.unit_measurement}</Table.Data>
                  <Table.Data>
                    <button onClick={() => handleEditProduct(product)}>
                      <PencilSimple size={24} weight="bold"/>
                    </button>
                    <button onClick={() => handleDeleteProduct(product.id)}>
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
        title={editProduct ? 'Editar produto' : 'Cadastrar produto'}
      >
        <FormProvider {...newProductForm}>
          <FormContainer onSubmit={editProduct ? handleSubmit(handleUpdateProduct): handleSubmit(handleCreateProduct)}>
            <Form.Input type="text" {...register('name')} placeholder="Descrição" />
            <Form.ErrorMessage field='name' />
            <Form.Input type="text" {...register('quantity', {valueAsNumber: true })} placeholder="Quantidade" />
            <Form.ErrorMessage field='quantity' />
            <Form.Input type="text" {...register('price', {valueAsNumber: true })} placeholder="Preço"  /> 
            <Form.ErrorMessage field='price' />
            <Form.Input type="text" {...register('unitMeasurement')} placeholder="Unidade de Medida" />
            <Form.ErrorMessage field='unitMeasurement' />
              
            <ActionsContainer>
              <Form.Button type='button' onClick={() => setIsModalOpen(false)} variant="secondary">Cancelar</Form.Button>
              <Form.Button type='submit' variant="primary">{editProduct ? 'Salvar' : 'Cadastrar'}</Form.Button>
            </ActionsContainer>
          </FormContainer>
        </FormProvider>
      </NewItemModal>
    </> 
  );
}