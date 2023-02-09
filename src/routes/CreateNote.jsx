export default function NewNote() {
    return (
        <div className="App container">
            <h1 className="text-center">New Note</h1>
            <div className="texnote_content">
                <form action="" method="post">
                    <div className="row mb-3">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                            <input type="text" id="title" className="form-control" placeholder="Title" required/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="notebody" className="col-sm-2 col-form-label">Note Content</label>
                        <div className="col-sm-10">
                            <textarea id="notebody" className="form-control" rows="3" placeholder="Text"/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="noteimg" className="col-sm-2 col-form-label">Add Image</label>
                        <div className="col-sm-10">
                            <input type="file" id="noteimg" accept="image/png, image/jpeg" className="form-control-input"/>
                        </div>
                    </div>

                    <div className="text-center">
                        <input type="submit" className="btn btn-primary" value="Save Note" />
                    </div>
                </form>

            </div>
        </div>
    );
}