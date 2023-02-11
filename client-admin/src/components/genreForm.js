import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleShowGenre } from "../stores/actions/toggleAction";
import { GenreAdd, fetchGenreData } from "../stores/actions/dataAction";

function GenreForm() {
  const dispatch = useDispatch();
  const { viewGenreToggle } = useSelector((state) => state.toggle);

  const [input, setInput] = useState({
    name: "",
  });
  function changeHandler(event) {
    let value = event.target.value;
    let name = event.target.name;
    let newObj = {
      ...input,
    };
    newObj[name] = value;
    setInput(newObj);
  }

  function showHandler(event) {
    event.preventDefault();
    dispatch(handleShowGenre(false));
  }
  function submitHandler(event) {
    event.preventDefault();
    console.log(input);
    dispatch(GenreAdd("https://notmyanimelistserver-production.up.railway.app/private/genre", input)).then(
      () => {
        dispatch(fetchGenreData("https://notmyanimelistserver-production.up.railway.app/private/genre/"));
        dispatch(handleShowGenre(false));
      }
    );
  }
  return (
    <>
      <Modal show={viewGenreToggle} onHide={showHandler}>
        <Modal.Header>
          <Modal.Title>Add Genre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitHandler}>
            <div className="form-floating">
              <input
                type="text"
                className="form-control mt-2"
                id="floatingInput"
                name="name"
                placeholder="name"
                value={input.name}
                onChange={changeHandler}
              />
              <label htmlFor="floatingInput">Genre Name</label>
            </div>
            <div className="col d-flex justify-content-center mt-3">
              <button
                className="btn btn-lg btn-warning me-3"
                onClick={showHandler}
              >
                Cancel
              </button>
              <button className="btn btn-lg btn-primary " type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
              <Button variant="secondary" onClick={showHandler}>
                Close
              </Button>
              <Button variant="primary" onClick={showHandler}>
                Save Changes
              </Button>
            </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default GenreForm;
