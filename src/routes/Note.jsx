import { useEffect, useState } from "react";

export default function MyNote() {
    const [note, setNote] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        setNote();

        const loadNotes = async () => {
            const currentNote = await getNote();
            setNote(currentNote);
            setIsLoading(false);
        };
        loadNotes();
    }, [])

    async function getNote() {
        const noteUrl = "http://localhost:8081/note";
        return fetch(noteUrl, {
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

    function formatNote(note) {
        const id = note.id;
        const title = note.title;
        const body = note.body;
        return (
            <li>
                id:{id}, title: {title}, body: {body}
            </li>
        );
    }



    return (
        <div className="App container">
            <h1 className="text-center">Note</h1>
            {isLoading && <p>Loading...</p>}
            <ul id="notes">
                {formatNote}
            </ul>
        </div>
    );
}