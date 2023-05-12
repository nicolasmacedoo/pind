import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../../components/Form';
import { ErrorSpan, FormContainer } from './styles';

const signInFormSchema = z.object({
  email: z.string()
    .nonempty('O e-mail é obrigatário'),
    // .email('Digite um e-mail válido'),
  password: z.string()
    .min(3, 'A senha deve ter no mínimo 6 caracteres')
})

type SignInFormData = z.infer<typeof signInFormSchema>;

export function Login() {
  const { signIn } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState('')

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema)
  })

  const { 
    handleSubmit, 
  } = signInForm

  async function handleSignIn(data: SignInFormData) {
    const response = await signIn(data)
    console.log(data, response)
    setErrorMessage(response)
  }

  return ( 
    <FormProvider {...signInForm}>
      <FormContainer onSubmit={handleSubmit(handleSignIn)}>
        <Form.Field>
          <Form.Label>E-mail</Form.Label>
          <Form.Input type='text' name='email' />
          <Form.ErrorMessage field='email' />
        </Form.Field>

        <Form.Field>
          <Form.Label>Senha</Form.Label>
          <Form.Input type='password' name='password' />
          <Form.ErrorMessage field='password' />
        </Form.Field>

        {/* TODO: mostrar mensagem de senha incorreta */}

        {errorMessage && <ErrorSpan>{errorMessage}</ErrorSpan>}

        <Form.Button type='submit'>Entrar</Form.Button>
      </FormContainer>
    </FormProvider>
  )
}

