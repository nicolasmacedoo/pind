import { useContext, useState } from "react";
import { Header } from "../../components/Header";
import { FormContainer, ItemContainer, PriceHighlight, TableContent, TransactionType, TransactionTypeButton } from "./styles";
import { SearchForm } from "../../components/SearchForm";
import { Table } from "../../components/Table";
import { ArrowCircleDown, ArrowCircleUp, PencilSimple, TrashSimple } from "phosphor-react";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../components/Form";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";

export interface Transaction {
  id: number;
  descricao: string;
  preco: number;
  categoria: string;
  type: 'income' | 'outcome';
  data: string
}

const newTransactionFormSchema = z.object({
  descricao: z.string()
    .nonempty("Descrição é obrigatária"),
  preco: z.number(),
  categoria: z.string(),
  type: z.enum(["income", "outcome"])
})

type NewTransactionFormData = z.infer<typeof newTransactionFormSchema>

export function Financeiro() {
  const { transactions, createTransaction, deleteTransaction, editTransaction } = useContext(TransactionsContext)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  //const [transactions, setTransactions] = useState<Transaction[]>([]);

  // useEffect(() => {
  //   setTransactions(transactionList);
  // }, [])

  const newTransactionForm = useForm<NewTransactionFormData>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  const { 
    handleSubmit, 
    reset, 
    register,
    control,
    setValue
  } = newTransactionForm;
  
  function handleEditTransaction(transaction: Transaction) {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
    setValue('descricao', transaction.descricao);
    setValue('preco', transaction.preco);
    setValue('categoria', transaction.categoria);
    setValue('type', transaction.type);
  }

  function handleCreateTransaction(data: NewTransactionFormData) {
    createTransaction(data)
    console.log(data);
    reset();
    setIsModalOpen(false);
  }

  function handleUpdateTransaction(data: NewTransactionFormData) {
    editTransaction(data, selectedTransaction)
    reset();
    setIsModalOpen(false);
    setSelectedTransaction(null);
  }
    
    

  function handleAddItem() {
    reset();
    setIsModalOpen(true);
    setSelectedTransaction(null);
  }

  return (
    //colocar provider no app? 
    <>
      <Header title="Financeiro" text={selectedTransaction ? "Editar transação" : "Nova transação"} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleAddItem={handleAddItem} >
        <FormProvider {...newTransactionForm}>
          <FormContainer onSubmit={selectedTransaction ? handleSubmit(handleUpdateTransaction) : handleSubmit(handleCreateTransaction)}>
            <Form.Input type="text" name="descricao" placeholder="Descrição" />
            <Form.ErrorMessage field='descricao' />
            <Form.Input type="number" {...register('preco', {valueAsNumber: true })} placeholder="Preço" />
            <Form.ErrorMessage field='preco' />
            <Form.Input type="text " name="categoria" placeholder="Categoria" />
            <Form.ErrorMessage field='categoria' />
            
            <Controller
              control={control}
              name='type'
              render={({ field }) => {
                return (
                  <TransactionType onValueChange={field.onChange} value={field.value}>
                    <TransactionTypeButton variant='income' value='income'>
                      <ArrowCircleUp size={24} />
                      Entrada
                    </TransactionTypeButton>

                    <TransactionTypeButton variant='outcome' value='outcome'>
                      <ArrowCircleDown size={24} />
                      Saida
                    </TransactionTypeButton>
                   </TransactionType>
                )
              }}
            />

            <Form.Button type='submit'>{selectedTransaction ? "Salvar" : "Cadastrar"}</Form.Button>
          </FormContainer>
        </FormProvider>
      </Header>
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
              {transactions?.map(transaction => {
                return (
                  <Table.Row key={transaction.id}>
                    <Table.Data>{transaction.descricao}</Table.Data>
                    <Table.Data>
                      <PriceHighlight variant={transaction.type}>
                        {transaction.type === 'outcome' && '- '}
                        {priceFormatter.format(transaction.preco)}
                      </PriceHighlight>
                    </Table.Data>
                    <Table.Data>{transaction.categoria}</Table.Data>
                    <Table.Data>{dateFormatter.format(new Date(transaction.data))}</Table.Data>
                    <Table.Data>
                    <button onClick={() => [handleEditTransaction(transaction), setIsModalOpen(true)]}>
                      <PencilSimple size={24} weight="bold"/>
                    </button>
                    <button onClick={() => deleteTransaction(transaction)}>
                      <TrashSimple size={24} weight="bold"/>
                    </button>
                  </Table.Data>
                  </Table.Row>
                )
              })}
          </Table.Body>
        </TableContent>
      </ItemContainer>
    </>
  );
}