import { createBrowserRouter, RouterProvider } from "react-router-dom"
import PostList from "./components/PostList";
import UserList from "./components/UserList";
import { Counter } from "./components/Counter";

function App() {

  const router = createBrowserRouter([
    {
      path: "/", 
      element: <PostList />,
    },
    {
      path: "/user", 
      element: <UserList />,
    },
    {
      path: "/counter", 
      element: <Counter />,
    }
  ])

  return <RouterProvider router={router} />
}

export default App
