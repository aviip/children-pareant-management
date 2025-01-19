import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteProfile } from "../../../../services/oparations/profileAPI"
import Cookies from "js-cookie"

// import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      if (Cookies.get("token")) {
        const token = Cookies.get("token");
        dispatch(deleteProfile(token, navigate))
      }
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <div className="my-4 flex flex-row gap-x-4 rounded-md border-[1px] border-richblue-200 bg-richblue-600 p-3 px-8">
        <div className="flex aspect-square h-12 w-13 items-center justify-center rounded-full bg-lblue">
          <FiTrash2 className="text-2xl text-richblue-500" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-white">
            Delete Account
          </h2>
          <div className="w-3/5 text-pink-5">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Important Information. Deleting your account is
              permanent and will remove all the content associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-blu"
            onClick={handleDeleteAccount}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </>
  )
}