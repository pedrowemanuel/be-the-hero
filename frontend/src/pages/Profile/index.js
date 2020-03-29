import React, { useState, useEffect } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from  '../../services/api';

export default function Profile() {
    const history = useHistory();

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('profile', { 
            headers: {
                authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, { 
                headers: {
                    authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Erro ao ao apagar o caso');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }
    return(
        <div className="profile-container">
            <div className="content">
               <header>
                   <img src={logoImg} alt="Be The Hero"/>
                   <span>Bem vinda, {ongName}</span>
                   <Link to="/incidents/new" className="button" >Cadastrar novo caso</Link>
                   <button type="button" onClick={() => handleLogout()}>
                       <FiPower size={18} color="#e02041" />
                   </button>
               </header>

               <h1>Casos cadastrados</h1>

                <ul>
                    {incidents.map(incident => (
                        <li key={incident.id} >
                            <strong>CASO: </strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO: </strong>
                            <p>{incident.description}</p>

                            <strong>VALOR: </strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))}              
                </ul>
            </div>
        </div>
    );
};