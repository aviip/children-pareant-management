import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../services/oparations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-7 flex w-10/12 flex-col gap-y-3"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.675rem] leading-[0.775rem] text-richblue-500">
          Email<sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="bg-blue-5 text-richblue-600 py-[0.30rem] px-3 rounded-md w-full"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.675rem] leading-[0.775rem] text-richblue-500">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="bg-blue-5 text-richblue-600 py-[0.30rem] px-3 rounded-md w-full !pr-10"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[22px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={22} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="ml-auto mt-1 max-w-max text-xs text-blue-300">
            Forgot Password?
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-4 rounded-[8px] bg-blu px-[12px] py-[8px] font-medium text-richblue-5"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm