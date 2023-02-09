import { Link, Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Notes</Link>
                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav mr-auto">
                        {/* Opcion solo visibles si hay sesión iniciada */}
                        <li className="nav-item nav-hover">
                            <Link to="/createNote" className="nav-link">Create note</Link>
                        </li>
                        {/* Opcion solo visibles si hay sesión iniciada */}
                        <li className="nav-item nav-hover">
                            <Link to="/createVoiceNote" className="nav-link">Create Voice note</Link>
                        </li>
                        {/* Opcion solo visibles si hay sesión iniciada */}
                        <li className="nav-item nav-hover">
                            <Link to="/myNotes" className="nav-link">My notes</Link>
                        </li>
                        {/* Opcion solo visibles si NO hay sesión iniciada */}
                        <li className="nav-item nav-hover">
                            <Link to="/signUp" className="nav-link">Sign Up</Link>
                        </li>
                        {/* Opcion solo visibles si NO hay sesión iniciada */}
                        <li className="nav-item nav-hover">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    );
}
