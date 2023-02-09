export default function NewNote() {
    return (
        <div className="App" class="container">
            <h1 class="text-center">New Note</h1>
            <div className="texnote_content">
                <form action="" method="post">
                    <div class="row mb-3">
                        <label htmlFor="title" class="col-sm-2 col-form-label">Title</label>
                        <div class="col-sm-10">
                            <input type="text" id="title" class="form-control" required />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label htmlFor="notebody" class="col-sm-2 col-form-label">Note Content</label>
                        <div class="col-sm-10">
                            <textarea id="notebody" class="form-control" rows="3" />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label htmlFor="noteimg" class="col-sm-2 col-form-label">Add Image</label>
                        <div class="col-sm-10">
                            <input type="file" id="noteimg" accept="image/png, image/jpeg" class="form-control" />
                        </div>
                    </div>

                    <div class="text-center">
                        <input type="submit" class="btn btn-primary" value="Save Note" />
                    </div>
                </form>

            </div>
            <div className="audionote_content">
                <h1 class="text-center">New Audio Note</h1>
            </div>
        </div>
    );
}