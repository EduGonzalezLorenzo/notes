import { useState } from "react";

export default function SignUp() {
    const [type, setType] = useState("password");
    const [username, setUsername] = useState("");
    const [passwords, setPasswords] = useState({
        p1: "",
        p2: ""
    });
    return (
        <div className="App container">
            <h1 className="text-center">Register</h1>
            <div className="texnote_content">
                <form action="http://localhost:8081/signup" method="post">
                    <div className="row mb-3">
                        <label htmlFor="userName" className="col-sm-2 col-form-label">User name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="username" placeholder="Name" required onKeyUp={(e) =>setUsername(e.target.value)}/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type={type} name="password" className="form-control password" id="password" required onKeyUp={(e) => setPasswords({ p1: passwords.p1, p2: e.target.value })} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="passwordRepeat" className="col-sm-2 col-form-label">Repeat password</label>
                        <div className="col-sm-10">
                            <input type={type} className="form-control password" id="passwordRepeat" required onKeyUp={(e) => setPasswords({ p1: e.target.value, p2: passwords.p2 })} />
                            <input type="checkbox" onClick={() => setType(type === "password" ? "text" : "password")} checked={type !== "password"} defaultChecked/>Show Password
                        </div>
                    </div>
                    <div className="text-center">
                        <input id="signUp" className="btn btn-primary" onClick={SignUpFetch(username, passwords.p1)} type="button" value="Create user" disabled={(passwords.p1 === "") || (passwords.p1 !== passwords.p2)}/>
                    </div>
                </form>
            </div>
        </div>
    );
}
function SignUpFetch(username, password){
    fetch("http://localhost:8081/signup", {
    method: "POST",
    body: {
        "username": username,
        "password": password
    }
})
}