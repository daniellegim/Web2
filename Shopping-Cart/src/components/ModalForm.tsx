import {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import './modal-update-css.css';
import * as React from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ModalForm(props: { nameUpdate: any, addressUpdate: any, phoneUpdate: any, id: any; onClose: () => void; }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // do something with the form data, e.g. submit it to a server
        console.log('Name:', name);
        console.log('Name:', props.id);
        console.log('phone:', phone);
        console.log('Address:', address);
        // close the modal
        editProduct(props.id)
        props.onClose();
    };

    useEffect(() => {
        setName(props.nameUpdate);
        setAddress(props.addressUpdate);
        setPhone(props.phoneUpdate);
    }, []);


    function editProduct(id: any) {

        const order = {
            firstName: name, address: address, phone: phone
        }

        axios.put(`http://localhost:5000/orders/${props.id}`, order)
            .then(res => {

                Swal.fire({
                    icon: 'success',
                    title: 'עדכון בוצע בהצלחה',
                    showConfirmButton: false,
                    timer: 1500
                })
                handleClose();

            }).catch(err => {
            Swal.fire({
                icon: 'success',
                title: 'עדכון בוצע בהצלחה',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                עדכן הזמנה
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>עדכון הזמנה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", direction: "rtl", margin: "3px"}}>
                        <label className={"label-input"}>
                            שם:
                            <input className={"order-input"} type="text" value={name} onChange={(event) => setName(event.target.value)} />
                        </label>
                        <label className={"label-input"}>
                            כתובת :
                            <input className={"order-input"}  type="text" value={address} onChange={(event) => setAddress(event.target.value)} />
                        </label>
                        <label className={"label-input"}>
                            טלפון :
                            <input className={"order-input"}  type="text" value={phone} onChange={(event) => setPhone(event.target.value)} />
                        </label>
                        <button type="submit">עדכן שינויים</button>
                    </form>                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        סגור
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalForm;
