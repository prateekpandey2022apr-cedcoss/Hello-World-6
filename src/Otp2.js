import { fi } from "date-fns/locale";
import React, { useEffect, useRef, useState } from "react";

const Otp2 = () => {
  const [inputState, setInputState] = useState({});
  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  function forward(idx, event) {
    console.log("forward");
    setInputState({ ...inputState, [idx]: event.target.value });
    if (idx !== 3) {
      inputRef.current[idx + 1].focus();
    }
  }

  function backward(idx) {
    console.log(idx);
    let tempInputState = inputState;
    tempInputState = { ...tempInputState, [idx]: "" };
    setInputState({ ...tempInputState });
    if (idx !== 0) {
      inputRef.current[idx - 1].focus();
      inputRef.current[idx - 1].select();
    }
  }

  return (
    <div>
      {Array(4)
        .fill(0)
        .map((item, idx) => {
          return (
            <span key={idx}>
              <input
                ref={(el) => (inputRef.current[idx] = el)}
                onChange={(event) => {
                  console.log("onchange");
                  if (/^\d+$/.test(event.target.value)) {
                    forward(idx, event);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace") {
                    event.nativeEvent.preventDefault();
                    console.log("onbackspace");
                    backward(idx);
                  }
                }}
                value={inputState[idx] ?? ""}
              ></input>
            </span>
          );
        })}
    </div>
  );
};

export default Otp2;
