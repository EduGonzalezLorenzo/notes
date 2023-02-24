import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyNote() {
    const [notes, setNotes] = useState([]);
    const [noteDeleted, setNoteDeleted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [noteType, setNoteType] = useState("all");
    const [sortType, setSortType] = useState("title");
    const [titleFilter, setTitleFilter] = useState("");
    const [bodyFilter, setBodyFilter] = useState("");

    const alterTitleFilter = (event) => { setTitleFilter(event.target.value) };
    const alterBodyFilter = (event) => { setBodyFilter(event.target.value) };

    useEffect(() => {
        setNoteDeleted(false);
        let ignore = false;
        setIsLoading(true);
        setNotes([]);

        function getNotesByType(notes) {
            const filteredNotes = [];
            switch (noteType) {
                case "all":
                    return notes;
                case "text":
                    notes.forEach(note => {
                        if (!note.isVoiceNote) filteredNotes.push(note);
                    });
                    return filteredNotes;
                case "voice":
                    notes.forEach(note => {
                        if (note.isVoiceNote) filteredNotes.push(note);
                    });
                    return filteredNotes;
                default:
                    return null;
            }
        }

        function sortBy(filteredNotes) {
            switch (sortType) {
                case "title":
                    return filteredNotes.sort(sortByTitle);
                case "creation":
                    return filteredNotes.sort(sortByCreation);
                case "update":
                    return filteredNotes.sort(sortByUpdate);
                default:
                    return null;
            }

            function sortByTitle(noteA, noteB) {
                return noteA.title.localeCompare(noteB.title);
            }
            function sortByCreation(noteA, noteB) {
                if (noteA.createdAt < noteB.createdAt)
                    return -1;
                if (noteA.createdAt > noteB.createdAt)
                    return 1;
                return 0;
            }
            function sortByUpdate(noteA, noteB) {
                if (noteA.modifiedAt < noteB.modifiedAt)
                    return -1;
                if (noteA.modifiedAt > noteB.modifiedAt)
                    return 1;
                return 0;
            }
        }

        function getByTitleAndBody(sortedNotes) {
            const filteredNotes = [];
            sortedNotes.forEach(sortedNote => {
                if (sortedNote.title.includes(titleFilter) && sortedNote.body.includes(bodyFilter)) filteredNotes.push(sortedNote)
            });
            return filteredNotes;
        }

        const loadNotes = async () => {
            const notesFiltered = await getNotes()
                .then((originalNotes) => getNotesByType(originalNotes))
                .then((filteredNotes) => { return sortBy(filteredNotes) })
                .then((sortedNotes) => { return getByTitleAndBody(sortedNotes) });
            if (!ignore) {
                setNotes(notesFiltered);
                setIsLoading(false);
            }
        };
        loadNotes();

        return () => {
            ignore = true;
        };
    }, [noteType, noteDeleted, sortType, titleFilter, bodyFilter]);

    async function getNotes() {
        return fetch("http://localhost:8081/notes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => response.json())
            .then((allNotes) => {
                return allNotes;
            })
            .catch(() => {
            })
    };

    async function deleteNote(id) {
        await fetch("http://localhost:8081/notes/" + id, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        }).then(() => {
            setNoteDeleted(true);
        });
    };

    function NoteList() {
        return (
            <>
                <ul id="notes" className="container">
                    <li className="justify-content-between row font-weight-bold border">
                        <div className="col-3">Title</div>
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
    };

    function FormatNote({ id, title, isPublic, isVoiceNote, createdAt, modifiedAt }) {
        let navigate = useNavigate();
        return (
            <li className="justify-content-between row border" key={id}>
                <div className="col-3">{title}</div>
                <div className="col-1">{isPublic ? "Public" : "Private"}</div>
                <div className="col-1">{isVoiceNote ? "Voice" : "Text"}</div>
                <div className="col-2">{FormatDate(createdAt)}</div>
                <div className="col-2">{FormatDate(modifiedAt)}</div>
                <div className="col-3 row text-center">
                    <div className="col-12 col-xl-4"><button onClick={() => navigate("/note/" + id)}>Open</button></div>
                    <div className="col-12 col-xl-4"><button onClick={() => isVoiceNote ? navigate("/updateVoiceNote/" + id) : navigate("/updateTextNote/" + id)}>Update</button></div>
                    <div className="col-12 col-xl-4"><button onClick={() => deleteNote(id)}>Delete</button></div>
                </div>
            </li>
        );
    };

    function FormatDate(dateAndTime) {
        const date = dateAndTime.slice(0, 10);
        const time = dateAndTime.slice(11, 19);
        return time + " " + date;
    }

    return (
        <div className="App container">
            <h1 className="text-center">My notes</h1>
            {localStorage.getItem("token") == null ?
                "You have to be loged to see your notes"
                :
                <div>
                    <div className="row container mb-3">
                        <div className="col-3 align-items-center">
                            <label htmlFor="title" >Type filter</label>
                            <div>
                                <select className="form-select" name="noteType" id="noteType" onChange={(e) => setNoteType(e.target.value)} value={noteType}>
                                    <option value="all">All notes</option>
                                    <option value="text">Text notes</option>
                                    <option value="voice">Voice notes</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-3 align-items-center">
                            <label htmlFor="title">Short by</label>
                            <div>
                                <select className="form-select" name="noteType" id="noteType" onChange={(e) => setSortType(e.target.value)} value={sortType}>
                                    <option value="title">Title</option>
                                    <option value="creation">Creation date</option>
                                    <option value="update">Update date</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-3 align-items-center">
                            <label htmlFor="title">Search title</label>
                            <div>
                                <input type="text" id="title" className="form-control" onChange={alterTitleFilter} value={titleFilter} />
                            </div>
                        </div>
                        <div className="col-3 align-items-center">
                            <label htmlFor="title">Search body</label>
                            <div>
                                <input type="text" id="title" className="form-control" onChange={alterBodyFilter} value={bodyFilter} />
                            </div>
                        </div>
                    </div>
                    <div>
                        {isLoading && <p>Loading...</p>}
                        <NoteList />
                    </div>
                </div>


            }


        </div>
    );
}