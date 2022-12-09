import { Col, Row } from 'react-bootstrap'
import { StoreItem } from '../components/StoreItem'
import {useEffect, useState} from "react";

export function Store() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const data = await fetch('http://localhost:5000/products')
           data.json().then(res => {setData(res); console.log(res)})
            // call the function
        }
        fetchData()
        // make sure to catch any error
            .catch(console.error);
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
