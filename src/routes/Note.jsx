import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MyNote() {
    const [note, setNote] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        setNote([]);
        const loadNote = async () => {
            setNote(await getNote(id));
            setIsLoading(false);
        };
        loadNote();
    }, [id]);

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
                console.log("error capturado");
            })
    }

    return (
        <div className="App container">
            <h1 className="text-center">Note</h1>
            {isLoading && <p>Loading...</p>}
            {note === null ? <div>{error}</div> :
                <div>
                    <h2>{note.title}</h2>
                    {note.body === "" ? "audio" : <div className="text-justify"> {note.body} </div>}
                </div>
            }
        </div>
    );
}