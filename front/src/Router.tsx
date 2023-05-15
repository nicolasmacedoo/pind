import { Route, Routes } from "react-router-dom";
import { Login  } from "./pages/Login";
import { Dashboard } from "./pages/dashboard";
import { Metrics } from "./pages/metrics";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { Produtos } from "./pages/Produtos";
import { Clientes } from "./pages/Clientes";
import { Fornecedores } from "./pages/Fornecedores";
import { Financeiro } from "./pages/Financeiro";
import { Vendas } from "./pages/Vendas";
import { Compras } from "./pages/Compras";

export function Router() {
  
  return (
    <Routes>
      <Route path="/" element={<Login />} /> 
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/metrics" element={<Metrics />} />
      </Route>
    </Routes> 
  )
}