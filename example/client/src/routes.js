import { lazy } from 'react'
const routes = [
  {
    name: 'Authorization',
    path: '/',
    exact:true,
    compontent: lazy(() => import('./pages/authorization/index'))
  },
  {
    name: 'home',
    exact:false,
    path:'/home',
    compontent: lazy(() => import('./pages/home/index'))
  },
  {
    name: 'Page NotFound',
    path:null,
    exact:false,
    compontent: lazy(() => import('./pages/notFound/index'))
  },
]
export default  routes