import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../../components/Form'
import { BgContent, Container, ErrorSpan, FormContainer } from './styles'

import bg from '../../assets/plantacao.jpg'
import logo from '../../assets/logo.svg'

const signInFormSchema = z.object({
  email: z.string().nonempty('O e-mail é obrigatário'),
  // .email('Digite um e-mail válido'),
  password: z.string().min(3, 'A senha deve ter no mínimo 6 caracteres'),
})

type SignInFormData = z.infer<typeof signInFormSchema>

export function Login() {
  const { signIn } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState('')

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  })

  const { handleSubmit, register } = signInForm

  async function handleSignIn(data: SignInFormData) {
    const response = await signIn(data)
    console.log(data, response)
    setErrorMessage(response)
  }

  return (
    <Container>
      <BgContent style={{ backgroundImage: `url(${bg})` }}>
        <img src={logo} alt="" />
        <h1>
          Gestão inteligente <br /> do seu <br /> <span>Estoque</span>
        </h1>
      </BgContent>
      <FormProvider {...signInForm}>
        <FormContainer onSubmit={handleSubmit(handleSignIn)}>
          <Form.Field>
            <Form.Label>E-mail</Form.Label>
            <Form.Input type="text" {...register('email')} />
            <Form.ErrorMessage field="email" />
          </Form.Field>

          <Form.Field>
            <Form.Label>Senha</Form.Label>
            <Form.Input type="password" {...register('password')} />
            <Form.ErrorMessage field="password" />
          </Form.Field>

          {errorMessage && <ErrorSpan>{errorMessage}</ErrorSpan>}

          <Form.Button type="submit">Entrar</Form.Button>
        </FormContainer>
      </FormProvider>
    </Container>
  )
}
