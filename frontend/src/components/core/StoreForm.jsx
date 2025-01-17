import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../components/Common/IconBtn"

const nums = ["Over 10000", "Over 20000", "Over 50000", "Over 100000", "Over 200000"]

function StoreDetailsEntry() {
    const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
    //   dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <div className="mx-auto w-10/12 my-auto">
        <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="mx-auto mb-4 my-auto flex flex-col gap-y-6 rounded-md border-[1px] border-richblue-500 bg-llblue p-3 px-8">
          <h2 className="text-2xl font-bold text-richblue-900">
            Enter Store Details
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="Name" className="text-richblack-700">
                Name of Store
              </label>
              <input
                type="text"
                name="Name"
                id="Name"
                placeholder="Enter name of store"
                className="bg-blue-25 text-black py-2 px-3 rounded-md"
                {...register("Name", { required: true })}
                defaultValue={""}
              />
              {errors.Name && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Store's name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="location" className="text-richblack-700">
                Store Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Enter address of the store"
                className="bg-blue-25 text-black py-2 px-3 rounded-md"
                {...register("location", { required: true })}
                defaultValue={""}
              />
              {errors.location && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Store's Address.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="text-richblack-700">
              Store Establishment Date
              </label>
              <input
                type="date"
                name="dateOfEstablishment"
                id="dateOfEstablishment"
                className="bg-blue-25 text-black py-2 px-3 rounded-md"
                {...register("dateOfEstablishment", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Establishment.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Establishment cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfEstablishment}
              />
              {errors.dateOfEstablishment && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfEstablishment.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="footfall" className="text-richblack-700">
                Footfall of Store
              </label>
              <select
                type="text"
                name="footfall"
                id="footfall"
                className="bg-blue-25 text-black py-3 px-3 rounded-md"
                {...register("footfall", { required: true })}
              >
                {nums.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.footfall && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your store's footfall
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="area" className="text-richblack-700">
                Area in square feet
              </label>
              <input
                type="text"
                name="area"
                id="area"
                placeholder="Enter Area occupied by the store"
                className="bg-blue-25 text-black py-2 px-3 rounded-md"
                {...register("area", {
                  required: {
                    value: true,
                    message: "Please enter area of the store.",
                  },
                  maxLength: { value: 42, message: "Invalid Id Number" },
                  minLength: { value: 10, message: "Invalid Id Number" },
                })}
              />
              {errors.area && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.area.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="text-richblack-700">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="bg-blue-25 text-black py-2 px-3 rounded-md"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-blu py-2 px-5 font-semibold text-white"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
    </div>
  )
}

export default StoreDetailsEntry;