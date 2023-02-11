import AnimeCard from "../components/Card";
import { fetchAllData } from "../stores/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function AnimeList() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchAllData("https://notmyanimelistserver-production.up.railway.app/movies/public/"));
  }, [dispatch]);

  if (loading) {
    return <h1> Keep Calm, data is still on the way</h1>;
  } else if (error) {
    return <h1> sorry, data cannot be load</h1>;
  }
  console.log(data, "ini di pages")
  return (
    <div className="row">
      {data.map((el) => {
        return <AnimeCard anime={el} key={el.id} />;
      })}
    </div>
  );
}

export default AnimeList;
