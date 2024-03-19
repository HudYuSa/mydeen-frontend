import { useState, useEffect } from "react";

function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Function to update the screenSize state
    function updateScreenSize() {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Attach the event listener when the component mounts
    window.addEventListener("resize", updateScreenSize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []); // The empty dependency array ensures that this effect runs only once

  return screenSize;
}

export default useScreenSize;
