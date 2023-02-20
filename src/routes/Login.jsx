import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();

    const alterUsername = (event) => { setUsername(event.target.value); }
    const alterPassword = (event) => { setPassword(event.target.value); }
    const togglePasswordView = () => { setShowPassword(!showPassword) }
    
    const sendLogin = async (event) => {
        event.preventDefault();
        const data = { username: username, password: password };
        postLogin(data);
    }

    async function postLogin(data) {
        await fetch("http://localhost:8081/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((json) => {
                localStorage.setItem("token", json.token);
                return navigate("/myNotes");
            })
            .catch(() => {
                window.alert("Wrong username or password");
            })
    }

    return (
        <div className="App container">
            <h1 className="text-center">Login</h1>
            <div className="texnote_content">
                <form onSubmit={sendLogin}>
                    <div className="row mb-3">
                        <label htmlFor="username" className="col-sm-2 col-form-label"> User name:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="username" id="username" placeholder="Name" onChange={alterUsername} required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type={showPassword ? "text" : "password"} name="password" className="form-control password" id="password" placeholder="****" onChange={alterPassword} required />
                            <input type="checkbox" onClick={togglePasswordView} />Show Password
                        </div>
                    </div>
                    <div className="text-center">
                        <input className="btn btn-primary" type="submit" value="Login" />
                    </div>
                </form>
            </div>
        </div>
    );
}
