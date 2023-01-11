import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { CheckOut } from './pages/CheckOut'
import { Store } from './pages/Store'
import { Navbar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { AdminStore } from "./pages/admin-store";

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className='mb-4'>
        <Routes>
            <Route path='/store' element={<Store />} />
          <Route path='/CheckOut' element={<CheckOut />} />
          <Route path='/admin' element={<AdminStore />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
