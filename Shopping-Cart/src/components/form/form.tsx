import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input";
import * as S from "./styleForForm";
import React, {useEffect, useState} from "react";
import {schema} from "../validators/schema";
import {Alert} from "react-bootstrap";
import {useShoppingCart} from "../../context/ShoppingCartContext";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Swal from "sweetalert2";
import '../../pages/form.css';

interface FormsProps {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
}

const Form = () => {
    const [order, setOrder] = useState<any>({

    });
    const [loader, setLoader] = useState(false)
    const [total, setTotal] = useState<any>()
    const [orderCheckOut, setOrderCheckoutset] = useState(false)

    const maskPhone = {
        values: ["0512345678"],
        maxLength: 10,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormsProps>({
        resolver: yupResolver(schema),
    });
    const [data, setData] = useState([]);

    const { cartItems } = useShoppingCart()

    useEffect(() => {



        axios
            .get("http://localhost:5000/products")
            .then((res: any) => {
                setData(res.data);
                console.log(res)
aaaa(res.data)
            }).catch(console.error);

    }, [])

    function addOrder() {
debugger


        const orderToAdd = {
            ...order, total
        };
        axios.post('http://localhost:5000/orders', orderToAdd)
            .then(res => {
                setOrderCheckoutset(true)
                Swal.fire({
                    icon: 'success',
                    title: 'הוספת הזמנה בוצעה',
                    showConfirmButton: false,
                    timer: 1500
                })            }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'הוספת הזמנה נכשלה ',
                showConfirmButton: false,
                timer: 1500
            })
        }).finally(() => setLoader(true));
    }

    const aaaa =  (data) => {
        const t = cartItems.reduce((total, cartItem: any) => {
            const item = data.find((i: any) => i.id === cartItem.id)
            return total + (item?.price || 0) * cartItem.quantity
        }, 0)
        setTotal(t);
        return t
    }
    return (
    <div>

    {
        orderCheckOut ? (
                <form>
                    <S.WrapperInfo >
                        <div style={{direction: 'rtl'}}>
                            <h3>שם: </h3>
                            <h4>
                                {order?.firstName} {order.lastName}
                            </h4>
                        </div>
                        <div style={{direction: 'rtl'}}>
                            <h3>כתובת: </h3>
                            <h4>{order?.address}</h4>
                        </div>
                        <div style={{direction: 'rtl'}}>
                            <h3>טלפון: </h3>
                            <h4>{order?.phone}</h4>
                        </div>
                        <div style={{direction: 'rtl'}}>
                            <h3>מייל: </h3>
                            <h4>{order?.email}</h4>
                        </div>

                        <div style={{direction: 'rtl', margin: '20px'}}>
                            <h2>ההזמנה נשלחה בהצלחה</h2>
                        </div>

                    </S.WrapperInfo>
                </form>
            )
            :
            (
            <form style={{flexDirection: 'column'}} onSubmit={(e) => {
                addOrder();
                e.preventDefault();
            }}>

                {
                    loader ?  <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner> : null


                }

                <label>
                    שם פרטי:
                    <input className={"input"} onChange={(eve) => {setOrder({...order,firstName: eve.target.value});  console.log({...order, firstName: eve.target.value})}} />

                </label>
                <br/>
                <label>
                    שם משפחה:
                    <input className={"input"}  type="text" value={order.lastName} onChange={(eve) => setOrder({...order, lastName: eve.target.value})} />
                </label>
                <br/>

                <label>
                    טלפון
                    <input className={"input"}  type="number" value={order.phone} onChange={(eve) => setOrder({...order, phone: eve.target.value})} />
                </label>
                <br/>

                <label>
                    כתובת
                    <input className={"input"}  type="text" value={order.address} onChange={(eve) => setOrder({...order, address: eve.target.value})} />
                </label>
                <br/>

                <label>
                    אימייל
                    <input  className={"input"}  type="text" value={order.email} onChange={(eve) => setOrder({...order, email: eve.target.value})} />
                </label>
                <br/>

                <input className={"submit"}  type="submit" value="Submit" />
            </form>
            )
            }
    </div>)
};

export default Form;
