import { AiOutlineMenu } from "react-icons/ai"
import { Link, matchPath, useLocation } from "react-router-dom"
import ProfileDropdown from "../core/ProfileDropDown"
import logo from "../../assets/Images/lgo.png"
import { useSelector } from "react-redux"

function Navbar() {
  const location = useLocation()
  const token = useSelector((state) => state.auth.token)
  // const token=null
  return (
    <div
      className={`flex h-fit items-center justify-center border-b-[1px] border-b-richblue-25 bg-blu transition-all duration-200`}
    >
      <div className="flex w-8/12 max-w-maxContent items-center justify-between">
        <Link to="/">
        <img src={logo} alt="Logo" className="w-36 py-1 h-12"/>
        </Link>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {token === null && (
            <Link to="/login">
              <button className="rounded-[5px] border border-blu bg-richblue-5 px-[17px] py-[3px] text-richblue-700">
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[5px] border border-blu bg-richblue-5 px-[17px] py-[3px] text-richblue-700">
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  )
}

export default Navbar
