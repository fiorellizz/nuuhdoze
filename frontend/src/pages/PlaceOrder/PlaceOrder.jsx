import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {

    const [payment, setPayment] = useState("cod")
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems,currency,deliveryCharge } = useContext(StoreContext);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault()
        let orderItems = [];
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        }))
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
        }
        if (payment === "stripe") {
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            }
            else {
                toast.error("Algo deu errado")
            }
        }
        else{
            let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
            if (response.data.success) {
                navigate("/myorders")
                toast.success(response.data.message)
                setCartItems({});
            }
            else {
                toast.error("Algo deu errado")
            }
        }

    }

    useEffect(() => {
        if (!token) {
            toast.error("Para fazer um pedido, faça o login primeiro")
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Informações de entrega</p>
                <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='Nome Completo' required />
                {/* <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='Primeiro nome' required />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Sobrenome' required />
                </div> */}
                {/* <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email' required /> */}
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Rua' required />
                <div className="multi-field">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='Cidade' required />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='Estado' required />
                </div>
                <div className="multi-field">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='CEP' required />
                </div>
                <input type="number" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Telefone' required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Totais do carrinho</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Taxa de entrega</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b></div>
                    </div>
                </div>
                <div className="payment">
                    <h2>Método de pagamento (No ato da entrega)</h2>
                    <div onClick={() => setPayment("dinheiro")} className="payment-option">
                        <img src={payment === "dinheiro" ? assets.checked : assets.un_checked} alt="" />
                        <p>Dinheiro</p>
                    </div>
                     <div onClick={() => setPayment("pix")} className="payment-option">
                        <img src={payment === "pix" ? assets.checked : assets.un_checked} alt="" />
                        <p>Pix</p>
                    </div>
                     <div onClick={() => setPayment("cartao")} className="payment-option">
                        <img src={payment === "cartao" ? assets.checked : assets.un_checked} alt="" />
                        <p>Cartão (Débito ou Crédito)</p>
                    </div>
                    {/* <div onClick={() => setPayment("stripe")} className="payment-option">
                        <img src={payment === "stripe" ? assets.checked : assets.un_checked} alt="" />
                        <p>Stripe ( Credit / Debit )</p>
                    </div> */}
                </div>
                <button className='place-order-submit' type='submit'>{payment==="stripe"?"Prosseguir para o pagamento":"Fazer pedido"}</button>
            </div>
        </form>
    )
}

export default PlaceOrder