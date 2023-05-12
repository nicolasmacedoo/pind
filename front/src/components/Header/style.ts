import styled from "styled-components"

export const HeaderContainer = styled.header`
  padding: 1.5rem 0 0.5rem;
  
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1576px;
  margin: 0 auto;
  padding: 0 1.5rem;
  
  
  h1 {
    color: ${props => props.theme.color["gray-100"]};
  }
`
export const HeaderImage = styled.div`
  margin-bottom: 2rem;

  img {
    width: 7rem;
    margin: 0 -11px;
  }
`

export const HeaderTitle = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center; 
  gap: 1rem;

  
`

export const NewItemButton = styled.button`
  height: 50px;
  border: 0;
  background: ${props => props.theme.color["green-700"]};
  color: ${props => props.theme.color.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.color["green-500"]};
    transition: background-color 0.2s;
  }
`
export const FormContainer = styled.form`
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`