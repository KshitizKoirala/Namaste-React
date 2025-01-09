import React from "react";

import User from "./User";
import UserClass from "./UserClass";
import UserContext from "../utils/UserContext";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    console.log("Parent Constructor");
  }

  componentDidMount() {
    // This method is called after the component is rendered in the DOM.
    // This is the perfect place to make API calls, set up subscriptions, or set up event listeners.
    console.log("Parent Component mounted");
  }

  render() {
    console.log("Parent Render");
    return (
      <div>
        <h1>About Us</h1>
        <p>
          We are a team of developers who are passionate about coding and
          building applications that solve real-world problems. We believe that
          coding is an art and that every line of code is a masterpiece. We are
          committed to building applications that are not only functional but
          also beautiful.
        </p>
        <UserContext.Consumer>
          {({ loggedInUser }) => (
            <h2 className="text-xl font-bold">
              Data From Context in Class Based: {loggedInUser}
            </h2>
          )}
        </UserContext.Consumer>
        {/* <User name={"John Doe"} /> */}

        {/* React will batch the componentDIdMount [COMMIT] phase of the lifecycle together
         * and call them after the render phase is completed for all components.
         * REFER TO https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
         *
         * This is an optimization technique as this enables us to render the component quickly to the DOM
         * as DOM manipulations are expensive.
         *
         * The CompoenentDidMount [COMMIT] phase is completed for all the children in a single batch; i.e. making all the DOM manipulations at once.
         */}
        <UserClass name={"First"} location={"INDIA"} />
        <UserClass name={"Second"} location={"USA"} />
        <UserClass name={"Third"} location={"USA"} />
      </div>
    );
  }
}

// const About = () => {
//   return (
//     <div>
//       <h1>About Us</h1>
//       <p>
//         We are a team of developers who are passionate about coding and building
//         applications that solve real-world problems. We believe that coding is
//         an art and that every line of code is a masterpiece. We are committed to
//         building applications that are not only functional but also beautiful.
//       </p>
//       <User name={"John Doe (function)"} />
//       <UserClass name={"John Doe (class)"} location={"USA"} />
//     </div>
//   );
// };

export default About;
