import { Link } from "react-router-dom";
import { SideBarWrapper, SideBarButton, SideBarItems, SideBarHeader, SignOutButton, SideBarFooter } from "./styles";
import { ChartBar, CurrencyDollar, List, Package, ShoppingCartSimple, SignOut, Truck, Users } from 'phosphor-react'
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import logo from '../../assets/Logo.svg'



type SideBarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type  SideBarItemProps = {
  icon: React.ReactNode;
  text: string;
}

export function SideBar({ isOpen, setIsOpen }:SideBarProps) {
  const { signOut } = useContext(AuthContext)

  const SideBarItem = ({icon, text} : SideBarItemProps) => (
    <li>
      {icon}
      {isOpen && <span>{text}</span>}
    </li>
  )
 
  return (
      <SideBarWrapper isOpen={isOpen}>
        <SideBarHeader>
          {/* {isOpen && <span>PIND</span>} */}
          {isOpen && <img src={logo} alt="Logo" />}
          <SideBarButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
            <List size={32} weight="fill" />
          </SideBarButton>
        </SideBarHeader>

        <SideBarItems>
          <Link to={'/produtos'}><SideBarItem icon={<Package size={32} weight="bold" />} text="Produtos" /></Link>
          <Link to={'/clientes'}><SideBarItem icon={<Users size={32} weight="bold" />} text="Clientes" /></Link>
          <Link to={'/fornecedores'}><SideBarItem icon={<Truck size={32} weight="bold" />} text="Fornecedores" /></Link>
          <Link to={'/financeiro'}><SideBarItem icon={<CurrencyDollar size={32} weight="bold" />} text="Financeiro" /></Link>
          <Link to={'/vendas'}><SideBarItem icon={<ChartBar size={32} weight="bold" />} text="Vendas" /></Link>
          <Link to={'/compras'}><SideBarItem icon={<ShoppingCartSimple size={32} weight="bold" />} text="Compras" /></Link>
        </SideBarItems>


        <SideBarFooter>
          <SignOutButton onClick={signOut}>
            <SignOut size={32} weight="bold" />
            {isOpen && <span>Sair</span>}
          </SignOutButton>
        </SideBarFooter>

      </SideBarWrapper>
  )
}