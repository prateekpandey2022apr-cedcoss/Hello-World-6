import logo from "./logo.svg";
import "./App.css";
import Otp from "./Components/Otp/Otp";
import RandomOTP from "./Components/RandomOTP/RandomOTP";

// add timer - x
// genotp - x
// accept only numbers
//

function App() {
  const otpChars = 5;
  const email = "abc@mail.com";

  return (
    <div className="page">
      {/* <RandomOTP otpChars={otpChars} /> */}
      <Otp
        otpFromServer
        otpChars={otpChars}
        timeout={5}
        message={`An email with an OTP has been sent to ${email}.`}
        attempts={4}
      />
    </div>
  );
}

export default App;
