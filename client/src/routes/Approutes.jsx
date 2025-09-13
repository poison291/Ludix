import React from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from '../pages/Landing'
import Test from '../pages/Test'

const Approutes = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Landing/>
        },
        {

          path: '/test',
          element: <Test/>
        },
    ])
  return (
    <RouterProvider router={router}/>
  )
}

export default Approutes