import Table from 'react-bootstrap/Table';
import {useEffect, useState} from "react";
import axios from "axios";
import {Stack} from "react-bootstrap";

export function AdminStore() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/products")
            .then((res: any) => {
                setProducts(res.data);
                console.log(res)
            }).catch(console.error);

    }, [])
    return (
        <Table striped bordered hover>
            <thead>
            <tr style={{direction: "rtl"}}>
                <th>מחיר</th>
                <th>שם</th>
                <th>תמונה</th>
                <th>#</th>
            </tr>
            </thead>
            <tbody>
            {
                products.map((product: any) => (
                    <tr key={product.id} style={{direction: "rtl"}}>
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
            {/*<tr>*/}
            {/*    <td>1</td>*/}
            {/*    <td>Mark</td>*/}
            {/*    <td>Otto</td>*/}
            {/*    <td>@mdo</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*    <td>2</td>*/}
            {/*    <td>Jacob</td>*/}
            {/*    <td>Thornton</td>*/}
            {/*    <td>@fat</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*    <td>3</td>*/}
            {/*    <td colSpan={2}>Larry the Bird</td>*/}
            {/*    <td>@twitter</td>*/}
            {/*</tr>*/}
            </tbody>
        </Table>
    );
}
