import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO Añadir inputs text y select y con un useEfect como el de hackernews forzar al refresco al buscar por palabras (de titulo o nota), filtrar por tipo y ordenar por titulo o fechas
function FormatNote({ id, title, isPublic, isVoiceNote, createdAt, modifetAt }) {
    let navigate = useNavigate();
    return (
        <li className="justify-content-between row border" key={id}>
            <div className="col-1">{id}</div>
            <div className="col-2">{title}</div>
            <div className="col-1">{isPublic ? "Public" : "Private"}</div>
            <div className="col-1">{isVoiceNote ? "Voice" : "Text"}</div>
            <div className="col-2"> {createdAt} </div>
            <div className="col-2"> {modifetAt} </div>
            <div className="col-1"><button onClick={() => navigate("/note/" + id)}>Open</button></div>
            <div className="col-1"><button onClick={() => navigate("/update/" + id)}>Update</button></div>
            <div className="col-1"><button onClick={() => deleteNote(id)}>Delete</button></div>
        </li>
    );
}

async function deleteNote(id) {
    await fetch(`http://localhost:8081/notes/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
    });
}

function NoteList({ notes }) {
    return (
        <>
            <ul id="notes" className="container">
                <li className="justify-content-between row font-weight-bold border">
                    <div className="col-1">ID</div>
                    <div className="col-2">Title</div>
                    <div className="col-1">Privacity</div>
                    <div className="col-1">Type</div>
                    <div className="col-2"> Created </div>
                    <div className="col-2"> Last modified </div>
                    <div className="col-3 text-center">Options</div>
                </li>
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