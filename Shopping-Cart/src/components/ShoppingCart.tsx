import {Nav, Offcanvas, OffcanvasBody, Stack} from 'react-bootstrap'
import { useShoppingCart } from './../context/ShoppingCartContext'
import { CartItem } from './CartItem'
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart()

    const [data, setData] = useState([]);

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const data = await fetch('http://localhost:5000/products')
            data.json().then(res => {setData(res);})
            // call the function
        }
        fetchData()
        // make sure to catch any error
            .catch(console.error);
    }, [])

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title >עגלה</Offcanvas.Title>
      </Offcanvas.Header>
      <OffcanvasBody>
        <Stack gap={3}>
          {cartItems.map((item: any) => (
            <CartItem key={item.id} {...item} data={data} />
          ))}
          <div className='ms-auto fw-bold fs-5'>
              <span> סך הכל </span>
              <span>  {(
                  cartItems.reduce((total, cartItem: any) => {
                      const item = data.find((i: any) => i.id === cartItem.id)
                      return total + (item?.price || 0) * cartItem.quantity
                  }, 0)
              )}</span>
              <span> שקל </span>

           </div>
            <Nav.Link to={'/checkout'} as={NavLink}>
                לעגלת קניות
            </Nav.Link>
        </Stack>
      </OffcanvasBody>
    </Offcanvas>
  )
}
