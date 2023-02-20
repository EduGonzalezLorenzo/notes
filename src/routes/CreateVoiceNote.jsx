import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function NewVoiceNote() {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);

    const [title, setTitle] = useState("");
    const [blob, setBlob] = useState(null);
    const [isPublic, setIsPublic] = useState(false);
    let navigate = useNavigate();

    const alterTitle = (event) => { setTitle(event.target.value) };
    const togglePublicStatus = () => { setIsPublic(!isPublic) };

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.start();

            let chunks = [];
            mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
                chunks.push(event.data);
            });
            mediaRecorderRef.current.addEventListener("stop", () => {
                setBlob(new Blob(chunks, { type: "audio/wav" }));
                chunks = [];
            });
            setIsRecording(true);
        });
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    };

    const sendCreateNote = async (event) => {
        event.preventDefault();
        const note = { title: title, body: "", isVoiceNote: true, isPublic: isPublic }
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
            <h1 className="text-center">New Voice Note</h1>
            <div className="texnote_content">
                {localStorage.getItem("token") == null ? "You have to be loged to create a note" :
                    <form onSubmit={sendCreateNote}>
                        <div className="row mb-3">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                            <div className="col-sm-10">
                                <input type="text" id="title" className="form-control" placeholder="Title" onChange={alterTitle} required />
                            </div>
                        </div>
                        <div className="mb-3 text-center">
                            {blob ? <audio controls src={URL.createObjectURL(blob)} /> : null}
                        </div>
                        <div className="main-controls text-center mb-3">
                            <div className="text-center" id="buttons">
                                <button type="button" onClick={isRecording ? stopRecording : startRecording}>
                                    {isRecording ? "Stop recording" : "Start recording"}
                                </button>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-10" htmlFor="public">Click checkbox to swap between public and private note</label>
                            <div className="col-2">
                                <input id="public" type="checkbox" onClick={togglePublicStatus} /> {isPublic ? "Public note" : "Private note"}
                            </div>
                        </div>
                        <div className="text-center">
                            <input type="submit" className="btn btn-primary" value="Save Note" disabled={!blob} />
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}