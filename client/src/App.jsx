import React, { useContext } from "react";
import { Navbar, LeftBar, RightBar } from "./components";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { Home, Profile, Register, Login } from "./pages";
import "./style.scss";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const App = () => {
    const { darkMode } = useContext(DarkModeContext); 
    const { currentUser } = useContext(AuthContext);
    const queryClient = new QueryClient();

    const Layout = () => {
        return (
            <QueryClientProvider client={queryClient}>
                <div className={`theme-${darkMode ? "dark" : "light"}`}>
                    <Navbar />
                    <div style={{ display: "flex" }}>
                        <LeftBar />
                        <div style={{ flex: 6 }}>
                            <Outlet />
                        </div>
                        <RightBar />
                    </div>
                </div>
            </QueryClientProvider>
        );
      };

    const ProtectedRoute = ({ children }) => {
        if(!currentUser){
            return <Navigate to="/login" />;
        }
        return children;
    };


    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path:"/profile/:id",
                    element: <Profile />,
                }
            ],
        },
        {
            path: "/login", 
            element: <Login />,
        },
        {
            path: "/register", 
            element: <Register />,
        }
    ]);

    // const router = createBrowserRouter(
    //     createRoutesFromElements(
    //         <>
    //             <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
    //                 <Route index element={<Home />} />
    //                 <Route path="profile/:id" element={<Profile />} />
    //             </Route>
    //             <Route path="/login" element={<Login />} />
    //             <Route path="/register" element={<Register />} />
    //         </>
    //     )
    // )

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App