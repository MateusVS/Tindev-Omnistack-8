import React, {useState} from 'react';
import './login.css';
import logo from '../assets/logo.svg';
import api from '../services/api';

export default function Login({history}) {
  const [username, setUsername ] = useState('');

  async function handleSubmit(e) {
      e.preventDefault();

      const response = await api.post('/devs', {
          username,
      });
      const {_id} = response.data;
      
      history.push(`/dev/${_id}`);  
  }

  return (
    <div className="login-container">
        <form onSubmit={handleSubmit}>
            <img src={logo} alt='Tindev'/>
            <input 
            type="text" 
            placeholder="Digite o seu usuário do Github" 
            onChange={e=> setUsername(e.target.value)} 
            value={username}/>
            <button type="submit">Enviar</button>
        </form>
    </div>
  );
}