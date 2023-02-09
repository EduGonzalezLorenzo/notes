import { useState, useEffect } from "react";

export default function NewVoiceNote() {
    const [record, setRecord] = useState(null);
    const [stop, setStop] = useState(null);
    const [soundClips, setSoundClips] = useState(null);

    useEffect(() => {
        setRecord(document.getElementById("record"));
        setStop(document.getElementById("stop"));
        setSoundClips(document.getElementById("soundClips"));
    }, []);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                const mediaRecorder = new MediaRecorder(stream);
                let chunks = [];
                mediaRecorder.ondataavailable = (e) => {
                    chunks.push(e.data);
                };
                record.onclick = () => {
                    mediaRecorder.start();
                    console.log(mediaRecorder.state);
                    console.log("record click");
                    record.style.background = "red";
                    record.style.color = "black";
                    record.disable = true;
                    stop.disable = false;
                };

                stop.onclick = () => {
                    mediaRecorder.stop();
                    console.log(mediaRecorder.state);
                    console.log("stop click");
                    record.style.background = "";
                    record.style.color = "";
                    record.disable = false;
                    stop.disable = true;
                };

                mediaRecorder.onstop = (e) => {
                    console.log("recorder stopped");

                    const clipContainer = document.createElement("article");
                    const clipLabel = document.createElement("p");
                    const audio = document.createElement("audio");
                    const deleteButton = document.createElement("button");

                    clipContainer.classList.add("clip");
                    audio.setAttribute("controls", "");
                    deleteButton.innerHTML = "Delete";

                    clipContainer.appendChild(audio);
                    clipContainer.appendChild(clipLabel);
                    clipContainer.appendChild(deleteButton);
                    soundClips.appendChild(clipContainer);

                    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                    chunks = [];
                    const audioURL = window.URL.createObjectURL(blob);
                    audio.src = audioURL;

                    deleteButton.onclick = (e) => {
                        let evtTgt = e.target;
                        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
                    };

                };
            })
            .catch((err) => {
                console.error(`The following getUserMedia error occurred: ${err}`);
            });
    } else {
        console.log("getUserMedia not supported on your browser!");
    }

    return (
        <div className="App container">
            <h1 className="text-center">New Voice Note</h1>
            <form action="" method="">
                <div className="main-controls text-center mb-3">
                    <div className="text-center" id="buttons">
                        <button id="record" type="button">Record</button>
                        <button id="stop" type="button">Stop</button>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input type="text" id="title" className="form-control" placeholder="Title" required />
                    </div>
                </div>
                <div className="mb-3 text-center">
                    {/* <label htmlFor="noteimg" className="col-sm-2 col-form-label">Check Audio</label> */}
                    <div className="" id="soundClips"></div>
                </div>
                <div className="text-center">
                    <input type="submit" className="btn btn-primary" value="Save Note" />
                </div>
            </form>

        </div>
    );
}