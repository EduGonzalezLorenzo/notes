import { useEffect, useState } from "react";

export default function MyNote() {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setNotes([]);

        const loadNotes = async () => {
            const allNotes = await getNotes();
            console.log("array de notas: " + allNotes);
            // const items = await Promise.all(allNotes);
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
            <h1 className="text-center">My notes</h1>
            {isLoading && <p>Loading...</p>}
            <ul id="notes">{notes.map(formatNote)}</ul>
        </div>
    );
}