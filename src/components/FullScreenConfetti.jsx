import { useState, useEffect } from "react";
import Confetti from "react-confetti";

const FullScreenConfetti = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    function handleResize(){
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
    />
  )
}

export default FullScreenConfetti
