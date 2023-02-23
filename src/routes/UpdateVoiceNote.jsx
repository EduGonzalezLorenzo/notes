import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function MyNote() {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    let navigate = useNavigate();

    const [note, setNote] = useState([]);
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [blob, setBlob] = useState(null);
    const [isPublic, setIsPublic] = useState(false);

    const alterTitle = (event) => { setTitle(event.target.value) };
    const togglePublicStatus = () => { setIsPublic(!isPublic) };

    useEffect(() => {
        setIsLoading(true);
        setNote([]);

        const loadNote = async () => {
            await getNote(id)
                .then((noteInfo) => {
                    setNote(noteInfo);
                    return getFileUri(noteInfo.id);
                }).then((uri) => {
                    getFile(uri);
                });
            setIsLoading(false);
        };
        loadNote();
    }, [id]);

    async function getFile(uri) {
        if (uri == null) return null;
        const url = "http://localhost:8081" + uri;
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                return response.blob();
            })
            .then((data) => {
                setBlob(data);
            })
    }

    async function getFileUri(id) {
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
    useEffect(() => {
        setTitle(note.title);
        setIsPublic(note.isPublic);
    }, [note])

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
        const note = { title: title, body: "", isVoiceNote: false, isPublic: isPublic }
        await update(note);
        navigate("/myNotes");
    }

    async function update(note) {
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