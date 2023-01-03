import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Otp.css";

const Otp = (props) => {
  const { otpLength, timeout, message, attempts, allowedChars, submitOn } =
    props;

  // to store user inputs
  const [otpInput, setOtpInput] = useState({});

  // to store timeout in seconds
  const [otpTimeout, setOtpTimeout] = useState(resetTimer());

  // by defaults to 4 attempts are allowed
  const [totalAttempts, setTotalAttempts] = useState(attempts ?? 4);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [generatedOTP, setGeneratedOTP] = useState("");

  // to handle focus of input boxes
  const inputRef = useRef([]);

  useEffect(() => {
    // move focus to the first input box
    focusFirstInput();
    setGeneratedOTP(generateRadomOTP(otpLength));
  }, []);

  useEffect(() => {
    const int = setInterval(() => {
      setOtpTimeout((otpTimeout) => otpTimeout - 1);
    }, 1000);

    if (otpTimeout < 1) {
      clearInterval(int);
      // console.log("cleared");
    }

    return () => {
      clearInterval(int);
      // console.log("cleared");
    };
  }, [otpTimeout]);

  const allFilledTrueCheck = isAllInputsFilled() === true;

  useEffect(() => {
    if (submitOn === "filled") {
      if (allFilledTrueCheck) {
        // console.log("filled");
        disableInputs();
        setIsLoading(true);
        submit();
      }
    }
  }, [allFilledTrueCheck]);

  function submit() {
    // console.log("submitting");
    setTimeout(() => {
      const otpInputStr = Object.values(otpInput).join("");
      setIsSubmitted(true);
      if (otpInputStr === generatedOTP) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
        enableInputs();
      }

      setIsLoading(false);
      clearInputField();
      focusFirstInput();
      setTotalAttempts((prevState) => prevState + 1);
    }, 2000);
  }

  function generateRadomOTP(length = 4) {
    const acceptableChars = "0123456789";

    let otpString = "";

    for (let index = 0; index < length; index++) {
      otpString += Math.floor(Math.random() * acceptableChars.length);
    }

    return otpString;
  }

  function clearInputField() {
    setOtpInput({});
  }

  function getRemainingTime(seconds) {
    // get minutes
    const min = Math.floor(seconds / 60);
    // get seconds
    const secs = seconds - min * 60;

    return `${min}:${String(secs).padStart(2, 0)}`;
  }

  function isAllInputsFilled() {
    return (
      Object.values(otpInput).filter((val) => val !== "").length === otpLength
    );
  }

  function focusFirstInput() {
    inputRef.current[0].focus();
  }

  function resetTimer() {
    return timeout;
  }

  function paste(str) {
    const temp = {};
    str.split("").forEach((char, idx) => {
      temp[idx] = char;
    });

    setOtpInput(temp);
  }

  function forward(idx, event) {
    // to handle when a input box is already filled and user
    // tries to paste the OTP
    if (event.target.value.length === otpLength + 1) {
      paste(event.target.value.slice(1));
      return;
    }

    if (event.target.value.length === otpLength) {
      paste(event.target.value);
      return;
    }

    const input = event.target.value;
    let tempOtpInput = otpInput;

    if (input.length === 1) {
      tempOtpInput = { ...tempOtpInput, [idx]: input };
      if (idx !== otpLength - 1) {
        inputRef.current[idx + 1].focus();
      }
    }

    if (input.length === 2 && otpInput[idx]) {
      tempOtpInput = {
        ...tempOtpInput,
        [idx]: input.replace(otpInput[idx], ""),
      };

      if (idx !== otpLength - 1) {
        inputRef.current[idx + 1].focus();
      }
    }

    setOtpInput({ ...tempOtpInput });
  }

  function backward(idx, event) {
    event.nativeEvent.preventDefault();
    let tempOtpInput = otpInput;
    tempOtpInput = { ...tempOtpInput, [idx]: "" };
    setOtpInput({ ...tempOtpInput });

    if (idx !== 0) {
      inputRef.current[idx - 1].focus();
      inputRef.current[idx - 1].select();
    }
  }

  function charFilter(chars, value) {
    switch (chars) {
      case "digit":
        return /^\d+$/.test(value);
      case "alpha":
        return /^[a-z]+$/i.test(value);
      case "alphanum":
        return /^[a-z\d]+$/i.test(value);
      default:
        throw Error(
          `Invalid character set "${chars}". Available options: digit, alpha and alphanum`
        );
    }
  }

  function disableInputs() {
    inputRef.current.map((item) => (item.disabled = true));
  }

  function enableInputs() {
    inputRef.current.map((item) => (item.disabled = false));
  }

  return (
    <div className="otp_container">
      <div className="opt_success">{isSuccess}</div>
      <div className="otp_message">{message + " (" + generatedOTP + ") "}</div>
      <div className="otp_message">Enter your code here:</div>
      <div className="input_list">
        {Array(otpLength)
          .fill(0)
          .map((item, idx) => {
            return (
              <span key={idx}>
                <input
                  ref={(el) => (inputRef.current[idx] = el)}
                  // maxLength={1}
                  onChange={(event) => {
                    // console.log("onchange");
                    setIsSubmitted(false);
                    if (charFilter(allowedChars, event.target.value)) {
                      forward(idx, event);
                    }
                  }}
                  onKeyDown={(event) => {
                    // console.log("onkeydown");
                    if (event.key === "Backspace") {
                      backward(idx, event);
                    }
                    if (isAllInputsFilled()) {
                      if (event.key === "Enter") {
                        setIsLoading(true);
                        submit();
                      }
                    }
                  }}
                  value={otpInput[idx] ?? ""}
                ></input>
              </span>
            );
          })}
      </div>
      <div className="timer">
        {totalAttempts !== 0 && (
          <>
            {otpTimeout === 0 ? (
              <>
                <a
                  href="#/"
                  onClick={() => {
                    if (totalAttempts > 0) {
                      setGeneratedOTP(generateRadomOTP(otpLength));
                      setOtpTimeout(resetTimer());
                      setTotalAttempts(totalAttempts - 1);
                      focusFirstInput();
                    }
                  }}
                >
                  RESEND CODE
                </a>
                <span> ({totalAttempts} Attemps left)</span>
              </>
            ) : (
              <span>
                RESEND OTP IN {getRemainingTime(otpTimeout)} ({totalAttempts}{" "}
                Attemps left)
              </span>
            )}
          </>
        )}

        {totalAttempts === 0 && (
          <>
            <a href="#/" className={`${totalAttempts === 0 ? "disabled" : ""}`}>
              RESEND CODE
            </a>
            <span> ({totalAttempts} Attemps left)</span>
          </>
        )}
      </div>
      <div>
        <button
          disabled={!allFilledTrueCheck}
          onClick={() => {
            setIsLoading(true);
            submit();
          }}
        >
          {isLoading ? (
            <>
              <i className="fa-solid fa-rotate fa-spin"></i>
            </>
          ) : (
            <>Continue</>
          )}
        </button>
      </div>
      <div className="otp_error">
        {isSuccess === false && isSubmitted && (
          <>Incorrect OTP entered. Please enter again. </>
        )}
      </div>
      <div className="otp_success">
        {isSuccess && isSubmitted && (
          <>OTP Correct. Redirecting to Dashboard. </>
        )}
      </div>
    </div>
  );
};

export default Otp;
