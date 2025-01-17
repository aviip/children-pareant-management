import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, image, formType }) {
//const { loading } = useSelector((state) => state.auth)
  const loading=false
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] w-10/12 mx-auto place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-8 py-4 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-blue-800">
              {title}
            </h1>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative mx-auto w-11/12 max-w-[540px] md:mx-0">
            <img
              src={image}
              alt="Students"
              width={798}
              height={764}
              loading="lazy"
              className="absolute top-[0px] right-4 z-10"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template