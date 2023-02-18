import Table from 'react-bootstrap/Table';
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import Button from "react-bootstrap/Button";
import * as React from "react";
import auth from "../utilities/fire-base/Firebase";
import {Navbar} from "../components/Navbar";
import ModalForm from "../components/ModalForm";

export function MyOrders() {

    const [orders, setOrders] = useState([]);
    const [currOrders, setCurrOrders] = useState([]);
    const [textSearch, setTextSearch] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    const [email, setEmail] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged((user: any) => {
            setCurrentUser(user)
            console.log(user +" user ")
        });
    }, []);

    useEffect(() => {
            const storedEmail = localStorage.getItem('email');
            if (storedEmail) {
                setEmail(storedEmail);
            }

        axios
            .get(`http://localhost:5000/orders/filter/${storedEmail}`)
            .then((res: any) => {
                setOrders(res.data);
                setCurrOrders(res.data);
                // ליצור מערך כמו הדאטה שבנוי מההזמנות שהגיעו מהשרת
                console.log(res)
            }).catch(console.error);
    }, []);

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

        const filteredOrders = orders.filter((order: any) => order.firstName.includes(textSearch));
        setOrders(filteredOrders);
    };

    const clean = () => {
        setOrders(currOrders);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
console.log("sdxsd")
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Navbar/>

            <div>
                <div>
                    <label>
                        <Button variant="outline-primary" size={"sm"} onClick={() => {
                            clean();
                        }}>
                            נקה
                        </Button>
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
                                        <div>
                                            <ModalForm onClose={handleCloseModal}

                                                       nameUpdate={order.nameUpdate}
                                                       addressUpdate={order.addressUpdate}
                                                       phoneUpdate={order.phoneUpdate}
                                                       id={order.Id} />
                                        </div>
                                    </div>
                                </td>
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
