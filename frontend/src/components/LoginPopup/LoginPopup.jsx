import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {

    const { setToken, url,loadCartData } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Cadastrar-se");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()

        let new_url = url;
        if (currState === "Entrar") {
            new_url += "/api/user/login";
        }
        else {
            new_url += "/api/user/register"
        }
        const response = await axios.post(new_url, data);
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            loadCartData({token:response.data.token})
            setShowLogin(false)
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2> <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Cadastrar-se" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Seu nome' required /> : <></>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Seu email' />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Senha' required />
                </div>
                <button>{currState === "Entrar" ? "Entrar" : "Criar uma conta"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required/>
                    <p>Ao continuar, concordo com os termos de uso e a política de privacidade.</p>
                </div>
                {currState === "Entrar"
                    ? <p>Criar uma nova conta? <span onClick={() => setCurrState('Cadastrar-se')}>Clique aqui</span></p>
                    : <p>Já tem uma conta? <span onClick={() => setCurrState('Entrar')}>Acesse aqui</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
