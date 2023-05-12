import { NewItemModal } from "../NewItemModal";
import { HeaderContainer, HeaderContent, HeaderImage, HeaderTitle, NewItemButton } from "./style";
import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from "react";
import logo from '../../assets/text-logo.png'


interface HeaderProps {
  title: string
  text: string
  children: ReactNode
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  handleAddItem: () => void
}


export function Header({ title, text, children, isModalOpen, setIsModalOpen, handleAddItem }: HeaderProps) {
  return (
    <HeaderContainer>  
      <HeaderContent>
        <HeaderImage>
          <img src={logo} alt="" />
        </HeaderImage>
        <HeaderTitle>
          <h1>{title}</h1>
          <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        {/* <Dialog.Trigger asChild> */}
          <NewItemButton onClick={handleAddItem}>{text}</NewItemButton>
        {/* </Dialog.Trigger> */}
        <NewItemModal title={text} children={children} handleAddItem={handleAddItem}/>
      </Dialog.Root>
        </HeaderTitle>

      
      
    </HeaderContent>
  </HeaderContainer>
  )
}