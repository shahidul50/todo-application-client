
import { useGetAllTodosQuery } from "../slices/todoApiSlice";
import Loader from "../components/Loader";
import Hero from "../components/Hero";
import Todo from "../components/Todo";
import { useState } from "react";

function HomeScreen() {
    const [status, setStatus] = useState('pending')
    const getTodo = (status,todos) =>{
        if(status === 'pending'){
          const result = todos?.filter(item => item.completed === false)
          return result ? [...result].reverse() : result
        }
        if(status === 'complete'){
          return  todos?.filter(item => item.completed === true)
        }
        if(status === 'all'){
          return todos ? [...todos].reverse() : todos
        }
    }
  // eslint-disable-next-line no-unused-vars
  const { todos, isFetching } = useGetAllTodosQuery(undefined,{
    selectFromResult: ({data}) => ({
      todos: getTodo(status, data?.todos)
    })
  });
  ///console.log(...todos);
  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Hero status={status} setStatus={setStatus}/>
          <div className="main-container">
          { todos ? todos?.map((todo)=> <Todo todo={todo} key={todo._id}/>) : <h1 className="text-center">Welcome</h1>
            }
          </div>
          {/* <div className="main-container" >
            { todos ? todos?.map((todo)=> <Todo todo={todo} key={todo._id}/>) : 
            ( userInfo ? (
            <>
               <h1 className="text-center">Welcome</h1>
               <h4 className="text-center">Please Login and write your todo.</h4>
            </>
            ) : <h1 className="text-center">Add your First Todo.</h1>)
            }
          </div> */}
        </>
      )}
    </>
  );
}

export default HomeScreen;
