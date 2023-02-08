import {Col, Form, Row} from 'react-bootstrap'
import {StoreItem} from '../components/StoreItem'
import {useEffect, useState} from "react";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import * as React from "react";

export function Store() {
    const [data, setData] = useState([]);
    const [dataToDisplay, setDataToDisplay] = useState([]);
    const [textSearch, setTextSearch] = useState('');
    const [displayOnlyKosher, setDisplayOnlyKosher] = useState(false);
    const [type, setType] = useState('all');

    useEffect(() => {
        axios
            .get("http://localhost:5000/products")
            .then((res: any) => {
                setData(res.data);
                setDataToDisplay(res.data)
                console.log(res)
            }).catch(console.error);

    }, [])

    function filterByType(tempData: any, typeToFilter: string) {
        return tempData.filter(d => {
            return  d.productType ? d.productType === typeToFilter : false
        })
    }

    function filterBySearch(tempData: any,searchValue: string) {
          return   tempData.filter(d => d.name.includes(searchValue))
    }

    function filterByKosher(tempData, displayKosher) {
        return displayKosher? tempData.filter(d => d.isKosher): tempData
    }

    function filterDataToDisplay(typeToFilter: string, filterKosher?: boolean) {
        var tempData = data;
        tempData = filterKosher? filterByKosher(tempData, !displayOnlyKosher): filterByKosher(tempData, displayOnlyKosher);
        tempData = typeToFilter !== 'all' ? filterByType(tempData, typeToFilter) : tempData;
        tempData = textSearch !== ''? filterBySearch(tempData, textSearch): tempData;
        setDataToDisplay(tempData)
    }

    return (
        <>
            <div>
                <label>

                    <Button variant="outline-primary" size={"sm"} onClick={() => {
                        filterDataToDisplay(type)
                    }}>
                        חיפוש
                    </Button>
                    <input type="text" value={textSearch}
                           onChange={(eve) => {
                               setTextSearch(eve.target.value)
                           }}/>
                </label>
            </div>
            <Form onChange={() => {

            }}>
                <div className="mb-3 mt-3">
                    <input type={"radio"} name={'type'} value={'all'} onChange={() => {
                        filterDataToDisplay('all');
                        setType('all')
                    }}/> הכל
                    <br/>
                    <input type={"radio"} name={'type'} value={'fruit'}
                           onChange={() => {
                               filterDataToDisplay('fruit');
                               setType('fruit')
                           }}/> פירות
                    <br/>
                    <input type={"radio"} name={'type'} value={'vegetable'}
                           onChange={() => {
                               filterDataToDisplay('vegetable');
                               setType('vegetable')
                           }}/> ירקות
                </div>
            </Form>

            <Form.Check
                type="switch"
                id="custom-switch"
                label="הצג רק מוצרים כשרים"
                onClick={(event) => {
                    setDisplayOnlyKosher(event.target.checked);
                    filterDataToDisplay(type, true);
                }}
            />
            <br/>
            <Row md={2} xs={1} lg={3} className='g-3'>
                {dataToDisplay.map((item: any) => (
                    <Col key={item.id}>
                        <StoreItem {...item} />
                    </Col>
                ))}
            </Row>
        </>
    )
}
