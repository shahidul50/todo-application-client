import { Button, Col, Form, Row } from "react-bootstrap";
import { FaMinusCircle, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDeleteTodoMutation } from "../slices/todoApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import MyModal from '../components/MyModal.jsx'

//import Loader from "../components/Loader";

const Todo = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // eslint-disable-next-line react/prop-types
  const { todo } = props;
  const [deleteTodo] = useDeleteTodoMutation();
  const navigate = useNavigate();
  // eslint-disable-next-line react/prop-types
  const { _id, title, description, completed } = todo;
  const handleDelete = async () => {
    try {
      await deleteTodo(_id);
      toast.success("Delete Todo Successfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <section className="my-card">
      <MyModal show={show} handleClose={handleClose} handleDelete={handleDelete}/>
      <Row>
        <Col lg="1">
          <Form>
            {completed && (
              <div key="default-checkbox" className="mb-3">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id={`default-checkbox`}
                  checked={completed}
                />
              </div>
            )}
          </Form>
        </Col>
        <Col lg="8">
          <div className="">
            <b>
              <i>{title}</i>
            </b>
          </div>
          <div>
            <pre>{description}</pre>
          </div>
        </Col>
        <Col lg="3">
          <Button className="mx-2 btn-danger" onClick={handleShow}>
            <FaMinusCircle />
          </Button>
          <Link to={`/todos/${_id}`} className="btn btn-primary">
            <FaEdit />
          </Link>
        </Col>
      </Row>
    </section>
  );
};

export default Todo;
