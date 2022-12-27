import logo from "./logo.svg";
import "./App.css";
import Otp from "./Components/Otp/Otp";
import RandomOTP from "./Components/RandomOTP/RandomOTP";

function App() {
  const otpLength = 5;
  const email = "abc@mail.com";

  return (
    <div className="page">
      <Otp
        otpFromServer
        otpLength={otpLength}
        timeout={5}
        message={`An email with an OTP has been sent to ${email}.`}
        attempts={4}
      />
    </div>
  );
}

export default App;
