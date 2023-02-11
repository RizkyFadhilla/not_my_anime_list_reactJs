import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchOneData } from "../stores/actions";
import "./AnimeDetail.css";
import { useDispatch, useSelector } from "react-redux";

function AnimeDetail() {
  const { animeId } = useParams();
  const dispatch = useDispatch();
  const { dataDetail, loadingDetail, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(
      fetchOneData(
        `https://notmyanimelistserver-production.up.railway.app/movies/public/${animeId}`
      )
    );
  }, [dispatch]);

  if (loadingDetail) {
    return <h1> Keep Calm, data is still on the way</h1>;
  } else if (error) {
    return <h1> sorry, data cannot be load</h1>;
  } else {
    return (
      <div>
        <h2>{dataDetail.title}</h2>
        <div className="row g-2">
          <div className="col-2">
            <img
              style={{ width: "95%" }}
              src={dataDetail.imgUrl}
              alt={dataDetail.title}
            />
            <br />
            <p className="fw-bold" style={{ borderBottom: "1px solid" }}>
              information :
            </p>
            <p className="fw-bold">
              Genres:{" "}
              <span className="fw-normal">{dataDetail.Genre?.name}</span>
            </p>
            <p className="fw-bold">
              Author:{" "}
              <span className="fw-normal">{dataDetail.Author?.username}</span>
            </p>
          </div>
          <div className="col-7">
            <div className="row border" style={{ backgroundColor: "#f8f8f8" }}>
              <div className="col-2 text-center border border-4">
                <p className="bg-primary text-white p-1 mt-2">score</p>
                <p>{dataDetail.rating}</p>
              </div>
            </div>
            <p className="fw-bold" style={{ borderBottom: "1px solid" }}>
              Synopsis:
            </p>
            <p>{dataDetail.synopsis}</p>

            <p className="fw-bold" style={{ borderBottom: "1px solid" }}>
              character :
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              {dataDetail.Casts?.map((el) => {
                return (
                  <tbody key={el.id}>
                    <tr>
                      <td>
                        <img
                          src={el.profilePict}
                          style={{ width: 50 }}
                          alt={el.name}
                        />
                      </td>
                      <td>{el.name}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
          <div className="col-3">
            <iframe
              width="100%"
              src={dataDetail.trailerUrl}
              title="YouTube video player"
              frameBorder="0"
              // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    );
  }
}
export default AnimeDetail;
