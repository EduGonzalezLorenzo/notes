import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Root() {
    const [isLogged, setLogged] = useState(false);
    const [savedToken, setToken] = useState(null);

    useEffect(() => {
        window.addEventListener('storage', () => {
            const token = localStorage.getItem('token');
            setLogged(token != null);
        })
    }, [])

    const token = localStorage.getItem("token");
    if (savedToken !== token) {
        setToken(token);
        setLogged(savedToken == null);
    }

    const Logout = () => {
        localStorage.removeItem("token");
        setLogged(false);
    }

    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Notes</Link>
                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item nav-hover" hidden={!isLogged}>
                            <Link to="/createNote" className="nav-link">Create note</Link>
                        </li>
                        <li className="nav-item nav-hover" hidden={!isLogged}>
                            <Link to="/createVoiceNote" className="nav-link">Create Voice note</Link>
                        </li>
                        <li className="nav-item nav-hover" hidden={!isLogged}>
                            <Link to="/myNotes" className="nav-link">My notes</Link>
                        </li>
                        <li className="nav-item nav-hover" hidden={!isLogged}>
                            <Link to="/settings" className="nav-link">Settings</Link>
                        </li>
                        <li className="nav-item nav-hover" hidden={!isLogged}>
                            <Link to="/" onClick={Logout} className="nav-link">Logout</Link>
                        </li>
                        <li className="nav-item nav-hover" hidden={isLogged}>
                            <Link to="/signUp" className="nav-link">Sign Up</Link>
                        </li>
                        <li className="nav-item nav-hover" hidden={isLogged}>
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    );
}
