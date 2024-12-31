import React from "react";
import ReactDOM from "react-dom/client";

// React Element
const heading = React.createElement("h1", { id: "heading" }, "Kshitiz is Here");
// React.createElement => ReactElement -> JS Object => HTMLElement(render)

// JSX (Transipiled before reaching to the browser) - Parcel (Manager) - Babel (Worker)
const jsxHeading = (
  <h1 id="heading" tabIndex="1">
    Namaste React Using JSX 🚀
  </h1>
);
// JSX => Babel transpiles it to React.createElement => ReactElement-JS Object => HTMLElement (render)

console.log(heading, jsxHeading); // Both are the same

/**
 * React Components
 * - ClassBased Components
 * - Function Based Component
 */

// React Functional Component
// Using () does not need to use the return keyword
const Title = function () {
  return (
    <h1 id="heading" tabIndex="1">
      Namaste React Using JSX 🚀
    </h1>
  );
};

// Component Composition => Composing two or more components with each other
const HeadingComponent = () => (
  <div id="container">
    <Title />
    <h1 id="heading">This is a functional Component</h1>
  </div>
);

// ReactDOM element
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent />);
