// let base64 = require('base-64')
import React, { useState } from 'react'
import base64 from 'base-64'
import OAuth2Login from '../../../../../src/OAuth2Login'
import ErrorAlert from './ErrorAlert'
import useLocalStorage from '../../hooks/useLocalStorage'

import {
  authorizationUrl,
  clientId,
  clientSecret,
  redirectUri,
  serverUrl
} from '../../settings-code'

export default function AuthorizationCodeExample() {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const [groups, setGroups] = useState(null);
  const onSuccess = ({ code }) => fetch(`${serverUrl}/token`, {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + base64.encode(`${clientId}:${clientSecret}`)
      },
      body: (new URLSearchParams({
        'grant_type': 'authorization_code',
        'code': `${code}`,
        'redirect_uri': redirectUri,
        'client_id': clientId
      })).toString()
    }
  )
    .then(res => res.json())
    .then(data => setAccessToken(data.access_token))
    /*.then(data => fetch(`https://tips-fbyd7ynncq-uc.a.run.app/groups?accesstoken=${data.access_token}`))
    .then(res2 => res2.json())
    .then(data2 => setGroups(data2))*/;

  return (
    <div className="column">
      {
        error && <ErrorAlert error={error} />
      }
      <OAuth2Login
        authorizationUrl={authorizationUrl}
        clientId={clientId}
        clientSecret={clientSecret}
        redirectUri={redirectUri}
        responseType="code"
        scope="openid intertrust_platform"
        state='ea6f652c-ae02-4863-ac92-df6ee68491d6'
        buttonText="Auth code login"
        onSuccess={onSuccess}
        onFailure={setError}
      />
      {
        accessToken && <p> accessToken: {accessToken} </p>
      }
      {
        /*groups && <p> Groups: {JSON.stringify(groups)} </p>*/
      }
    </div>
  );
}