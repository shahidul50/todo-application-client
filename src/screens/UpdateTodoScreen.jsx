import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FormContainer from "../components/FromContainer";
import { useEffect, useState } from "react";
import { useGetAllTodosQuery } from "../slices/todoApiSlice";
import { useParams } from "react-router-dom";
import { useUpdateTodoMutation } from "../slices/todoApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const UpdateTodoScreen = () => {
  //get todo Id from Url
  const params = useParams();

  const [data, setData] = useState({
         title: "",
         description: "",
         completed: ""
  });

  const { todo } = useGetAllTodosQuery(undefined, {
    selectFromResult: ({ data }) => ({
      todo: data?.todos?.find((item) => item._id === params.id),
    }),
  });

  const navigate = useNavigate();

  const [updateTodo, { isLoading }] = useUpdateTodoMutation();

  useEffect(() => {
    if(todo){
      setData(todo)
    }
  }, [todo]);

  const handleChange = (e) =>{
       setData({
         ...data,
         [e.target.name] : e.target.value
       })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('test-',data)
        await updateTodo(data);
        toast.success("Updated Todo Successfully");
        setData({         
             title: "",
             description: "",
              completed: ""})
        navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleBack = () => {
    navigate('/')
   }
  return (
    <FormContainer>
      <h1 className="text-center">Update Todo</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3"  controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a title"
            name='title'
            value={data.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3"  controlId="exampleForm.ControlTextarea1">
          <Form.Label >Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name='description'
            value={data.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Select
          name='completed'
          aria-label="Status"
          value={data.completed}
          onChange={handleChange}
        >
          <option value="false">
            Uncomplete
          </option>
          <option value="true"> Complete </option>
        </Form.Select>
        {isLoading && <Loader />}
        <Button type="submit" variant="primary" className="my-2 w-100">
          Update
        </Button>
      </Form>
      <Button variant="secondary" onClick={handleBack}>Back</Button>
    </FormContainer>
  );
};

export default UpdateTodoScreen;
