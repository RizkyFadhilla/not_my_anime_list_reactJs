import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenreData } from "../stores/actions/dataAction";
import GenreTable from "../components/Table";
import Table from "react-bootstrap/Table";
import { handleShowGenre } from "../stores/actions/toggleAction";
import GenreForm from "../components/genreForm";
function GenreList() {
  const dispatch = useDispatch();
  const { genreData, loading, error } = useSelector((state) => state.anime);

  function showHandler(event, params) {
    event.preventDefault();
    console.log(params, "ini params");
    dispatch(handleShowGenre(params));
  }

  useEffect(() => {
    dispatch(fetchGenreData("https://notmyanimelistserver-production.up.railway.app/private/genre/"));
  }, [dispatch]);

  if (loading) {
    return <h1> Keep Calm, data is still on the way</h1>;
  } else if (error) {
    return <h1> sorry, data cannot be load</h1>;
  }
  return (
    <>
      <br></br>
      <h1>Genre List</h1>
      <div className="col d-flex flex-row-reverse me-3">
        <button
          className="btn btn-primary"
          onClick={(e) => showHandler(e, true)}
        >
          Add Genre
        </button>
      </div>
      <br />
      <Table striped bordered hover className="text-center">
        <thead>
          <tr className="d-flex">
            <th className="col-2">No</th>
            <th className="col-3">Genre Name</th>
            <th className="col-2">Created</th>
            <th className="col-2">Updated</th>
            <th className="col-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {genreData.map((el, i) => {
            return <GenreTable genre={el} key={el.id} index={i} />;
          })}
        </tbody>
      </Table>
      <GenreForm/>
    </>
  );
}
export default GenreList;
