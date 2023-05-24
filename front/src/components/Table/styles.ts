import styled from 'styled-components'

export const TableRow = styled.tr`
  th:first-child {
    width: 40%;
  }

  td:last-child {
    display: flex;
    gap: 2rem;
  }

  td:last-child > button:last-child:hover {
    color: red;
  }

  td:last-child > button:first-child:hover {
    color: ${(props) => props.theme.color['green-300']};
  }

  button {
    background: transparent;
    border: none;
    color: ${(props) => props.theme.color.white};
  }
`

export const TableHead = styled.th`
  text-align: start;
  padding: 1.25rem 2rem;
  color: ${(props) => props.theme.color['green-300']};
  background: ${(props) => props.theme.color['gray-700']};

  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`

export const TableData = styled.td`
  padding: 1.25rem 2rem;
  background: ${(props) => props.theme.color['gray-700']};

  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`
