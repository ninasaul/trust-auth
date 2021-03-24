import React, {useState, useEffect} from 'react'
import {useRequest, useLocalStorageState} from 'ahooks'
import useGlobal from '../../hooks/useGlobal'
import Pagination from 'rc-pagination'
import Loading from '../../compontent/Loading'

export default function GroupList(props) {
  const [accessToken] = useLocalStorageState('accessToken')
  const {baseUrl, resList} = useGlobal()
  const [current, setCurrent] = useState(1)
  console.log(resList)
  const {data, error, loading, run} = useRequest(
    `${baseUrl}/groups?accesstoken=${accessToken}`,
    {
      formatResult: res => {
        console.log(res)
        let result = []
        for (let i in res) {
          result.push({id: i, name: res[i]})
        }
        return result
      },
    },
  )
  useEffect(() => {
    run()
  }, [resList])
  return (
    <div className="group">
      <h2 className="group-title">Service Providers</h2>
      {loading ? (
        <Loading text="Loading" style={{height: 300}} />
      ) : (
        <div className="group-list">
          {data.length &&
            data
              .filter(
                (i, idx) => idx > (current - 1) * 10 && idx < current * 10,
              )
              .map((item, index) => (
                <div className="group-item" key={index}>
                  <div className="item">
                    {item.name}
                    <div style={{fontSize: 11, color: '#999'}}>{item.id}</div>
                  </div>
                  <div className="ico ico-chevron-right" />
                </div>
              ))}
          {data.length && (
            <div className="page">
              <Pagination
                defaultPageSize={10}
                current={current}
                onChange={setCurrent}
                total={data.length}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
