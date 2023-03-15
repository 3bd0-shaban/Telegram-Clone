import React, { useState } from "react";
import { motion } from "framer-motion";

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)"
  },
  tap: {
    scale: 0.95
  }
};

const Ripple = ({ duration, color, onComplete }) => {
  const [rippleArray, setRippleArray] = useState([]);

  const addRipple = event => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const x = event.pageX - rippleContainer.x - size / 2;
    const y = event.pageY - rippleContainer.y - size / 2;
    const newRipple = {
      x,
      y,
      size
    };

    setRippleArray([...rippleArray, newRipple]);
  };

  return (
    <div onMouseDown={addRipple}>
      {rippleArray.map((ripple, index) => {
        return (
          <motion.span
            key={"span" + index}
            style={{
              position: "absolute",
              borderRadius: "50%",
              backgroundColor: color,
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size
            }}
            animate={{
              opacity: 0,
              scale: 2
            }}
            transition={{
              duration: duration / 1000,
              ease: "easeOut"
            }}
            onAnimationComplete={() => {
              if (index === rippleArray.length - 1) {
                onComplete();
              }
            }}
          />
        );
      })}
    </div>
  );
};

const Button = ({ children, onClick }) => {
  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      style={{
        border: "none",
        borderRadius: "5px",
        padding: "10px",
        margin: "10px",
        cursor: "pointer",
        backgroundColor: "#1fecf9",
        color: "#fff"
      }}
    >
      {children}
    </motion.button>
  );
};

function RippleEffect() {
  const [isRippleActive, setIsRippleActive] = useState(false);

  const handleRippleComplete = () => {
    setIsRippleActive(false);
  };

  return (
    <div className="App">
      <Button onClick={() => setIsRippleActive(true)}>
        Ripple Effect
        {isRippleActive && (
          <Ripple color={"#1fecf9"} duration={2000} onComplete={handleRippleComplete} />
        )}
      </Button>
    </div>
  );
}

export default RippleEffect;
