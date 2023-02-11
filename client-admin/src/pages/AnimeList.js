import { useEffect } from "react";
import AnimeTable from "../components/Table";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "../stores/actions/dataAction";
import { handleShow } from "../stores/actions/toggleAction";
import AnimeForm from "../components/AnimeForm";

function AnimeList() {
  const dispatch = useDispatch();
  let { data, loading, error } = useSelector((state) => state.anime);
  function showHandler(params) {
    dispatch(handleShow(params));
  }
  useEffect(() => {
    dispatch(
      fetchAllData("https://notmyanimelistserver-production.up.railway.app/private/anime/")
    );
  }, [dispatch]);

  if (loading) {
    return <h1> Keep Calm, data is still on the way</h1>;
  } else if (error) {
    return <h1> sorry, data cannot be load</h1>;
  }
  return (
    <>
      <br></br>
      <h1>Anime List</h1>
      <div className="col d-flex flex-row-reverse me-3">
        <button className="btn btn-primary" onClick={() => showHandler(true)}>
          Add Anime
        </button>
      </div>
      <br />
      <Table striped bordered hover className="text-center">
        <thead>
          <tr className="d-flex">
            <th className="col-1">No</th>
            <th className="col-1">Title</th>
            <th className="col-3">Synopsis</th>
            <th className="col-1">Rating</th>
            <th className="col-1">Trailer</th>
            <th className="col-1">Image</th>
            <th className="col-1">Submit by</th>
            <th className="col-1">Genre</th>
            <th className="col-1">Cast</th>
            <th className="col-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el, i) => {
            return <AnimeTable anime={el} key={el.id} index={i} />;
          })}
        </tbody>
      </Table>
      <AnimeForm />
    </>
  );
}

export default AnimeList;
