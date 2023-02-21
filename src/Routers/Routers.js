import { createBrowserRouter } from "react-router-dom";
import EditUser from "../Components/EditUser";
import Main from "../Layout/Main";
import About from "../Pages/About";
import Login from "../Pages/Login";
import UsersManagement from "../Pages/UsersManagement";

export const Routers = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Login />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/usersmanagement',
                element: <UsersManagement />
            },
            {
                path: '/edituser/:id',
                loader: ({params}) => fetch(`http://localhost:5000/user/${params.id}`),
                element: <EditUser/>
            }
        ]
    }
])