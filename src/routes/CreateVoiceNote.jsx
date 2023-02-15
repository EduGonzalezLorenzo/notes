import { useState, useRef } from "react";

export default function NewVoiceNote() {
    const [isRecording, setIsRecording] = useState(false);
    const [blob, setBlob] = useState(null);
    const mediaRecorderRef = useRef(null);

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

    return (
        <div className="App container">
            <h1 className="text-center">New Voice Note</h1>
            <form action="" method="put">
                <div className="row mb-3">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input type="text" id="title" className="form-control" placeholder="Title" required />
                    </div>
                </div>
                <div className="mb-3 text-center">
                    {blob ? <audio controls src={URL.createObjectURL(blob)} /> : null}
                    <input type="hidden" value={blob}/>
                </div>
                <div className="main-controls text-center mb-3">
                    <div className="text-center" id="buttons">
                        <button type="button" onClick={isRecording ? stopRecording : startRecording}>
                            {isRecording ? "Stop recording" : "Start recording"}
                        </button>
                    </div>
                </div>
                <div className="text-center">
                    <input type="submit" className="btn btn-primary" value="Save Note" disabled={!blob} />
                </div>
            </form>

        </div>
    );
}