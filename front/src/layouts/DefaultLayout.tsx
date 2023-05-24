import { Outlet } from 'react-router-dom'
import { SideBar } from '../components/SideBar/SideBar'
import { Container, Content } from './styles'
import { useState } from 'react'

export function DefaultLayout() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Container>
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Content isOpen={isOpen}>
          <Outlet />
        </Content>
      </Container>
    </>
  )
}
