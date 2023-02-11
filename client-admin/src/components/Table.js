import { viewCastHandleShow } from "../stores/actions/toggleAction";
import GenreEditForm from "./GenreEditForm";
import { useDispatch, useSelector } from "react-redux";
import CastList from "./castList";
import { handleEditShowGenre } from "../stores/actions/toggleAction";
import {
  DeleteAnime,
  DeleteGenre,
  fetchAllData,
  fetchGenreData,
  fetchGenreDataById,
} from "../stores/actions/dataAction";

function DataTable({ anime, index, genre }) {
  const dispatch = useDispatch();
  const { genreById, loadingGenre } = useSelector((state) => state.anime);
  function viewCastShowHandler(params, data) {
    dispatch(viewCastHandleShow(params, data));
  }

  if (anime) {
    function deleteData(event, id) {
      event.preventDefault();
      dispatch(DeleteAnime(`https://notmyanimelistserver-production.up.railway.app/private/anime/${id}`)).then(
        () => {
          dispatch(fetchAllData("https://notmyanimelistserver-production.up.railway.app/private/anime"));
        }
      );
    }
    return (
      <>
        <tr className="d-flex">
          <th className="col-1">{index + 1}</th>
          <th className="col-1">{anime.title}</th>
          <th className="col-3">{anime.synopsis}</th>
          <th className="col-1">{anime.rating}</th>
          <th className="col-1">{anime.trailerUrl}</th>
          <th className="col-1">
            <img
              src={anime.imgUrl}
              style={{ width: "100px" }}
              alt={anime.title}
            />
          </th>
          <th className="col-1">{anime.Author.username}</th>
          <th className="col-1">{anime.Genre.name}</th>
          <th className="col-1">
            <button
              className="btn btn-warning"
              onClick={() => viewCastShowHandler(true, anime.Casts)}
            >
              view cast
            </button>
          </th>
          <th className="col-1">
            <button className="btn btn-warning"> edit </button>
            <button
              className="btn btn-danger ms-1"
              onClick={(event) => deleteData(event, anime.id)}
            >
              {" "}
              delete
            </button>
          </th>
        </tr>
        <CastList />
      </>
    );
  } else if (genre) {
    function deleteGenre(event, id) {
      event.preventDefault();
      dispatch(DeleteGenre(`https://notmyanimelistserver-production.up.railway.app/private/genre/${id}`)).then(
        () => {
          dispatch(fetchGenreData("https://notmyanimelistserver-production.up.railway.app/private/genre/"));
        }
      );
    }
    function showEditFormToggle(event, id) {
      event.preventDefault();
      dispatch(handleEditShowGenre(true, id));
    }
    if (loadingGenre) {
      <h1>Please wait Loading</h1>;
    }
    return (
      <>
        <tr className="d-flex">
          <th className="col-2">{index + 1}</th>
          <th className="col-3">{genre.name}</th>
          <th className="col-2">{genre.createdAt}</th>
          <th className="col-2">{genre.updatedAt}</th>
          <th className="col-3">
            <button
              className="btn btn-warning me-2"
              onClick={(event) => showEditFormToggle(event, genre.id)}
            >
              edit
            </button>
            <button
              className="btn btn-danger"
              onClick={(event) => deleteGenre(event, genre.id)}
            >
              delete
            </button>
          </th>
        </tr>
        <GenreEditForm />
      </>
    );
  }
}

export default DataTable;
