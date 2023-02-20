import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewNote(noteId) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    let navigate = useNavigate();

    const alterTitle = (event) => { setTitle(event.target.value) };
    const alterBody = (event) => { setBody(event.target.value) };
    const togglePublicStatus = () => { setIsPublic(!isPublic) };

    const sendCreateNote = async (event) => {
        event.preventDefault();
        const note = { title: title, body: body, isVoiceNote: false, isPublic: isPublic }
        await post(note);
    }

    async function post(note) {
        return await fetch("http://localhost:8081/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(note),
        })
            .then((response) => {
                return navigate("/myNotes");
            })
            .catch(() => {
                return "Error creating note";
            })
    }

    return (
        <div className="App container">
            <h1 className="text-center">New Note</h1>
            <div className="texnote_content">
                {localStorage.getItem("token") == null ? "You have to be loged to create a note" :
                    <form onSubmit={sendCreateNote}>
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
                            <label htmlFor="noteimg" className="col-sm-2 col-form-label">Add Image</label>
                            <div className="col-sm-10">
                                <input id="noteimg" type="file" accept="image/*" className="form-control-input" onChange={"funcion de subir texto que hay que importar"} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-10" htmlFor="public">Click checkbox to swap between public and private note</label>
                            <div className="col-2">
                                <input id="public" type="checkbox" onClick={togglePublicStatus} /> {isPublic ? "Public note" : "Private note"}
                            </div>
                        </div>
                        <div className="text-center">
                            <input type="submit" className="btn btn-primary" value="Save Note" />
                        </div>
                    </form>}
            </div>
        </div>
    );
}