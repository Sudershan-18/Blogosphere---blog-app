import { useState } from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const register = async (ev) => {
        ev.preventDefault();
        const response = await fetch('https://blogosphere-blog-app.onrender.com/register', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        });
        console.log(response);
        if(response.status === 200){
            alert('Registration Successful :)');
        } else {
            alert('Registration failed !!');
        }
    };

    return(
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input 
                type="text" 
                placeholder="username" 
                value={username} 
                onChange = {ev => setUsername(ev.target.value)}/>
            <input 
                type="password" 
                placeholder="password" 
                value={password}
                onChange={ev => setPassword(ev.target.value)} />
            <button>Register</button>
        </form>
    )
}
