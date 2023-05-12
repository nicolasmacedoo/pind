import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex; 
  flex-direction: column; 
  width: 100%; 
  max-width: 20rem; 
  gap: 1rem; 
  margin: 17rem auto;
`

export const ErrorSpan = styled.span`
  color: red;
  font-size: 1rem;
  font-weight: bold;
`