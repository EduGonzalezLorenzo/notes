import { Component } from "react";

export class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            showPassword: false,
            username: '',
            passwords: {
                password1: '',
                password2: ''
            }
        }
        this.togglePasswordView = this.togglePasswordView.bind(this);
        this.sendSignUp = this.sendSignUp.bind(this);
    }

    togglePasswordView() {
        const newState = {
            showPassword: !this.state.showPassword,
            username: this.state.username,
            passwords: {
                password1: this.state.passwords.password1,
                password2: this.state.passwords.password2
            }
        }
        this.setState(newState);
    }

    async sendSignUp(event) {
        event.preventDefault();
        console.log('hola');
        const response = await this.request(this.state.username, this.state.passwords.password1);
        console.log('adios', response);
        //     const data = { username: username, password: passwords.p1 };
//     async function post() {
//         await fetch("http://localhost:8081/signup", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log("Success:", data);
//             })
//     };
//     post();
    }

    async request(username, password) {
        return fetch("http://localhost:8081/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }),
        })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.err(err);
            return err;
        })
    }

    render() {
    return (
        <div className="App container">
            <h1 className="text-center">Register</h1>
            <div className="texnote_content">
                <form onSubmit={this.sendSignUp}>
                    <div className="row mb-3">
                        <label htmlFor="userName" className="col-sm-2 col-form-label">User name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="username" placeholder="Name" required/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type={this.state.showPassword ? "text" : "password"} name="password" className="form-control password" id="password" required />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="passwordRepeat" className="col-sm-2 col-form-label">Repeat password</label>
                        <div className="col-sm-10">
                            <input type={this.state.showPassword ? "text" : "password"} className="form-control password" id="passwordRepeat" required />
                            <input type="checkbox" onClick={this.togglePasswordView}/>Show Password
                        </div>
                    </div>
                    <div className="text-center">
                        <input id="signUp" className="btn btn-primary" type="submit" value="Create user" />
                    </div>
                </form>
            </div>
        </div>
    );
    }
}

export default SignUp;
// export default function SignUp() {
//     const [type, setType] = useState("password");
//     const [username, setUsername] = useState("");
//     const [passwords, setPasswords] = useState({
//         p1: "",
//         p2: ""
//     });

    
//     function sendSignUp(event) {
//     // event.preventDefault();
//     const data = { username: username, password: passwords.p1 };
//     async function post() {
//         await fetch("http://localhost:8081/signup", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log("Success:", data);
//             })
//     };
//     post();
// };

//     return (
//         <div className="App container">
//             <h1 className="text-center">Register</h1>
//             <div className="texnote_content">
//                 <form onSubmit={sendSignUp()}>
//                     <div className="row mb-3">
//                         <label htmlFor="userName" className="col-sm-2 col-form-label">User name</label>
//                         <div className="col-sm-10">
//                             <input type="text" className="form-control" name="username" placeholder="Name" required onChange={(e) => setUsername(e.target.value)} />
//                         </div>
//                     </div>

//                     <div className="row mb-3">
//                         <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
//                         <div className="col-sm-10">
//                             <input type={type} name="password" className="form-control password" id="password" required onChange={(e) => setPasswords({ p1: passwords.p1, p2: e.target.value })} />
//                         </div>
//                     </div>

//                     <div className="row mb-3">
//                         <label htmlFor="passwordRepeat" className="col-sm-2 col-form-label">Repeat password</label>
//                         <div className="col-sm-10">
//                             <input type={type} className="form-control password" id="passwordRepeat" required onChange={(e) => setPasswords({ p1: e.target.value, p2: passwords.p2 })} />
//                             <input type="checkbox" onClick={() => setType(type === "password" ? "text" : "password")} checked={type !== "password"} defaultChecked />Show Password
//                         </div>
//                     </div>
//                     <div className="text-center">
//                         <input id="signUp" className="btn btn-primary" type="submit" value="Create user" disabled={(passwords.p1 === "") || (passwords.p1 !== passwords.p2)} />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
