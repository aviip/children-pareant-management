import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { parentEndpoints } from "../api"
import Cookies from 'js-cookie';



const {
    ADD_CHILD_UNDER_ME,
    GET_MOBILE_USAGE,
    FETCH_CHILDREN_INTEREST_DATA,
    INSERT_CHILDREN_INTEREST,
} = parentEndpoints

export function fetchChildrenInterestData(fromData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            console.log("interest api calling.....")
            const platform = "web"
            const payload = {
                ...fromData,
                childrenId: "672df6b26045c53f2271c587",
                platform: "web",
            };
            // fromData = { ...fromData, "childrenId": "672df6b26045c53f2271c587", platform: platform }
            const response = await apiConnector("POST", INSERT_CHILDREN_INTEREST, 
                payload
            )

            console.log("FORM INTEREST INSERT RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success(response?.data?.message)

        } catch (error) {
            console.log("FORM INTEREST INSERT ERROR............", error)
            toast.error("Interest Insert updation failed!")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}



// export function fetchChildrenInterestData() {
//     return async (dispatch) => {
//         const toastId = toast.loading("Loading...")
//         dispatch(setLoading(true))
//         try {

//             const params = {
//                 childrenId: "672df6b26045c53f2271c587",
//             };

//             const response = await apiConnector("GET", INSERT_CHILDREN_INTEREST, null, null,params);

//             console.log("FETCH CHILDREN INTEREST RESPONSE............", response)

//             if (!response.data.success) {
//                 throw new Error(response.data.message)
//             }

//             toast.success(response?.data?.message)

//         } catch (error) {
//             console.log("FORM INTEREST INSERT ERROR............", error)
//             toast.error("Fetching Interest Response Error")
//         }
//         dispatch(setLoading(false))
//         toast.dismiss(toastId)
//     }
// }