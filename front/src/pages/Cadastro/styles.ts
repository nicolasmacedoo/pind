import styled from 'styled-components'

export const Container = styled.div`
  max-width: 45rem;
  height: calc(100vh - 5rem);
  margin: 2.5rem auto;
  background-color: ${(props) => props.theme.color['gray-700']};
  padding: 2.5rem;
  border-radius: 8px;

  > p {
    color: ${(props) => props.theme.color['gray-300']};
    font-size: 1.2rem;
    margin-bottom: 3rem;
  }

  button {
    display: block;
    margin: 0 auto;
    margin-top: 1.5rem;
  }
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  color: ${(props) => props.theme.color['green-300']};
`

export const FormContent = styled.form`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 1.2rem;

  input {
    width: 100%;
    background-color: ${(props) => props.theme.color['gray-600']};
  }
`
export const FullGrid = styled.div`
  grid-column: 1/8;
  margin-bottom: 1rem;

  h2 {
    color: ${(props) => props.theme.color['green-300']};
    margin-bottom: 0.5rem;
  }
`
export const FirstHalfGrid = styled.div`
  grid-column: 1/4;
  margin-bottom: 1rem;
`
export const LastHalfGrid = styled.div`
  grid-column: 4/8;
  margin-bottom: 1rem;
`

export const CpfGrid = styled.div`
  grid-column: 1/3;
  margin-bottom: 1rem;
`

export const PhoneGrid = styled.div`
  grid-column: 3/5;
  margin-bottom: 1rem;
`

export const CepGrid = styled.div`
  grid-column: 1/2;
  margin-bottom: 1rem;

  span {
    margin-top: 0.25rem;
    color: #ef4444;
    font-size: 0.75rem;
    line-height: 1rem;
  }
`

export const AddressGrid = styled.div`
  grid-column: 2/6;
  margin-bottom: 1rem;
`
export const NeighGrid = styled.div`
  grid-column: 1/3;
  margin-bottom: 1rem;
`
export const NumberGrid = styled.div`
  grid-column: 6/8;
  margin-bottom: 1rem;
`
export const ComplementGrid = styled.div`
  grid-column: 3/5;
  margin-bottom: 1.5rem;
`

export const StateGrid = styled.div`
  grid-column: 5/6;
  margin-bottom: 1.5rem;
`

export const CityGrid = styled.div`
  grid-column: 6/8;
  margin-bottom: 1.5rem;
`
