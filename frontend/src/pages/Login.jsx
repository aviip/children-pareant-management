import loginImg from "../assets/Images/login1.png"
import Template from "../components/core/Template"

function Login() {
  return (
    <Template
      title="Enter your Login Details"
      image={loginImg}
      formType="login"
    />
  )
}

export default Login