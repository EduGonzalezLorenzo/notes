export default function NewNote() {
    return (
        <div className="App">
            <h2>New Note</h2>
            <div className="texnote_content">
                <form action="" method="post">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" />
                    <label htmlFor="notebody">Note Content</label>
                    <input type="textarea" id="notebody" />
                    <label htmlFor="noteimg">Add Image</label>
                    <input type="file" id="noteimg" accept="image/png, image/jpeg" />
                    <input type="submit" value="Save Note" />
                </form>
            </div>
            <div className="audionote_content">
                <h2>New Audio Note</h2>
            </div>
        </div>
    );
}