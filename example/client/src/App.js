import React from 'react'
// import AuthorizationCodeExample from './AuthorizationCodeExample'
import { AppProvider } from './context/state'
import {HashRouter,Route,Switch } from 'react-router-dom'
import useLocalStorage from './hooks/useLocalStorage'
import AuthorizationPage from './pages/authorization'
import routes from './routes'

export default function App() {
  const [token, setToken] = useLocalStorage('', 'accessToken')
  
  const pages = routes.map((item, index) => {
    const {compontent:Page,...rest } = item
    return <Route {...rest} key={index} render={routerProps => {
      token ? <Page {...rest} {...routerProps} /> : <AuthorizationPage {...rest} {...routerProps} />
    }} />
  })

  return (
      <AppProvider>
        <HashRouter>
          <Switch>
            {pages}
          </Switch>
        </HashRouter>
      </AppProvider>
  )
}
