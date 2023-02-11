import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function AnimeCard({ anime }) {
  const url = "/Anime/" + anime.id;
  return (
    <Col className="mt-5">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={anime.imgUrl} />
        <Card.Body>
          <Card.Title className="text-center">{anime.title}</Card.Title>
          <Link
            to={url}
            className="btn btn-primary w-100"
            style={{ backgroundColor: "blue" }}
          >
            Detail
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default AnimeCard;
