import { fi } from "date-fns/locale";
import React, { useEffect, useRef, useState } from "react";

const Otp2 = () => {
  const [inputState, setInputState] = useState({});
  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  // useEffect(() => {
  //   document.addEventListener("keydown", (event) => {
  //     //   debugger;
  //     if (event.key === "Backspace") {
  //       console.log("useff");
  //       inputRef.current[0].select();
  //     }
  //   });
  // }, []);

  function backward(idx) {
    // console.log("back");
    console.log(idx);
    // debugger;
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
                maxLength={1}
                ref={(el) => (inputRef.current[idx] = el)}
                onChange={(event) => {
                  // debugger;
                  console.log("onchange");
                  console.log(event);
                  if (/^\d+$/.test(event.target.value)) {
                    setInputState({ ...inputState, [idx]: event.target.value });
                    if (idx !== 3) {
                      inputRef.current[idx + 1].focus();
                    }
                  }
                }}
                // onKeyDown={(event) => {
                //   console.log(event.keyCode);
                //   if (event.keyCode === 8) {
                //     console.log(event.keyCode);
                //     // debugger;
                //     // event.nativeEvent.stopImmediatePropagation();
                //     // inputRef.current[idx].focus();
                //     // console.log("!!");
                //     // debugger;
                //     backward(idx);
                //   }
                // }}
                value={inputState[idx] ?? ""}
              ></input>
            </span>
          );
        })}
    </div>
  );
};

export default Otp2;
