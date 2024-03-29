import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useShoppingCart } from '../context/ShoppingCartContext'
import React from "react";
import auth from "../utilities/fire-base/Firebase";
import { signOut} from "firebase/auth";

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart()
  return (
    <NavbarBs sticky='top' className='bg-white shadow-sm mb-3'>
      <Container>
        <Nav className='me-auto' style={{direction: 'rtl'}}>
          <Nav.Link to={'/store'} as={NavLink}>
            חנות
          </Nav.Link>
          <Nav.Link to={'/checkout'} as={NavLink}>
            עגלת קניות
          </Nav.Link>
        </Nav>

        {cartQuantity > 0 && (
          <Button
            onClick={openCart}
            style={{ width: '3.3rem', height: '3rem', position: 'relative' }}
            variant='outline-primary'
            className='rounded-circle'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
            </svg>
            <div
              className='rounded-circle bg-danger d-flex justify-content-center align-items-center'
              style={{
                color: 'white',
                width: '1.5rem',
                height: '1.5rem',
                position: 'absolute',
                bottom: 0,
                right: 0,
                transform: 'translate(+25%, +25%)',
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
        <Button onClick={()=> {
          signOut(auth)
        }}>התנתק</Button>
      </Container>
    </NavbarBs>
  )
}
