import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { CheckOut } from './pages/CheckOut'
import { Store } from './pages/Store'
import { Navbar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { AdminStore } from "./pages/admin-store";
import * as React from "react";
import {AdminOrders} from "./pages/admin-orders";

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className='mb-4'>
        <Routes>
          <Route path='/store' element={<Store />} />
          <Route path='/CheckOut' element={<CheckOut />} />
          <Route path='/admin' element={<AdminStore />} />
          <Route path='/admin/orders' element={<AdminOrders />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
