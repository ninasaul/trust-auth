import React, {Suspense} from 'react'
import {AppProvider} from './context/state'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {useLocalStorageState} from 'ahooks'
import Authorization from './pages/authorization/index'
import Home from './pages/Home/index'
import routes from './routes'
import './assets/icon.scss'
import './pages/home/style.scss'

export default function App() {
  const [accessToken, setAccessToken] = useLocalStorageState('accessToken')
  return (
    <BrowserRouter>
      <AppProvider>
        <Switch>
          <Route exact path="/">
            {accessToken ? (
              <Home />
            ) : (
              <Authorization onSuccess={setAccessToken} />
            )}
          </Route>
        </Switch>
      </AppProvider>
    </BrowserRouter>
  )
}
