import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginUser } from "../stores/actions/userAction";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  function changeHandler(event) {
    let value = event.target.value;
    let name = event.target.name;

    let newObj = {
      ...input,
    };
    newObj[name] = value;
    setInput(newObj);
    console.log(input);
  }
  function submitHandler(event) {
    event.preventDefault();
    dispatch(LoginUser("https://notmyanimelistserver-production.up.railway.app/login", input)).then(() => {
      navigate("/");
    });
  }

  return (
    <div className="row mt-5">
      <div className="col-12">
        <main className="form-signin" style={{ backgroundColor: "whitesmoke" }}>
          <form onSubmit={submitHandler}>
            <div className="d-flex justify-content-center">
              {/* <img
              className="mb-10"
              src="../assets/slave_logo.jpg"
              alt=""
              width="120"
              style="align-items: center"
            /> */}
            </div>
            <h1 className="h3 mb-3 fw-normal text-center">
              Sign in to your account
            </h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                name="email"
                placeholder="name@example.com"
                value={input.email}
                onChange={changeHandler}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                name="password"
                placeholder="Password"
                value={input.password}
                onChange={changeHandler}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign in
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
export default Login;
