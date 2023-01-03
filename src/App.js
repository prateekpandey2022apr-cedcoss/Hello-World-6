import logo from "./logo.svg";
import "./App.css";
import Otp from "./Components/Otp/Otp";
// import RandomOTP from "./Components/RandomOTP/RandomOTP";
import Otp2 from "./Otp2";

function App() {
  const email = "abc@mail.com";

  return (
    <div className="page">
      <Otp
        otpLength={4}
        timeout={30}
        allowedChars="digit"
        message={`An email with an OTP has been sent to ${email}.`}
        attempts={2}
        submitOn={"filled"}
      />
    </div>
  );
}

export default App;
