import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UploadFile from '../utils/FileUploadForm';

export default function MyNote() {
    const [note, setNote] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [noteId, setNoteId] = useState("");

    const alterTitle = (event) => { setTitle(event.target.value) };
    const alterBody = (event) => { setBody(event.target.value) };
    const togglePublicStatus = () => { setIsPublic(!isPublic) };

    useEffect(() => {
        setIsLoading(true);
        setNote([]);
        const loadNote = async () => {
            setNote(await getNote(id));
            setIsLoading(false);
        };
        loadNote();
    }, [id]);

    useEffect(() => {
        setTitle(note.title);
        setBody(note.body);
        setIsPublic(note.isPublic);
    }, [note])

    async function getNote(id) {
        const noteUrl = "http://localhost:8081/notes/" + id;
        return fetch(noteUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                if (response.ok) return response.json();
                else if (response.status === 401) setError("This note is private and you are not his owner");
                else setError("This note dont exists");
                return null;
            })
            .catch(() => {
                setError("Database Error");
                return null;
            })
    }

    const sendUpdateNote = async (event) => {
        event.preventDefault();
        const note = { title: title, body: body, isVoiceNote: false, isPublic: isPublic }
        console.log(note);
        await update(note);
    }

    async function update(note) {
        const url = "http://localhost:8081/notes/" + id;
        return await fetch(url, {
            method: "UPDATE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(note),
        })
            .then((response) => {
                setNoteId(response.id);
            })
            .catch(() => {
                return "Error creating note";
            })
    }

    return (
        <div className="App container">
            <h1 className="text-center">Note</h1>
            {isLoading && <p>Loading...</p>}
            {note === null ? <div>{error}</div> :
                <form onSubmit={sendUpdateNote}>
                    <div className="row mb-3">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                            <input type="text" id="title" className="form-control" placeholder="Title" onChange={alterTitle} required value={title} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="notebody" className="col-sm-2 col-form-label">Note Content</label>
                        <div className="col-sm-10">
                            <textarea id="notebody" className="form-control" rows="3" placeholder="Text" onChange={alterBody} value={body} />
                        </div>
                    </div>
{/* 
                    <div className="row mb-3">
                        <label htmlFor="noteimg" className="col-sm-2 col-form-label">Add Image</label>
                        <div className="col-sm-10">
                            <input id="noteimg" type="file" accept="image/*" className="form-control-input" onChange={"funcion de subir texto que hay que importar"} />
                        </div>
                    </div> */}
                    <div className="row mb-3">
                        <label className="col-10" htmlFor="public">Click checkbox to swap between public and private note</label>
                        <div className="col-2">
                            <input id="public" type="checkbox" onClick={togglePublicStatus} checked={isPublic}/> {isPublic ? "Public note" : "Private note"}
                        </div>
                    </div>
                    <div className="text-center">
                        <input type="submit" className="btn btn-primary" value="Save Note" />
                    </div>
                </form>
            }
            {noteId && <UploadFile noteId={noteId} />}
        </div>
    );
}