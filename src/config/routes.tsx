import type { RouteObject } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import About from '../pages/About'
import Solutions from '../pages/Solutions'
import Contact from '../pages/Contact'
import NotFound from '../pages/NotFound'

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
        path: 'about',
        element: <About />,
      },
      {
        path: 'solutions',
        element: <Solutions />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]
