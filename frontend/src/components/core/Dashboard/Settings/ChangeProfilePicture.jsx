import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import iam from "../../../../assets/Images/profile.jpg"
// import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../Common/IconBtn"
import { useNavigate } from "react-router-dom";
import { updateUserProfileImage } from "../../../../services/oparations/profileAPI";
import Cookies from "js-cookie";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      console.log("uploading...")
      setLoading(true)
      if (Cookies.get("token")) {
        const token = Cookies.get("token");
        dispatch(updateUserProfileImage(token, navigate, imageFile)).then(
          () => {
            setLoading(false);
          }
        );
      }
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])
  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblue-500 bg-llblue p-3 px-8 text-richblue-900">
        <div className="flex items-center gap-x-4">
          <img
            src={previewSource ? previewSource : user?.image ? user?.image : iam}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-blu py-1 px-5 text-white"
              >
                Select
              </button>
              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-lg text-white" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}