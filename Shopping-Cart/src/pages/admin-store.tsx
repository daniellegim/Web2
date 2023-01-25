import Table from 'react-bootstrap/Table';
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import Button from "react-bootstrap/Button";
import {AddOrUpdate} from "./addOrUpdate";
import * as React from "react";

export function AdminStore() {
    const [products, setProducts] = useState([]);
    const [textSearch, setTextSearch] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/products")
            .then((res: any) => {
                setProducts(res.data);
                console.log(res)
            }).catch(console.error);
    }, []);

    const deleteProduct = (product: any) => {
        axios.delete(`http://localhost:5000/products/${product._id}`, product._id)
            .then(res => {
                setProducts(products.filter((currProduct: any) => currProduct._id !== product._id))
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
                setProducts(res.data)
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
                <th>
                    <AddOrUpdate typeAction={true} productUpdate={{id: 1, name: '', price: '', imgUrl: ''}} products={products} setProducts={setProducts}/>
                    </th>
                <th>מחיר</th>
                <th>שם</th>
                <th>תמונה</th>
                <th>#</th>
            </tr>
            </thead>
            <tbody>
            {
                products?.map((product: any) => (
                    <tr key={product.id} style={{direction: "rtl"}}>
                        <td>
                            <div className="mb-2">
                          <AddOrUpdate typeAction={false} productUpdate={product} products={products} setProducts={setProducts}/>
                            <Button variant="outline-danger" size="sm" onClick={() => deleteProduct(product)}>
                                מחיקת מוצר
                            </Button>
                        </div>
                        </td>
                        <td>{product.price} ש"ח </td>
                        <td>{product.name}</td>
                        <td> <img
                            src={product.imgUrl}
                            style={{ width: '125px', height: '75px', objectFit: 'cover' }}
                        />      </td>
                        <td>{product.id}</td>

                    </tr>
                ))
            }
            </tbody>
        </Table>
            </div>
            </>
    );
}
