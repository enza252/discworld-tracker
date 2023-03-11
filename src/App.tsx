import { CookiesProvider } from "react-cookie"

import { AppPage } from "./components/AppPage"

const App = () => {
  return (
    <CookiesProvider>
      <AppPage />
    </CookiesProvider>
  )
}

export default App
