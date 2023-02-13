import Table from 'react-bootstrap/Table';
import {useEffect, useState} from "react";
import axios from "axios";
import * as React from "react";
import io from "socket.io-client";
import { LineChart, Line, XAxis,  YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export function AdminOrdersGrahp() {

    const [orders, setOrders] = useState([]);
    const [countProductInOrders, setCountProductInOrders] = useState([]);

    useEffect(() => {

        axios
            .get("http://localhost:5000/orders")
            .then((res: any) => {
                setOrders(res.data);
const orders = res.data.map((order: any) => {
return {...order, length: order.products.length}
});
console.log(orders)
                setOrders(orders)
            }).catch(console.error);
    }, []);

    useEffect(()=>{
        (async function() {

            const socket = io('http://localhost:3000', {
                transports : ['websocket'],
            });
            socket.send('connection')
            socket.on("connection", () => {
                console.log(socket.id);
            });
            socket.on('connect_error', ()=> {
                setTimeout(()=>socket.connect(),5000);
            });
            socket.on('price_update', (data) => {
                console.log(data);
            });
        })()
    },[orders])

    return (
        <>
            <div>
                <LineChart width={500} height={300} data={orders}>
                    <XAxis dataKey="time"  />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" />
                </LineChart>
            </div>
            <div>
                <LineChart width={500} height={300} data={orders}>
                    <XAxis dataKey="time"  />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="length" stroke="#8884d8" />
                </LineChart>
            </div>
        </>
    );
}
