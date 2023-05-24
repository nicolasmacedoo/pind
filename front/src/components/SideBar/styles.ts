import styled from 'styled-components'

export const SideBarWrapper = styled.aside<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0;
  background-color: ${(props) => props.theme.color['gray-700']};
  border-right: 1px solid black;
  box-shadow: ${({ isOpen }) =>
    isOpen ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none'};
  height: 100vh;
  width: ${({ isOpen }) => (isOpen ? '200px' : '60px')};
  transition: width 0.3s ease-in-out;
`

export const SideBarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  span {
    color: ${(props) => props.theme.color['green-500']};
    font-weight: 800;
    font-size: 2rem;
  }

  img {
    width: 50%;
  }
`

export const SideBarButton = styled.button<{ isOpen: boolean }>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  color: ${(props) => props.theme.color['green-500']};
`

export const SideBarItems = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.color['green-500']};
    font-size: 1.2rem;
    font-weight: 800;
  }

  a:hover {
    color: ${(props) => props.theme.color['green-300']};
  }
`

export const SideBarFooter = styled.div`
  span {
    color: ${(props) => props.theme.color['green-500']};
    font-size: 1.2rem;
    font-weight: 800;
  }
`

export const SignOutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;

  background-color: transparent;
  color: ${(props) => props.theme.color['green-500']};
  border: none;
  cursor: pointer;
`
