import type { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import Layout from '../layouts/Layout'
import Home from '../pages/Home/index'

// 懒加载页面组件
const Research = lazy(() => import('../pages/Research/index'))
const ResearchDetail = lazy(() => import('../pages/ResearchDetail/index'))
const OpenPlatform = lazy(() => import('../pages/OpenPlatform/index'))
const Message = lazy(() => import('../pages/Message/index'))
const Promise = lazy(() => import('../pages/Promise/index'))
const NotFound = lazy(() => import('../pages/NotFound/index'))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'research',
        element: <Research />,
      },
      {
        path: 'research/:slug',
        element: <ResearchDetail />,
      },
      {
        path: 'openplatform',
        element: <OpenPlatform />,
      },
      {
        path: 'message',
        element: <Message />,
      },
      {
        path: 'promise',
        element: <Promise />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]
