import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MyNote() {
    const [note, setNote] = useState([]);
    const [multimedia, setmultimedia] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { id } = useParams();

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
                setmultimedia(URL.createObjectURL(data));
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

    return (
        <div className="App container">
            <h1 className="text-center">Note</h1>
            {note === null ?
                <div>{error}</div>
                :
                <div>
                    {isLoading && <p>Loading...</p>}
                    <h2>{note.title}</h2>
                    <div className="text-justify"> {note.body} </div>
                    <div id="voice">
                        {note.isVoiceNote ?
                            <audio controls src={multimedia} />
                            :
                            <div id="img">
                                {multimedia == null ? "" : <img className="img-fluid" src={multimedia} alt="fileImage" />}
                            </div>}
                    </div>

                </div>
            }
        </div>
    );
}
