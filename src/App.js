import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

import Body from "./components/Body";
import Header from "./components/Header";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
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

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
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
