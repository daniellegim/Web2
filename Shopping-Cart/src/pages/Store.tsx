import { Col, Row } from 'react-bootstrap'
import { StoreItem } from '../components/StoreItem'
import {useEffect, useState} from "react";
import axios from 'axios';

export function Store() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // declare the data fetching function
            axios
                .get("http://localhost:5000/products")
                .then((res: any) => {setData(res.data); console.log(res)}).catch(console.error);
           //  const data = await fetch('http://localhost:5000/products')
           // data.json().then(res => {setData(res); console.log(res)})
           //  // call the function

        // make sure to catch any error

    }, [])

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className='g-3'>
        {data.map((item: any) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  )
}
