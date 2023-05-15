import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { ActionsContainer, FormContainer, ItemContainer, TableContent } from "./styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../../components/Form";
import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { priceFormatter } from "../../utils/formatter";
import { NewItemModal } from "../../components/NewItemModal";

export interface Product {
  id: number;
  descricao: string;
  preco: number;
  quantidade: string;
  peso: string;
}

const productsList: Product[] = [
  {
    id: 1,
    descricao: 'Produto 1',
    preco: 100,
    quantidade: '10',
    peso: '535'
  },
  
  {
    id: 2,
    descricao: 'Produto 25',
    preco: 100,
    quantidade: '10',
    peso: '535'
  },
  {
    id: 3,
    descricao: 'Produto 3',
    preco: 100,
    quantidade: '10',
    peso: '535'
  },
  {
    id: 4,
    descricao: 'Produto 4',
    preco: 100,
    quantidade: '10',
    peso: '535'
  },
  {
    id: 5,
    descricao: 'Produto 5',
    preco: 450,
    quantidade: '10',
    peso: '535'
  }
]

const newProductFormSchema = z.object({
  descricao: z.string({
    required_error: 'Descrição é obrigatoria',
  })
    .nonempty('Descrição é obrigatoria'),
  quantidade: z.string(),
  preco: z.number({
    invalid_type_error: 'Preço é obrigatorio',
  }),
  peso: z.string(),
})

type NewProductFormData = z.infer<typeof newProductFormSchema>

export function Produtos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    setProducts(productsList)
  }, [])
  

  const newProductForm = useForm<NewProductFormData>({
    resolver: zodResolver(newProductFormSchema),
  })

  const { register, handleSubmit, reset, setValue } = newProductForm;

  function handleClearModal() {
    reset()
    setEditProduct(null)
    setIsModalOpen(true)
    console.log('limpou')
  }

  function handleCreateProduct(data: NewProductFormData) {
    setProducts(state => [...state, {
      id: Math.floor(Math.random() * 1000),
      ...data
    }])
    //reset()
    setEditProduct(null)
    setIsModalOpen(false)
  }

  function handleEditProduct(product: Product) {
    console.log('handleeditproduct')
    setEditProduct(product)
    // reset(product)
    setValue('descricao', product.descricao)
    setValue('quantidade', product.quantidade)
    setValue('preco', product.preco)
    setValue('peso', product.peso)
    setIsModalOpen(true)
  }

  function handleUpdateProduct(data: NewProductFormData) {
    console.log('atualizar')
    setProducts(state =>
      state.map(product =>
        product.id === editProduct?.id ? { ...editProduct, ...data } : product
      )
    )
    reset()
    setEditProduct(null)
    setIsModalOpen(false)
  }

  function handleDeleteProduct(product: Product) {
    setProducts(state => state.filter(productItem => productItem.id !== product.id))
    setEditProduct(null)
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
              <Table.Head>Peso</Table.Head>
              <Table.Head>Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {products.map(product => {
              return (
                <Table.Row key={product.id}>
                  <Table.Data>{product.descricao}</Table.Data>
                  <Table.Data>{priceFormatter.format(product.preco)}</Table.Data>
                  <Table.Data>{product.quantidade}</Table.Data>
                  <Table.Data>{product.peso}</Table.Data>
                  <Table.Data>
                    <button onClick={() => handleEditProduct(product)}>
                      <PencilSimple size={24} weight="bold"/>
                    </button>
                    <button onClick={() => handleDeleteProduct(product)}>
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
            <Form.Input type="text" {...register('descricao')} placeholder="Descrição" />
            <Form.ErrorMessage field='descricao' />
            <Form.Input type="number" {...register('quantidade')} placeholder="Quantidade" />
            <Form.ErrorMessage field='quantidade' />
            <Form.Input type="number" {...register('preco', {valueAsNumber: true })} placeholder="Preço"  /> 
            <Form.ErrorMessage field='preco' />
            <Form.Input type="number" {...register('peso')} placeholder="Peso" />
            <Form.ErrorMessage field='peso' />
              
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