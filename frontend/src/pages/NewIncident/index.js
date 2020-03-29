import React, {useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function NewIncident() {

    const history = useHistory();
    const ongId = localStorage.getItem('ongId'); 

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleNewIncident(event) {
        event.preventDefault();
        const data = { title, description, value};

        try {
            await api.post('incidents', data, {
                headers: {
                    authorization: ongId,
                }
            });
            history.push('/profile');
        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
    }


    return(
        <div className="new-incident-container">
             <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói que possa resolvê-lo.</p>
                    <Link to="/profile" className="back-link " >
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título: " 
                        required 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    
                    <textarea  
                        placeholder="Descrição: " 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    
                    <input 
                        placeholder="Valor em  reais: " 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    
                    <button className="button" type="submit" >Cadastrar</button>
                </form>
            </div>
        </div>
    );
};