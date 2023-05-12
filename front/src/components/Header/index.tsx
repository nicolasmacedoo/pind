import { HeaderContainer, HeaderContent, HeaderImage, HeaderTitle, NewItemButton } from "./style";
import logo from '../../assets/text-logo.png'


interface HeaderProps {
  title: string
  text: string
  handleClearModal: () => void
}


export function Header({ title, text, handleClearModal }: HeaderProps) {
  return (
    <HeaderContainer>  
      <HeaderContent>
        <HeaderImage>
          <img src={logo} alt="" />
        </HeaderImage>
        <HeaderTitle>
          <h1>{title}</h1>
          {/* <NewItemButton onClick={handleAddItem}>{text}</NewItemButton> */}
          <NewItemButton onClick={handleClearModal}>{text}</NewItemButton>
        </HeaderTitle>
    </HeaderContent>
  </HeaderContainer>
  )
}