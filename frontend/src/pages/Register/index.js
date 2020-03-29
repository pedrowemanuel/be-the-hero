import React, {useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function Register() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    async function handleRegister(event) {
        event.preventDefault();
        const data = { name, whatsapp, email, city, uf};
        try {
            const response = await api.post('ongs', data);
            alert(`Cadastro concluído. Seu ID de acesso é: ${response.data.id}`);
            history.push('/');
        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrarem os casosda sua ONG.</p>
                    <Link to="/" className="back-link " >
                        <FiArrowLeft size={16} color="#e02041" />
                        Fazer Logon
                    </Link>
                </section>
                <form onSubmit={handleRegister} >
                    <input 
                        placeholder="Nome da ONG: " 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail: " 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Whatsapp: " 
                        value={whatsapp} 
                        onChange={e => setWhatsapp(e.target.value)} 
                    />
                    <div className="input-grup">

                        <input 
                            placeholder="Cidade: " 
                            value={city} 
                            onChange={e => setCity(e.target.value)}
                        />

                        <input 
                            placeholder="UF: " 
                            style={{ width: 80 }} 
                            maxLength={2}
                            value={uf} 
                            onChange={e => setUf(e.target.value)} 
                        />

                    </div>
                    <button className="button" type="submit" >Cadastrar</button>
                </form>
            </div>
        </div>
    );
};