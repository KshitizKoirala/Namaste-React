import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Kshitiz",
        location: "Nepal",
        contact: "here",
        avatar_url: "http://dummy-photo.com",
      },
    };
    console.log(this.props.name + "Child Constructor");
  }

  async componentDidMount() {
    // This method is called after the component is rendered in the DOM.
    // This is the perfect place to make API calls, set up subscriptions, or set up event listeners.
    console.log(this.props.name + "Child Component mounted");

    const data = await fetch("https://api.github.com/users/kshitizkoirala");
    const json = await data.json();

    // console.log(json);
    this.setState({
      userInfo: {
        name: json.name,
        location: json.location,
        contact: json.url,
        avatar_url: json.avatar_url,
      },
    });

    // Problem of Single Page Applications
    // i.e. everytime we visit the page, the component is re-rendered,
    // i.e a new setInterval is created everytime.
    //
    // And even if we leave the page, the setInterval is still running.
    // So we need to clear the interval when we leave the page in ComponentWillUnmount.
    this.timer = setInterval(() => {
      console.log("Namste React Interval");
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    // If we needed to keep track of state changes, we could do it here.
    if (this.state.userInfo.name !== prevState.userInfo.name) {
      // Do something
    }

    if (this.state.userInfo.location !== prevState.userInfo.location) {
      // Do something
    }
    // Called when the state variable is updated.
    console.log(this.props.name + "Child Component Updated");
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    // Called when we leave the page or the component is removed from the DOM.
    console.log(this.props.name + "Child Component Unmounted");
  }

  render() {
    console.log(this.props.name + "Child Render");
    const { name, location, contact, avatar_url } = this.state.userInfo;
    // debugger;
    return (
      <div className="user-card">
        <img src={avatar_url} />
        <h2>{name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: {contact}</h4>
      </div>
    );
  }
}

export default UserClass;
