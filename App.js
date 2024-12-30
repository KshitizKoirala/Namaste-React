/**
 *
 * <div id="parent">
 *      <div id="child">
 *          <h1> "Hello World" </h1>
 *      </div>
 * <div>
 */

//REACT
const heading = React.createElement(
  "h1",
  { id: "heading", xyz: "abc" },
  "Hello World From React!"
);
console.log(heading); // creates react element aka js object, which is rendered later in browser

// create nested element
const child = React.createElement("div", { id: "child" }, [heading, heading]); // create two elements as siblings then we can add them inside an array
const parent = React.createElement("div", { id: "parent" }, child);

//React DOM
const root = ReactDOM.createRoot(document.getElementById("root"));

//Render elements
root.render(parent);
