import Table from 'react-bootstrap/Table';
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import Button from "react-bootstrap/Button";
import * as React from "react";
import {io} from "socket.io-client";

export function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const [textSearch, setTextSearch] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/orders")
            .then((res: any) => {
                setOrders(res.data);
                // ליצור מערך כמו הדאטה שבנוי מההזמנות שהגיעו מהשרת
                console.log(res)
            }).catch(console.error);
    }, []);


    useEffect(()=>{
        (async function() {
            const socket = io('http://localhost:3002', {
                "force new connection" : true,
                transports : ['websocket'],
            });
            socket.send('connection')
            socket.on("connection", () => {
                console.log(socket.id);
            });
            socket.on('connect_error', ()=> {
                setTimeout(()=>socket.connect(),5000);
            });
            socket.on('orders_update', (data) => {
                setOrders(data)
            });
        })()
    },[orders])

    const deleteOrder = (order: any) => {
        axios.delete(`http://localhost:5000/orders/${order._id}`, order._id)
            .then(res => {
                setOrders(orders.filter((currOrders: any) => currOrders._id !== order._id))
                Swal.fire({
                    icon: 'success',
                    title: 'מחיקה בוצעה בהצלחה',
                    showConfirmButton: false,
                    timer: 1500
                })            }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'מחיקה נכשלה',
                showConfirmButton: false,
                timer: 1500
            })
        });
    };

    const search = () => {
        axios.get(`http://localhost:5000/products/search/${textSearch}`)
            .then(res => {
                setOrders(res.data)
            }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'חיפוש נכשל',
                showConfirmButton: false,
                timer: 1500
            })
        });
    };


    return (
        <>
            <div>
                <div>
                    <label>

                        <Button variant="outline-primary" size={"sm"} onClick={() => {
                            search();
                        }}>
                            חיפוש
                        </Button>
                        <input type="text" value={textSearch}
                               onChange={(eve) => {setTextSearch(eve.target.value)}} />
                    </label>
                </div>

                <Table striped bordered hover>
                    <thead>
                    <tr style={{direction: "rtl"}}>

                        <th>#</th>
                        <th>טלפון</th>
                        <th>שם</th>
                        <th>מחיר כולל</th>
                        <th>מייל</th>
                        <th>#</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        orders?.map((order: any) => (
                            <tr key={order.Id} style={{direction: "rtl"}}>
                                <td>
                                    <div className="mb-2">
                                        <Button variant="outline-danger" size="sm" onClick={() => deleteOrder(order)}>
                                            מחיקת הזמנה
                                        </Button>
                                    </div>
                                </td>
                                <td>{order.phone}</td>
                                <td>{order.firstName} </td>
                                <td>{order.total} ש"ח </td>
                                <td>{order.email}</td>
                                <td>{order.Id}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        </>
    );
}
