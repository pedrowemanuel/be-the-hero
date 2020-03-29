import React, {useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from  '../../assets/heroes.png';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function Logon() {

    const history = useHistory();
    const [id, setId] = useState('');

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await api.post('sessions', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
            
        } catch (error) {
            alert('Erro no login, tente novamente');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={ logoImg } alt="Be-The-Hero" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input 
                        type="text"
                        placeholder="Sua ID: " 
                        value={id}
                        onChange={e => setId(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="button" >Entrar</button>
                    <Link to="/register" className="back-link " >
                        <FiLogIn size={16} color="#e02041" />
                        Cadastre-se
                    </Link>
                </form>
            </section>
            <img src={ heroesImg } alt="Heroes" />
        </div>
    );
};