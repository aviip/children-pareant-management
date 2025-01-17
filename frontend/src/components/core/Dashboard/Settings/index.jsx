import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"

export default function Settings() {
  return (
    <>
      <h1 className="mb-4 text-3xl font-medium text-black">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Delete Account */}
      <DeleteAccount />
    </>
  )
}