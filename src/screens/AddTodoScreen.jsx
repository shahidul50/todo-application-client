import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FormContainer from "../components/FromContainer";
import {useAddTodoMutation} from '../slices/todoApiSlice'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import Loader from '../components/Loader'

const AddTodoScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addTodo,{isLoading}] = useAddTodoMutation();
  const navigate = useNavigate();
 const handleSubmit=async(e) => {
      e.preventDefault()
      try {
        await addTodo({title, description}).unwrap();
        toast.success('Create Todo Successfully')
        setTitle('')
        setDescription('')
        navigate('/')
    } catch (err) {
        toast.error(err?.data?.message || err.error)
    }
 }
 const handleBack = () => {
        navigate('/')
 }

  return (
    <FormContainer>
      <h1 className='text-center'>Add Todo</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Enter a title" 
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={(e)=> setDescription(e.target.value)}/>
        </Form.Group>
        {isLoading && <Loader />}
       <Button type='submit'variant="primary" className="my-2 w-100">Save</Button>
      </Form>
      <Button variant="secondary" onClick={handleBack}>Back</Button>
    </FormContainer>
  );
};

export default AddTodoScreen;
