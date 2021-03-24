// let base64 = require('base-64')
import React, {useState} from 'react'
import base64 from 'base-64'
import OAuth2Login from './oauth/OAuth2Login'
import ErrorAlert from './ErrorAlert'
import {useLocalStorageState} from 'ahooks'
import {useHistory} from 'react-router-dom'

import {
  authorizationUrl,
  clientId,
  clientSecret,
  redirectUri,
  serverUrl,
} from '../../settings-code'

export default function AuthorizationPage(props) {
  const historys = useHistory()
  // const [accessToken, setAccessToken] = useState(null)
  const [error, setError] = useState(null)
  const [groups, setGroups] = useState(null)
  const [accessToken, setAccessToken] = useLocalStorageState('accessToken')

  const onSuccess = ({code}) =>
    fetch(`${serverUrl}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + base64.encode(`${clientId}:${clientSecret}`),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: `${code}`,
        redirect_uri: redirectUri,
        client_id: clientId,
      }).toString(),
    })
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(data => {
        props.onSuccess(data.access_token)
        setAccessToken(data.access_token)
        return data
      })
      .then(data => {
        console.log(data)
        return fetch(
          `https://tips-fbyd7ynncq-uc.a.run.app/groups?accesstoken=${data.access_token}`,
        )
      })
      .then(res2 => {
        console.log(res2)
        res2.json()
      })
      .then(data2 => {
        console.log(data2)
        setGroups(data2)
      })
      .catch(err => {
        console.log(err)
      })
  return (
    <div className="column">
      <div className="login">
        <div>{error && <ErrorAlert error={error} />}</div>
        <h2>
          <i className="logo ico-briefcase" />
          <span>reporting express</span>
        </h2>
        <OAuth2Login
          authorizationUrl={authorizationUrl}
          clientId={clientId}
          clientSecret={clientSecret}
          redirectUri={redirectUri}
          responseType="code"
          scope="openid intertrust_platform"
          state="ea6f652c-ae02-4863-ac92-df6ee68491d6"
          buttonText="Auth code login"
          onSuccess={onSuccess}
          onFailure={setError}
        >
          sign in with Intertrust platform
        </OAuth2Login>
        <div>{accessToken && <p> accessToken: {accessToken} </p>}</div>
      </div>
    </div>
  )
}
