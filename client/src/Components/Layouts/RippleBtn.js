import React, { useState } from "react";
function Button({ className }) {
    const [ripple, setRipple] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    const handleClick = (e) => {
        setRipple(true);
        setCoords({
            x: e.clientX - e.target.offsetLeft,
            y: e.clientY - e.target.offsetTop,
        });
        setTimeout(() => {
            setRipple(false);
        }, 600);
    };

    return (
        <button
            className={`relative rounded overflow-hidden shadow ${className}`}
            onClick={handleClick}
        >
            Button text
            {ripple && (
                <span
                    className="ripple absolute bg-white rounded-full"
                    style={{
                        left: `${coords.x}px`,
                        top: `${coords.y}px`,
                    }}
                />
            )}
        </button>
    );
}

export default Button;
