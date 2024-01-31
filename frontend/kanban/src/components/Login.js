

import { useState } from 'react';
import axios from 'axios';

function Login(){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
       
        console.log(email);
        console.log(password);

        setError('');

        if(!email ||!password) {
            setError('Preencha todos os campos');
            return;
        }

        try{
            const response = await axios.post('http://localhost:3000/login', 
                JSON.stringify({email,  password}),
                {
                    headers: { 'Content-Type': 'application/json'}
                }
            );

            setUser(response.data);

        } catch (error) {
            if(!error?.response) {
                setError('Erro ao acessar o servidor');
            } else if (error.response.status == 401){
                setError('Usuário ou senha inválidos');
            }
        }
    }

    return (
        <div className='login-form-wrap'>
            { user == null ? (
            <div>
                <h2>Login</h2>
                <form className='login-form'>
                <input type='email' name='email' placeholder='Username' required 
                        onChange={(e) => setEmail(e.target.value)} />
                <input type='password' name='password' placeholder='Password' required 
                        onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit' className="btn-login" 
                        onClick={(e) => handleLogin(e)}>Login</button>
                </form>
                <p>{error}</p>
            </div>
        ) : (
            <div>
                <h2>Olá, {user.name}</h2>
                <button className="btn-logout" onClick={() => {
                    setUser(null); setEmail(''); setPassword('');
                    }}>Logout</button>
            </div>
        ) }
        </div>
    
    );
  }

  export default Login;