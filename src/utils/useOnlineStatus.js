import { useState, useEffect } from "react";

// Custom hooks have react components, i.e. they can have state and lifecycle methods
const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    window.addEventListener("online", () => {
      setOnlineStatus(true);
    });
    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;
