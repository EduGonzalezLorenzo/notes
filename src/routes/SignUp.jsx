import { useState } from "react";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const alterUsername = (event) => { setUsername(event.target.value); };
    const alterPassword = (event) => { setPassword(event.target.value); };
    const alterPasswordRepeat = (event) => { setPasswordRepeat(event.target.value); };
    const togglePasswordView = () => { setShowPassword(!showPassword) };

    const sendSignUp = async (event) => {
        event.preventDefault();
        const data = { username: username, password: password };
        window.alert(String(await post(data)));
    }

    async function post(data) {
        return await fetch("http://localhost:8081/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status === 409) return "User already exists";
                if (response.ok) return "User " + data.username + " created";
                return "Input data error";
            })
            .catch(() => {
                return "Error creating user";
            })
    }

    return (
        <div className="App container">
            <h1 className="text-center">Register</h1>
            <div className="texnote_content">
                <form onSubmit={sendSignUp}>
                    <div className="row mb-3">
                        <label htmlFor="userName" className="col-sm-2 col-form-label">User name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="username" placeholder="Name" onChange={alterUsername} required />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type={showPassword ? "text" : "password"} name="password" className="form-control password" id="password" onChange={alterPassword} required />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="passwordRepeat" className="col-sm-2 col-form-label">Repeat password</label>
                        <div className="col-sm-10">
                            <input type={showPassword ? "text" : "password"} className="form-control password" id="passwordRepeat" name="passwordRepeat" onChange={alterPasswordRepeat} required />
                            <input type="checkbox" onClick={togglePasswordView} />Show Password
                        </div>
                    </div>
                    <div className="text-center">
                        <input id="signUp" className="btn btn-primary" type="submit" value="Create user" disabled={password !== passwordRepeat || password === ""} />
                    </div>
                </form>
            </div>
        </div>
    );
}