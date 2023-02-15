import { useState } from "react";

export default function Login() {
    const [type, setType] = useState("password");
    return (
        <div className="App container">
            <h1 className="text-center">Login</h1>
            <div className="texnote_content">
                <form action="http://localhost:8081/login" method="post">
                    <div className="row mb-3">
                        <label htmlFor="username" className="col-sm-2 col-form-label"> User name:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="username" id="username" placeholder="Name" required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type={type} name="password" className="form-control password" id="password" placeholder="****" required />
                            <input type="checkbox" onClick={() => setType(type === "password" ? "text" : "password")} checked={type !== "password"} />Show Password
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