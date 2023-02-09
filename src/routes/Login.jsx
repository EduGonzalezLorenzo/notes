export default function Login() {
    return (
        <div className="App" class="container">
            <h1 class="text-center">Login</h1>
            <div className="texnote_content">
                <form action="" method="post">
                    <div class="row mb-3">
                        <label for="username" class="col-sm-2 col-form-label"> User name:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="username" id="username" required />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="password" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                            <input type="password" name="password" class="form-control password" id="password" required />
                            <input type="checkbox" onclick="showPass()" />Show Password
                        </div>
                    </div>
                    <div class="text-center">
                        <input class="btn btn-primary" type="submit" value="Login" />
                    </div>
                </form>
            </div>
        </div>
    );
}