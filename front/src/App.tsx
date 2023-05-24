import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Router } from "./Router";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./contexts/TransactionsContext";

export function App() {
  return(
    <ThemeProvider theme={defaultTheme} >
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
          <TransactionsProvider>
              <Router />
          </TransactionsProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}