import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
`
export const Content = styled.div<{ isOpen: boolean }>`
  flex: 1;
  background-color: ${(props) => props.theme.color['gray-600']};
  /* padding: 1rem 5rem; */

  height: 100vh;
  overflow-y: scroll;

  width: ${({ isOpen }) => (isOpen ? 'calc(100% - 300px)' : '100%')};
  transition: width 0.3s ease-in-out;
`
