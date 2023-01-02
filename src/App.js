import logo from "./logo.svg";
import "./App.css";
import Otp from "./Components/Otp/Otp";
import RandomOTP from "./Components/RandomOTP/RandomOTP";

function App() {
  const otpLength = 4;
  const email = "abc@mail.com";

  return (
    <div className="page">
      <Otp
        otpFromServer
        otpLength={4}
        timeout={5}
        allowedChars="alphanum"
        message={`An email with an OTP has been sent to ${email}.`}
        attempts={2}
      />
    </div>
  );
}

export default App;
