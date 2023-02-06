import { Link, Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Main</Link>
                    </li>
                    <li>
                        <Link to="/createNote">Create new note</Link>
                    </li>
                    <li>
                        <Link to="/myNotes">My notes</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signUp">Sign Up</Link>
                    </li>
                </ul>
            </nav>
            <h1>NotesApp</h1>
            <Outlet />
        </>
    );
}
