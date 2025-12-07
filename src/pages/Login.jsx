function Login() {
    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={() => window.location.href='translate.html'}>Go to Translate</button>
            <button onClick={() => window.location.href='train.html'}>Go to Train</button>
        </div>
    )
}

export default Login
