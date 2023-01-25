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
            imgUrl: "data:image/jpeg;base64,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"
        };
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

                        <label>
                            שם מוצר:
                            <input type="text" value={product.name}
                                   onChange={(eve) => {setProduct({...product, name: eve.target.value});  console.log({...product, name: eve.target.value})}} />
                        </label>
                        <label>
                            מחיר:
                            <input type="text" value={product.price} onChange={(eve) => setProduct({...product, price: eve.target.value})} />
                    </label>
                        <label>
                            תמונה:
                            <input type="text" value={product.imgUrl} onChange={(eve) => setProduct({...product, imgUrl: eve.target.value})} />
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
