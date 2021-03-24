import React, {useState} from 'react'
import {useRequest, useLocalStorageState} from 'ahooks'
import useGlobal from '../../hooks/useGlobal'
import Loading from '../../compontent/Loading'

export default function CreateAccounts(props) {
  const [accesstoken] = useLocalStorageState('accessToken')
  const {baseUrl} = useGlobal()
  const [spname, setSpName] = useState('')
  const [email, setEmail] = useState('')

  const {data, error, run, loading} = useRequest(
    {
      url: `${baseUrl}/serviceprovider`,
      method: 'post',
      body: JSON.stringify({
        accesstoken,
        spname,
        email,
      }),
    },
    {
      manual: true,
    },
  )

  return (
    <div className="mask">
      <div className="create">
        <h2>New Service Provider</h2>
        <div className="close ico-x" onClick={() => props.onClose(false)} />
        <div className="item tip">
          DB can be PostgreSQL / MySQL / SQL Server/ AWS Redshift / AWS Athena /
          ....
        </div>
        <div className="item">
          <input
            name="spname"
            placeholder="spname"
            onChange={e => setSpName(e.target.value)}
          />
        </div>
        <div className="item">
          <input
            name="email"
            placeholder="email"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <button className="create-button" onClick={loading ? null : run}>
          {loading ? (
            <Loading size={16} text="Createing" color="#fff" />
          ) : (
            'New Accounts'
          )}
        </button>
      </div>
    </div>
  )
}
