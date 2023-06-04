import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  height: 100vh;
`

export const BgContent = styled.div`
  background: no-repeat center center;
  background-size: cover;
  color: ${(props) => props.theme.color.white};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  font-size: 2rem;

  img {
    width: 30%;
  }

  span {
    font-size: 10rem;
  }
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 20rem;
  gap: 1rem;
  margin: 17rem auto;

  #cadastrar {
    color: ${(props) => props.theme.color['gray-300']};
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.color['green-500']};
  }

  a:hover {
    color: ${(props) => props.theme.color['green-300']};
  }
`

export const ErrorSpan = styled.span`
  color: red;
  font-size: 1rem;
  font-weight: bold;
`
