import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function MyNote() {
    const [note, setNote] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { id } = useParams();
    let navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [file, setFile] = useState(null);

    const alterTitle = (event) => { setTitle(event.target.value) };
    const alterBody = (event) => { setBody(event.target.value) };
    const alterFile = (event) => setFile(event.target.files[0]);
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
        await updateNote(note).then(() => { if (file) updateFile(); });
        navigate("/myNotes");
    }

    async function updateFile() {
        await getFileUri()
            .then((oldFile) => deleteFile(oldFile))
            .then(() => uploadFile())
            .catch();
    }

    async function deleteCurrentFile() {
        await getFileUri()
            .then((oldFile) => deleteFile(oldFile)).then(() => { window.alert("File deleted") })
            .catch();
    }

    async function getFileUri() {
        const url = "http://localhost:8081/notes/" + id + "/files";
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((filesArray) => {
                if (filesArray.length === 0) return null;
                return filesArray[0].uri;
            }).catch()
    }

    async function deleteFile(oldFileUri) {
        if (!oldFileUri) return null;
        const oldFileUriSplited = oldFileUri.split("/");
        const fileId = oldFileUriSplited[oldFileUriSplited.length - 1];
        await fetch("http://localhost:8081/notes/" + id + "/files/" + fileId, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
    }

    async function uploadFile() {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("http://localhost:8081/notes/" + id + "/files", {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        return await response.json();
    }

    async function updateNote(note) {
        const url = "http://localhost:8081/notes/" + id;
        return await fetch(url, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(note),
        })
            .then((response) => {
                return response.id;
            })
            .catch(() => {
                return "Error creating note";
            })
    }

    return (
        <div className="App container">
            <h1 className="text-center">Update note</h1>
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
                    <div className="row mb-3">
                        <label htmlFor="fileInput" className="col-sm-6 col-form-label">Add file (this will delete the current file):</label>
                        <div className="col-sm-6">
                            <input id="fileInput" type="file" accept="image/*" onChange={alterFile} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="fileInput" className="col-sm-8 col-form-label">Click to delete current file:</label>
                        <div className="col-sm-4">
                            <input id="fileInput" type="button" onClick={deleteCurrentFile} value="Delete" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-10" htmlFor="public">Click checkbox to swap between public and private note</label>
                        <div className="col-2">
                            <input id="public" type="checkbox" onChange={togglePublicStatus} checked={isPublic} /> {isPublic ? "Public note" : "Private note"}
                        </div>
                    </div>
                    <div className="text-center">
                        <input type="submit" className="btn btn-primary" value="Save changes" />
                    </div>
                </form>}
        </div>
    );
}