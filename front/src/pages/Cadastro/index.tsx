import { UserPlus } from 'phosphor-react'
import {
  AddressGrid,
  CepGrid,
  CityGrid,
  ComplementGrid,
  Container,
  CpfGrid,
  FirstHalfGrid,
  FormContent,
  FullGrid,
  LastHalfGrid,
  NeighGrid,
  NumberGrid,
  PhoneGrid,
  StateGrid,
  Title,
} from './styles'
import { Form } from '../../components/Form'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../services/api'
import { isValidCPF } from '../../utils/validation'
import {
  cepFormatter,
  cpfFormatter,
  phoneFormatter,
} from '../../utils/formatter'
import { getAdressByCep } from '../../services/get-address'
import { useState } from 'react'

const newUserFormSchema = z.object({
  name: z.string().min(1, 'Preencha o nome'),
  lastname: z.string().min(1, 'Preencha o sobrenome'),
  cpf: z
    .string()
    .nonempty('Preencha o CPF')
    .refine((val) => isValidCPF(val), { message: 'CPF inválido' }),
  phone: z.string(),
  cep: z.string(),
  street: z.string(),
  neighborhood: z.string(),
  number: z.string(),
  complement: z.string(),
  state: z.string(),
  city: z.string(),
  email: z.string().min(1, 'Preencha o email'),
  password: z.string().min(1, 'Preencha a senha'),
})

type NewUserFormData = z.infer<typeof newUserFormSchema>

export function Cadastro() {
  const [cepError, setCepError] = useState(false)

  const newUserForm = useForm<NewUserFormData>({
    resolver: zodResolver(newUserFormSchema),
  })

  const { handleSubmit, register, reset, setValue } = newUserForm

  function handleCreateNewUser(data: NewUserFormData) {
    api.post('/users', data)
    console.log(data)
    console.log('Cadastrado')
    reset()
  }

  return (
    <Container>
      <Title>
        <UserPlus size={44} weight="bold" />
        <h1>Cadastro</h1>
      </Title>
      <p>Cadastre-se para começar a usar o sistema.</p>

      <FormProvider {...newUserForm}>
        <FormContent onSubmit={handleSubmit(handleCreateNewUser)}>
          <FirstHalfGrid>
            <Form.Label>Nome</Form.Label>
            <Form.Input type="text" {...register('name')} placeholder="Nome" />
            <Form.ErrorMessage field="name" />
          </FirstHalfGrid>

          <LastHalfGrid>
            <Form.Label>Sobrenome</Form.Label>
            <Form.Input
              type="text"
              {...register('lastname')}
              placeholder="Sobrenome"
            />
            <Form.ErrorMessage field="lastname" />
          </LastHalfGrid>

          <CpfGrid>
            <Form.Label>CPF</Form.Label>
            <Form.Input
              type="text"
              placeholder="CPF"
              {...register('cpf')}
              onChange={(e) => {
                e.target.value = cpfFormatter(e.target.value)
              }}
            />
            <Form.ErrorMessage field="cpf" />
          </CpfGrid>

          <PhoneGrid>
            <Form.Label>Celular</Form.Label>
            <Form.Input
              type="text"
              placeholder="Celular"
              {...register('phone')}
              onChange={(e) => {
                e.target.value = phoneFormatter(e.target.value)
              }}
            />
          </PhoneGrid>

          <CepGrid>
            <Form.Label>CEP</Form.Label>
            <Form.Input
              type="text"
              placeholder="CEP"
              {...register('cep')}
              onBlur={(e) => {
                try {
                  getAdressByCep(e.target.value).then((response) => {
                    if (response.erro) {
                      setCepError(true)
                      console.log('******')
                      return
                    }
                    setCepError(false)
                    setValue('street', response.logradouro)
                    setValue('neighborhood', response.bairro)
                    setValue('city', response.localidade)
                    setValue('state', response.uf)
                  })
                } catch (err) {
                  console.log(err)
                }
              }}
              onChange={(e) => {
                e.target.value = cepFormatter(e.target.value)
              }}
            />
            {/* <Form.ErrorMessage field="cep" /> */}
            {cepError && <span>CEP não encontrado</span>}
          </CepGrid>

          <AddressGrid>
            <Form.Label>Logradouro</Form.Label>
            <Form.Input
              type="text"
              {...register('street')}
              placeholder="Logradouro"
            />
          </AddressGrid>

          <NumberGrid>
            <Form.Label>Número</Form.Label>
            <Form.Input
              type="text"
              {...register('number')}
              placeholder="Número"
            />
          </NumberGrid>

          <NeighGrid>
            <Form.Label>Bairro</Form.Label>
            <Form.Input
              type="text"
              {...register('neighborhood')}
              placeholder="Bairro"
            />
          </NeighGrid>

          <ComplementGrid>
            <Form.Label>Complemento</Form.Label>
            <Form.Input
              type="text"
              {...register('complement')}
              placeholder="Complemento"
            />
          </ComplementGrid>

          <StateGrid>
            <Form.Label>Estado</Form.Label>
            <Form.Input
              type="text"
              {...register('state')}
              placeholder="Estado"
            />
          </StateGrid>

          <CityGrid>
            <Form.Label>Cidade</Form.Label>
            <Form.Input
              type="text"
              {...register('city')}
              placeholder="Cidade"
            />
          </CityGrid>

          <FullGrid>
            <h2>Informações de Login</h2>
          </FullGrid>

          <FirstHalfGrid>
            <Form.Label>Email</Form.Label>
            <Form.Input
              type="text"
              {...register('email')}
              placeholder="Email"
            />
            <Form.ErrorMessage field="email" />
          </FirstHalfGrid>

          <LastHalfGrid>
            <Form.Label>Senha</Form.Label>
            <Form.Input
              type="password"
              {...register('password')}
              placeholder="Senha"
            />
            <Form.ErrorMessage field="password" />
          </LastHalfGrid>

          <Form.Button type="submit" variant="primary">
            Cadastrar
          </Form.Button>
        </FormContent>
      </FormProvider>
    </Container>
  )
}
