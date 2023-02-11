import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../stores/actions/userAction";

function SignUp() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    Address: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(
      RegisterUser("https://notmyanimelistserver-production.up.railway.app/private/register", input)
    ).then(() => {
      navigate("/");
    });
  }

  function cancelHandler(event) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <div className="row mt-5">
      <div className="col-12">
        <main className="form-signup" style={{ backgroundColor: "whitesmoke" }}>
          <form onSubmit={submitHandler}>
            <h1 className="h3 mb-3 fw-normal text-center">Register Admin</h1>
            <div className="form-floating">
              <input
                type="text"
                className="form-control mt-2"
                id="floatingInput"
                name="username"
                placeholder="Username"
                value={input.username}
                onChange={changeHandler}
              />
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control mt-2"
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
                className="form-control mt-2"
                id="floatingPassword"
                name="password"
                placeholder="Password"
                value={input.password}
                onChange={changeHandler}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control mt-2"
                id="floatingInput"
                name="phoneNumber"
                placeholder="phoneNumber"
                value={input.phoneNumber}
                onChange={changeHandler}
              />
              <label htmlFor="floatingInput">Phone Number</label>
            </div>
            <div className="form-floating mt-2">
              <textarea
                className="form-control"
                id="floatingInput"
                name="Address"
                placeholder="Address"
                value={input.Address}
                onChange={changeHandler}
                rows="5"
              ></textarea>
              <label htmlFor="floatingInput">Address</label>
            </div>
            <div className="col d-flex justify-content-center mt-3">
              <button className="btn btn-lg btn-warning me-3" onClick={cancelHandler}>
                Cancel
              </button>
              <button className="btn btn-lg btn-primary " type="submit">
                Sign up
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
export default SignUp;
