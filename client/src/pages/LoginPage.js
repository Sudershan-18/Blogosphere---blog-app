import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);
 
    const login = async (ev) => {
        ev.preventDefault();
<<<<<<< HEAD
        const response = await fetch('https://blogosphere-blog-app-omb2.vercel.app/login', {
=======
        const response = await fetch('https://blogosphere-blog-app.onrender.com/login', {
>>>>>>> 85136fdfcd3dc52559381e7a13bb598a7f79d78d
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        
        if(response.ok){
            //we want to redirect to homepage
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })
        } else {
            alert('Wrong credentials !!');
        }
    };

    if(redirect){
        return <Navigate to = {'/'} />
    }

    return(
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input 
                type="text" 
                placeholder="username" 
                value={username} 
                onChange={ev => setUsername(ev.target.value)} />
            <input 
                type="password" 
                placeholder="password" 
                value={password} 
                onChange={ev => setPassword(ev.target.value)}/>
            <button>Login</button>
        </form>
    )
}
