import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>A equipe Nuuh12 Distribuidora é referência em qualidade, variedade e atendimento personalizado para levar até você as melhores bebidas do mercado. Nosso compromisso é garantir que cada entrega seja feita com rapidez, segurança e total cuidado. Na Nuuh12, sua satisfação é nossa prioridade, oferecendo sempre as melhores opções para todos os gostos e ocasiões!</p>
            
        </div>
        <div className="footer-content-center">
            <h2></h2>
            <ul>
                <li></li>
                <li> </li>
                <li></li>
                <li></li>
                
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>ENTRE EM CONTATO</h2>
            <ul>
                <li>(61) 99419-8585</li>
                <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright © 2025 Nuuh12 Distribuidora de Bebidas - All Right Reserved.</p>
    </div>
  )
}

export default Footer
