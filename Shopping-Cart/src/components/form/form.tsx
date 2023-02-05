import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input";
import * as S from "./styleForForm";
import { useState } from "react";
import {schema} from "../validators/schema";
import {Alert} from "react-bootstrap";
import {useShoppingCart} from "../../context/ShoppingCartContext";
import Spinner from "react-bootstrap/Spinner";

interface FormsProps {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
}

const Form = () => {
    const [user, setUser] = useState<FormsProps>(() => ({} as FormsProps));
    const [total, setTotal] = useState<any>(0);
    const [loader, setLoader] = useState(false)

    const maskPhone = {
        values: ["0512345678"],
        maxLength: 10,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormsProps>({
        resolver: yupResolver(schema),
    });
    const { cartItems } = useShoppingCart()


    const onSubmit = (data: FormsProps) => {
        setLoader(true)
        setTotal(cartItems.reduce((total, cartItem: any) => {
            const item = cartItems.find((i: any) => i.id === cartItem.id)
            return total + (item?.price || 0) * cartItem.quantity
        }, 0))
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...data, products: cartItems, ...total})
        };
        fetch('http://localhost:5000/orders', requestOptions)
            .then(res =>  res.status === 200 ? setUser(data):
                alert('שליחת בקשה נכשלה' +
                    '' +
                    'אנא נסה שנית מאוחר יותר')
            ).finally(() => setLoader(false));
    };

    return (
        <S.Wrapper>
            <h1 onClick={() => setUser({} as FormsProps)} style={{direction: 'rtl'}}>הזנת הפרטים להזמנה</h1>
            {Object.keys(user).length !== 0 ? (
                <form>
                    <S.WrapperInfo >
                        <div style={{direction: 'rtl'}}>
                            <h3>שם: </h3>
                            <h4>
                                {user.firstName} {user.lastName}
                            </h4>
                        </div>
                        <div style={{direction: 'rtl'}}>
                            <h3>כתובת: </h3>
                            <h4>{user.address}</h4>
                        </div>
                        <div style={{direction: 'rtl'}}>
                            <h3>טלפון: </h3>
                            <h4>{user.phone}</h4>
                        </div>
                        <div style={{direction: 'rtl'}}>
                            <h3>מייל: </h3>
                            <h4>{user.email}</h4>
                        </div>

                        <div style={{direction: 'rtl', margin: '20px'}}>
                            <h2>ההזמנה נשלחה בהצלחה</h2>
                        </div>

                    </S.WrapperInfo>
                </form>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} style={{direction: 'rtl'}}>
                    <S.DoubleContainer>
                        <Input
                            {...register("firstName")}
                            errors={errors.firstName}
                            label="שם פרטי"
                        />
                        <Input
                            {...register("lastName")}
                            errors={errors.lastName}
                            label="שם משפחה "
                        />
                    </S.DoubleContainer>
                    <Input
                        {...register("phone")}
                        errors={errors.phone}
                        label="טלפון"
                        mask={maskPhone}
                    />
                    <Input
                        {...register("address")}
                        errors={errors.address}
                        label="כתובת"
                    />
                    <Input {...register("email")} errors={errors.email} label="אימייל" />

                    <S.WrapperButton>
                        <button className="btn-hover" type="submit">
                            הזמן

                            {
                                 loader ?  <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner> : null


}
                        </button>
                    </S.WrapperButton>
                </form>
            )}
        </S.Wrapper>
    );
};

export default Form;
