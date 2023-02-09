export default function SignUp() {
    return (
        <div className="App" class="container">
            <h1 class="text-center">Register</h1>
            <div className="texnote_content">
                <form action="" method="post">
                    <div class="row mb-3">
                        <label htmlFor="userName" class="col-sm-2 col-form-label">User name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="userName" required />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label htmlFor="email" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="email" placeholder="name@example.com" required />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label htmlFor="password" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control password" id="password" onkeyup='checkPass();' required />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label htmlFor="passwordRepeat" class="col-sm-2 col-form-label">Repeat password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control password" id="passwordRepeat" onkeyup='checkPass();' required />
                            <input type="checkbox" onclick="showPass()" />Show Passwords
                        </div>
                    </div>
                    <div class="text-center">
                        <input id="signUp" class="btn btn-primary" type="submit" value="Create user" />
                    </div>
                </form>
            </div>
        </div>
    );
}