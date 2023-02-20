import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FormatNote({ id, title }) {
    let navigate = useNavigate();
    return (
        <li className="list-group-item">
            id:{id}, title: {title}, <button onClick={() => navigate("/note/" + id)}>Open note</button>
        </li>
    );
}

function NoteList({ notes }) {
    return (
        <>
            <ul id="notes" className="list-group list-group-flush">
                {notes.map(FormatNote)}
            </ul>
        </>
    )
}

export default function MyNote() {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setNotes([]);

        const loadNotes = async () => {
            const allNotes = await getNotes();
            setNotes(allNotes);
            setIsLoading(false);
        };
        loadNotes();
    }, [])

    async function getNotes() {
        return fetch("http://localhost:8081/notes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => response.json())
            .then((allnotes) => {
                return allnotes;
            })
            .catch(() => {
            })
    }

    return (
        <div className="App container">
            <h1 className="text-center">My notes</h1>
            {isLoading && <p>Loading...</p>}
            {localStorage.getItem("token") == null ? "You have to be loged to see your notes" : <NoteList isLoading={isLoading} notes={notes} />}
        </div>
    );
}