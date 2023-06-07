import { Autocomplete, TextField } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
  margin: 5rem 5rem;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const AutoCompleteStyled = styled(Autocomplete)`
  color: ${(props) => props.theme.color['gray-300']};
`

export const TextFieldStyled = styled(TextField)`
  background: ${(props) => props.theme.color['gray-700']};

  &:focus {
    outline: initial;
    box-shadow: initial;
  }
`
