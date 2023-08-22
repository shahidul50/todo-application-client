
import { useGetAllTodosQuery } from "../slices/todoApiSlice";
import Loader from "../components/Loader";
import Hero from "../components/Hero";
import Todo from "../components/todo";
import { useState } from "react";

function HomeScreen() {
    const [search, setSearch] = useState('pending')
    const getTodo = (search,todos) =>{
        if(search === 'pending'){
          const result = todos?.filter(item => item.completed === false)
          return result ? [...result].reverse() : result
        }
        if(search === 'complete'){
          return  todos?.filter(item => item.completed === true)
        }
        if(search === 'all'){
          return todos ? [...todos].reverse() : todos
        }
    }
  // eslint-disable-next-line no-unused-vars
  const { todos, isFetching } = useGetAllTodosQuery(undefined,{
    selectFromResult: ({data}) => ({
      todos: getTodo(search, data?.todos)
    })
  });
  ///console.log(...todos);
  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Hero search={search} setSearch={setSearch}/>
          <div className="main-container" >
            { todos ? todos?.map((todo)=> <Todo todo={todo} key={todo._id}/>) : <h1 className="text-center">Welcome</h1>
            }
          </div>
        </>
      )}
    </>
  );
}

export default HomeScreen;
