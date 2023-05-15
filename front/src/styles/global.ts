import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  input:focus{
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme.color['green-500']}
  }
  
  body {
    background: ${(props) => props.theme.color['gray-600']};
  }
`