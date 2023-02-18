import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as S from "../components/form/styleForForm";
import Spinner from "react-bootstrap/Spinner";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "../components/validators/schema";
import Swal from "sweetalert2";
import axios from "axios";
import {Form} from "react-bootstrap";
import './modal-update-css.css';

interface ProductProps {
    id: string;
    name: string;
    price: string;
    imgUrl: string;
}

// @ts-ignore
export function AddOrUpdate({ typeAction, productUpdate, products, setProducts }) {
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(typeAction);

    const [product, setProduct] = useState<any>(productUpdate);
    const [loader, setLoader] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductProps>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: ProductProps) => {
        setLoader(true);

        if (status) {
            addProduct();
        } else {
            editProduct(product.id)
        }

    };

    function addProduct() {
        const productToAdd = {
            name: product.name,
            price: product.price,
            imgUrl: product.imgUrl,
            productType: product.type,
            isKosher: product.isKosher,
            description: "",
            priceUnits: "קילו",
            availability: true,
            quantityPerPrice: 1
        };
        axios.post('http://localhost:5000/products', productToAdd)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'הוספת מוצר בוצעה',
                    showConfirmButton: false,
                    timer: 1500
                })            }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'הוספת מוצר נכשלה ',
                showConfirmButton: false,
                timer: 1500
            })
        }).finally(() => setLoader(true));
        handleClose()
    }


    function editProduct(id: any) {
        const productToUpdate = {
            _id: product._id,
            name: product.name,
            price: product.price,
imgUrl: product.imgUrl        };
        setLoader(true)
        axios.put(`http://localhost:5000/products/${product._id}`, product)
            .then(res => {
                // setProducts(products.filter((product: any) => product.id !== id))
                // setProducts(products.push(productToUpdate))
                Swal.fire({
                    icon: 'success',
                    title: 'עדכון בוצע בהצלחה',
                    showConfirmButton: false,
                    timer: 1500
                })
                handleClose();

            }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'העדכון נכשל',
                showConfirmButton: false,
                timer: 1500
            })
        }).finally(() => {setLoader(false)});
        console.log(id + " :עדכון ")
    }


    return (
        <>
            <Button variant="outline-primary" size={"sm"} onClick={handleShow}>{!status ? "עדכון " : "+ מוצר חדש"}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{!status ? "עדכון אמיתי" : "הוספת מוצר חדש"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>





                    <form style={{flexDirection: 'column'}} onSubmit={(e) => {
                        !status ? editProduct(product.id) : addProduct();
                        e.preventDefault();
                    }}>

                        {
                            loader ?  <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> : null


                        }

                        <label className={"label-input"}>
                            שם מוצר:
                            <input className={"order-input"} type="text" value={product.name}
                                   onChange={(eve) => {setProduct({...product, name: eve.target.value});  console.log({...product, name: eve.target.value})}} />
                        </label>
                        <label className={"label-input"}>
                            מחיר:
                            <input className={"order-input"} type="text" value={product.price} onChange={(eve) => setProduct({...product, price: eve.target.value})} />
                        </label>
                            <input className={"order-input"} type={"radio"} name={'type'} value={'fruit'}
                                   onChange={(eve) => {
                                       setProduct({...product, type: 'fruit'})
                                   }}/> פירי
                            <br/>
                            <input className={"order-input"} type={"radio"} name={'type'} value={'vegetable'}
                                   onChange={() => {
                                       setProduct({...product, type: 'fruit'})
                                   }}/>ירק
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="המוצר כשר"
                            onClick={(event) => {
                                setProduct({...product, isKosher: event.target.checked})
                            }}
                        />
                        <label className={"label-input"}>
                            תמונה:
                            <input className={"order-input"} type="text" value={product.imgUrl} onChange={(eve) => setProduct({...product, imgUrl: eve.target.value})} />
                            { product.imgUrl && <img
                                src={product.imgUrl}
                                style={{ width: '70px', height: '75px', objectFit: 'cover' }}
                            />}
                        </label>

                        <input type="submit" value="Submit" />
                    </form>




















                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        סגור חלון
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        שמור
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
