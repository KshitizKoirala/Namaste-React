import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

import Body from "./components/Body";
import Header from "./components/Header";
// import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
// import Grocery from "./components/Grocery";

/**
 * Parcel bundler right now bundles all the js files into a single .js file for the browser to load,
 * BUT, Loading an entire big .js is a huge overhea for the browser
 * so we split the js into multiple chunks and load them only when required
 * this is also known as
 *
 * Chunking
 * Code Splitting
 * Lasy Loading
 * Dynamic Bundling
 * On Demand Loading
 * Dynamic Import
 */

const Grocery = lazy(() => import("./components/Grocery"));
const About = lazy(() => import("./components/About"));

const AppLayout = () => {
  // authentication code here
  const [userName, setUserName] = useState();

  useEffect(() => {
    // Make an API call and send username and Password
    const data = {
      name: "Kshitiz Koirala",
    };
    setUserName(data.name);
  }, []);

  return (
    // Default Value of Context is used outside of the UserContext.Provider
    // Provider allows the app to access the context value and perform Update
    <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
      {/* Kshitiz Koirala as context value */}
      <div className="app">
        <UserContext.Provider value={{ loggedInUser: "Elon Musk" }}>
          {/* Elon Musk as context value */}
          <Header />
        </UserContext.Provider>
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body /> },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>About Us is being loaded</h1>}>
            <About />
          </Suspense>
        ),
      },
      { path: "/contact", element: <Contact /> },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Grocery is being loaded</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      { path: "/restaurant/:resId", element: <RestaurantMenu /> },
    ],
    errorElement: <Error />,
  },
]);

// ReactDOM element
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
