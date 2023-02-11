import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleShow } from "../stores/actions/toggleAction";
import { AddData, fetchAllData } from "../stores/actions/dataAction";

function AnimeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addAnimeToggle } = useSelector((state) => state.toggle);
  const { genreData } = useSelector((state) => state.anime);

  const [input, setInput] = useState({
    title: "",
    synopsis: "",
    rating: "",
    trailerUrl: "",
    imgUrl: "",
    genre: "",
  });
  const [cast, setCast] = useState([
    {
      castName: "",
      castImgUrl: "",
    },
  ]);
  function addCast(event) {
    event.preventDefault();
    setCast([...cast, { castName: "", castImgUrl: "" }]);
  }
  function changeHandler(event) {
    let value = event.target.value;
    let name = event.target.name;
    let newObj = {
      ...input,
    };
    newObj[name] = value;

    setInput(newObj);
  }
  function castChangeHandler(i, event) {
    let value = event.target.value;
    let name = event.target.name;
    let data = [...cast];
    data[i][name] = value;
    setCast(data);
  }
  function removeCastHandler(event, deleteIndex) {
    event.preventDefault();
    const temp = cast.filter((el, index) => index !== deleteIndex);
    const newData = temp;
    setCast(newData);
  }

  function showHandler(event) {
    event.preventDefault();
    dispatch(handleShow(false));
  }

  function submitHandler(event) {
    event.preventDefault();
    dispatch(AddData("https://notmyanimelistserver-production.up.railway.app/private/data", input, cast)).then(
      () => {
        dispatch(fetchAllData("https://notmyanimelistserver-production.up.railway.app/private/anime/"));
        dispatch(handleShow(false));
      }
    );
  }
  console.log(addAnimeToggle);
  return (
    <>
      <Modal show={addAnimeToggle} onHide={showHandler}>
        <Modal.Header>
          <Modal.Title>Add Anime</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitHandler}>
            <div className="form-floating">
              <input
                type="text"
                className="form-control mt-2"
                id="floatingInput"
                name="title"
                placeholder="title"
                value={input.title}
                onChange={changeHandler}
              />
              <label htmlFor="floatingInput">Title</label>
            </div>
            <div className="form-floating mt-2">
              <textarea
                className="form-control"
                id="floatingInput"
                name="synopsis"
                placeholder="synopsis"
                value={input.synopsis}
                onChange={changeHandler}
                rows="5"
              ></textarea>
              <label htmlFor="floatingInput">synopsis</label>
            </div>
            <div className="form-floating">
              <input
                type="number"
                className="form-control mt-2"
                id="floatingInput"
                name="rating"
                // placeholder="name@example.com"
                value={input.rating}
                onChange={changeHandler}
              />
              <label htmlFor="floatingInput">Rating</label>
            </div>
            <div className="form-floating">
              <input
                type="url"
                className="form-control mt-2"
                id="floatingInput"
                name="trailerUrl"
                placeholder="trailerUrl"
                value={input.trailerUrl}
                onChange={changeHandler}
              />
              <label htmlFor="floatingInput">Trailer Link</label>
            </div>
            <div className="form-floating">
              <input
                type="url"
                className="form-control mt-2"
                id="floatingInput"
                name="imgUrl"
                placeholder="imgUrl"
                value={input.imgUrl}
                onChange={changeHandler}
              />
              <label htmlFor="floatingInput">Image Url</label>
            </div>
            <label>Genre :</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={input.genre}
              name="genre"
              onChange={changeHandler}
            >
              <option selected disabled value="">
                Open this select menu
              </option>
              {genreData.map((el) => {
                return (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                );
              })}
            </select>
            <label>Cast :</label>
            {cast.map((car, i) => {
              return (
                <div className="row d-flex" key={car.i}>
                  <div className="col-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control mt-2"
                        id="floatingInput"
                        name="castName"
                        placeholder="castName"
                        value={car.castName}
                        onChange={(event) => castChangeHandler(i, event)}
                      />
                      <label htmlFor="floatingInput">name</label>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="form-floating">
                      <input
                        type="url"
                        className="form-control mt-2"
                        id="floatingInput"
                        name="castImgUrl"
                        placeholder="castImgUrl"
                        value={car.castImgUrl}
                        onChange={(event) => castChangeHandler(i, event)}
                      />
                      <label htmlFor="floatingInput">Cast image Url</label>
                    </div>
                  </div>
                  <div className="col-3">
                    <button
                      className="btn btn-danger mt-2"
                      onClick={(e) => removeCastHandler(e, i)}
                    >
                      Delete Cast
                    </button>
                  </div>
                </div>
              );
            })}
            <button onClick={addCast} className="mt-3 btn btn-success">
              add cast
            </button>

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

export default AnimeForm;
