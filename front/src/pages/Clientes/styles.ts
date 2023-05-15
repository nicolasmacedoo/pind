import styled from "styled-components";


export const ItemContainer = styled.main`
  width: 100%;
  max-width: 1576px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
  color: ${props => props.theme.color["gray-100"]};
`

export const FormContainer = styled.form`
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ActionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`

export const TableContent = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;
`