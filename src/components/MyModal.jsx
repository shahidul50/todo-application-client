import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const MyModal = (props) => {
    // eslint-disable-next-line react/prop-types
    const {show, handleClose, handleDelete} = props
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Delete</Modal.Title>
    </Modal.Header>
    <Modal.Body className='text-danger fw-bold'>Are you delete this todo??</Modal.Body>
    <Modal.Footer>
      <Button variant="success" onClick={handleDelete}>
        Yes
      </Button>
      <Button variant="danger" onClick={handleClose}>
        No
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default MyModal