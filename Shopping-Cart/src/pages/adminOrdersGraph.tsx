import {useEffect, useState} from "react";
import axios from "axios";
import * as React from "react";
import { LineChart, Line, XAxis,  YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {Navbar} from "../components/Navbar";

export function AdminOrdersGrahp() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/orders")
            .then((res: any) => {
                setOrders(res.data);
const orders = res.data.map((order: any) => {
return {...order, length: order.products.length}
});
                setOrders(orders)
            }).catch(console.error);
    }, []);

    return (
        <>
            <Navbar/>

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
