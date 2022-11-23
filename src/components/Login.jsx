import React, { useState } from "react";
import "./login.css";

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        console.log(username, password)
    }
  return (
    <div className="login">
      <form className="form-signin">
        <img
          className="mb-4"
          src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <input
          type="username"
          id="inputUsername"
          className="form-control"
          placeholder="Username"
          required
          autofocus
          onChange={e=>setUsername(e.target.value)}
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          onChange={e=>setPassword(e.target.value)}
        />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={handleSubmit}>
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; tStudio by Sahan Thenuwara</p>
      </form>
    </div>
  );
}
