import {Navigate, Route, Routes} from "react-router-dom";
import {Container} from 'react-bootstrap'
import {CheckOut} from './pages/CheckOut'
import {Store} from './pages/Store'
import {ShoppingCartProvider} from './context/ShoppingCartContext'
import {AdminStore} from "./pages/admin-store";
import * as React from "react";
import {AdminOrders} from "./pages/admin-orders";
import {Login} from "./pages/Login";
import SignUp from "./pages/sign-up";
import {AdminOrdersGrahp} from "./pages/adminOrdersGraph";
import {AuthProvider} from "./utilities/fire-base/auth-provider";
import WithPrivateRoute from "./utilities/fire-base/private-routs";

function App() {
    return (
        <AuthProvider>
            <ShoppingCartProvider>
                <Container className='mb-4'>
                    <Routes>
                        <Route path='/store' element={<WithPrivateRoute><Store/></WithPrivateRoute>}/>
                        <Route path='/CheckOut' element={<WithPrivateRoute><CheckOut/></WithPrivateRoute>}/>
                        <Route path='/admin' element={<WithPrivateRoute><AdminStore/></WithPrivateRoute>}/>
                        <Route path='/admin/orders/graph' element={<WithPrivateRoute><AdminOrdersGrahp/></WithPrivateRoute>}/>
                        <Route path='/admin/orders'
                               element={<WithPrivateRoute><AdminOrders/></WithPrivateRoute>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/signUp' element={<SignUp/>}/>
                        <Route path='*' element={<Navigate to="/login" />}/>
                    </Routes>
                </Container>
            </ShoppingCartProvider>
        </AuthProvider>
    )
}

export default App
