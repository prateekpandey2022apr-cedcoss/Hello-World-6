import logo from "./logo.svg";
import "@cedcommerce/ounce-ui/dist/index.css";
import Otp from "./Components/Otp/Otp";
import Search from "./Components/Search/Search";
import Pros from "./Components/Pros/Pros";
import Sidebar from "./Components/Sidebar/Sidebar";

function App() {
  const email = "abc@mail.com";

  return (
    <div>
      {/* <Otp
        otpLength={4}
        timeout={5}
        allowedChars="alphanum"
        message={`An email with an OTP has been sent to ${email}.`}
        attempts={6}
        submitOnEnter={false}
      /> */}
      {/* <Search /> */}
      {/* <Sidebar /> */}
      <Pros />
    </div>
  );
}

export default App;
