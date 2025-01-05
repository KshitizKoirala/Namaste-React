import { useEffect, useState } from "react";

const User = (props) => {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Functional Namaste React Interval");
    }, 1000);
    console.log("Functional Component Mounted");
    return () => {
      clearInterval(timer);
      console.log("Functional Component Unmounted");
    };
  }, []);

  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(1);
  return (
    <div className="user-card">
      <h1>Count = {count}</h1>
      <h1>Count2 = {count2}</h1>
      <h2>{props.name}</h2>
      <h3>Location: Nepal</h3>
      <h4>Contact: here</h4>
    </div>
  );
};

export default User;
