import React from "react";
import "./RaddomOTP.css";

const RandomOTP = (props) => {
  const { otpChars } = props;
  function generateRadomOTP(length = 4) {
    const acceptableChars = "0123456789";

    let otpString = "";

    for (let index = 0; index < length; index++) {
      otpString += Math.floor(Math.random() * acceptableChars.length);
    }

    return otpString;
  }

  return <div className="random-otp">{generateRadomOTP(otpChars)}</div>;
};

export default RandomOTP;
