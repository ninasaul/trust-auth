import React from 'react';
import AuthorizationCodeExample from './AuthorizationCodeExample';

const onFailure = response => console.error(response);

export default function App() {
  return (
    <div className="App">
      <AuthorizationCodeExample />
    </div>
  );
}
