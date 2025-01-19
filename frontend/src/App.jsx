import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Common/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import Dashboard from "./pages/Dashboard";
import Analytics from "./components/core/Dashboard/Analytics";
import Cookies from "js-cookie";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import { getUserDetails } from "./services/oparations/profileAPI";
import InterestForm from "./components/core/Dashboard/InterestForm";
import ActivitiesPage from "./components/core/Dashboard/ActivitiesPage";
import RewardsPage from "./components/core/Dashboard/RewardsPage";
import GoalsPage from "./components/core/Dashboard/GoalsPage";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    if (Cookies.get("token")) {
      const token = Cookies.get("token");
      console.log("this is token",token);
      dispatch(getUserDetails(token, navigate));
    }
  }, []);

  return (
    <div className="flex min-h-screen w-screen flex-col bg-white font-inter overflow-y-auto hide-horizontal-scroll ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route element={<Dashboard />}>
          <Route
            path="dashboard/my-profile"
            element={
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/Settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/interest-form"
            element={
              <PrivateRoute>
                <InterestForm />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/interest-form/:childId"
            element={
              <PrivateRoute>
                <InterestForm />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/activities"
            element={
              <PrivateRoute>
                <ActivitiesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/rewards"
            element={
              <PrivateRoute>
                <RewardsPage/>
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/goals"
            element={
              <PrivateRoute>
                <GoalsPage/>
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
