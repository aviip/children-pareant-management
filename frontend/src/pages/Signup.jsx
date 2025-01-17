import signupImg from "../assets/Images/signup.png"
import Template from "../components/core/Template"

function Signup() {
  return (
    <Template
      title="Create Your Parental Account"
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup;