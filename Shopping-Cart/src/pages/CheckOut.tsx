import * as React from "react";
import Form from "../components/form/form";
import {ShoppingCart} from "../components/ShoppingCart";
import {useState} from "react";
import {useEffect} from "react";
import {useShoppingCart} from "../context/ShoppingCartContext";
import {Stack} from "react-bootstrap";
import {CartItem} from "../components/CartItem";

export function CheckOut() {
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
    <>
        <div className='d-flex flex-row'>
        <Stack gap={3} className='m-5'>
            {cartItems?.map((item: any) => (
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
        </Stack>        <Form /></div>
    </>
  )
}
