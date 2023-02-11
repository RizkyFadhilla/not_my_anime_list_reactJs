import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { viewCastHandleShow } from "../stores/actions/toggleAction";

function CastList() {
  const dispatch = useDispatch();
  const { viewCastToggle, dataCast } = useSelector((state) => state.toggle);

  function showHandler(event) {
    event.preventDefault();
    dispatch(viewCastHandleShow(false));
  }
  if (!dataCast) {
    return;
  }
  return (
    <>
      <Modal show={viewCastToggle} onHide={showHandler}>
        <Modal.Header>
          <Modal.Title>Cast List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
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
              {dataCast.map((el) => {
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
          </>
        </Modal.Body>
        <br />
        <Modal.Footer>
          <Button variant="secondary" onClick={showHandler}>
            Close
          </Button>
          <Button variant="primary" onClick={showHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CastList;
