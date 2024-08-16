import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import FlashcardList from './pages/FlashcardList';
import Dashboard from './pages/Dashboard';
import Header from './component/Header';
import Footer from './component/Footer';

const App = () => {

  const Layout = () => (
    <div className=''>     
      <Header/>
      <Outlet />
      <Footer/>
      <Analytics />
    </div>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <p>Error.....</p>,
      children: [
        {
          path: "/",
          element: <FlashcardList />
        },
        {
          path: "/dash",
          element: <Dashboard />
        },
      ],
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
};

export default App;