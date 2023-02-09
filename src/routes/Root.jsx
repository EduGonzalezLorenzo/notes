import { Link, Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link class="navbar-brand" to="/">Notes</Link>
                <div class="collapse navbar-collapse" id="navMenu">
                    <ul class="navbar-nav mr-auto">
                        {/* Opcion solo visibles si hay sesión iniciada */}
                        <li class="nav-item nav-hover">
                            <Link to="/createNote" class="nav-link">Create new note</Link>
                        </li>
                        {/* Opcion solo visibles si hay sesión iniciada */}
                        <li class="nav-item nav-hover">
                            <Link to="/myNotes" class="nav-link">My notes</Link>
                        </li>
                        {/* Opcion solo visibles si NO hay sesión iniciada */}
                        <li class="nav-item nav-hover">
                            <Link to="/signUp" class="nav-link">Sign Up</Link>
                        </li>
                        {/* Opcion solo visibles si NO hay sesión iniciada */}
                        <li class="nav-item nav-hover">
                            <Link to="/login" class="nav-link">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    );
}
