import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleEditShowGenre } from "../stores/actions/toggleAction";
import {
  GenreAdd,
  fetchGenreData,
  EditGenre,
} from "../stores/actions/dataAction";

function GenreEditForm() {
  const dispatch = useDispatch();
  const { editGenreToggle } = useSelector((state) => state.toggle);
  const { genreById } = useSelector((state) => state.anime);

  const [input, setInput] = useState({ name: "" });

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

  function showHandler(event) {
    event.preventDefault();
    dispatch(handleEditShowGenre(false));
  }
  function setOldData(event) {
    event.preventDefault();
    let oldData = {
      name: genreById.name,
    };
    setInput(oldData);
  }
  function submitEditHandler(event) {
    event.preventDefault();
    let id = genreById.id;
    dispatch(EditGenre(`https://notmyanimelistserver-production.up.railway.app/private/genre/${id}`, input.name));
    // .then(() => {
    //   dispatch(fetchGenreData("https://notmyanimelistserver-production.up.railway.app/private/genre/"));
    //   dispatch(handleEditShowGenre(false));
    // });
  }
  return (
    <>
      <Modal show={editGenreToggle} onHide={showHandler}>
        <Modal.Header>
          <Modal.Title>Edit Genre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button
            className="btn btn-success"
            onClick={(event) => {
              setOldData(event);
            }}
          >
            show old data
          </button>
          <form onSubmit={submitEditHandler}>
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

export default GenreEditForm;
