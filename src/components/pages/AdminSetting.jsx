import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectAdmin,
  selectAdminError,
  selectAdminErrorMessage,
  selectAdminLoggged,
  selectAdminStatus,
  updateAdminUsername,
} from "../../slices/adminSlice";
import { IoArrowBack } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import UpdateAdminUsername from "../features/UpdateAdminUsername";
import Popup, { togglePopup } from "../common/Popup";

const AdminSetting = () => {
  const admin = useSelector(selectAdmin);
  const adminLogged = useSelector(selectAdminLoggged);
  const adminError = useSelector(selectAdminError);
  const adminErrorMessage = useSelector(selectAdminErrorMessage);
  const adminStatus = useSelector(selectAdminStatus);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [updateUsernamePopup, setUpdateUsernamePopup] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggle = () => {
    togglePopup(setUpdateUsernamePopup);
  };

  const updateAdminUsernameFormik = useFormik({
    initialValues: {
      username: admin.username,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
    }),
    onSubmit: ({ username }) => {
      console.log("🚀 |~~| file: AdminSetting.jsx:46 |~~| username:", username);
      dispatch(
        updateAdminUsername({
          username,
          toggle: toggle,
        }),
      );
    },
  });

  useEffect(() => {
    if (!adminLogged) {
      navigate("/");
    }
  }, [adminLogged, navigate]);

  useEffect(() => {
    if (adminError) {
      setShowErrorMessage(true);
      const timer = setTimeout(() => {
        setShowErrorMessage(false);
      }, 2000); // 3000 milliseconds (3 seconds)
      return () => clearTimeout(timer); // Clear the timer when the component unmounts
    }
  }, [adminError, adminStatus]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex min-h-screen flex-col bg-mainBackground">
      <header>
        <nav className="flex items-center justify-between bg-primary p-4 text-white">
          <button>
            <Link to={`/admin/dashboard`}>
              <IoArrowBack size={20} />
            </Link>
          </button>

          <h1 className="flex-grow text-center text-xl">Settings</h1>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-2xl text-center">
        <h2 className="p-4 text-lg text-gray-600">Account information</h2>
        <ul className="border-y-2 bg-white sm:rounded-xl sm:border">
          <li className="ml-4 flex items-center justify-between border-b-2 py-2 pr-2">
            <p>Username</p>{" "}
            <div>
              <button
                onClick={() => togglePopup(setUpdateUsernamePopup)}
                className="flex items-center justify-end gap-2"
              >
                <p>{admin.username}</p>
                <FaChevronRight />
              </button>
            </div>
          </li>
          <li className="ml-4 flex items-center justify-between border-b-2 py-2 pr-2">
            <p>Email</p>{" "}
            <div>
              <Link
                to={"/admin/setting/email"}
                className="flex items-center justify-end gap-2"
              >
                <p>{admin.email}</p>
                <FaChevronRight />
              </Link>
            </div>
          </li>
          <li className="ml-4 flex items-center justify-between py-2 pr-2">
            <p>Password</p>
            <div>
              <Link className="flex items-center justify-end gap-2">
                <FaChevronRight />
              </Link>
            </div>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="mt-4 w-full text-center text-2xl font-bold text-red-500"
        >
          Logout
        </button>
      </main>

      {adminError && showErrorMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="fixed mt-2 w-full max-w-2xl rounded bg-red-500 px-6 py-1"
        >
          <p className="text-white">{adminErrorMessage}</p>
        </motion.div>
      )}
      {adminError && !showErrorMessage && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed mt-2 w-full max-w-2xl rounded bg-red-500 px-6 py-1"
        >
          <p className="text-white">{adminErrorMessage}</p>
        </motion.div>
      )}

      <Popup
        popup={updateUsernamePopup}
        setPopup={setUpdateUsernamePopup}
        content={
          <UpdateAdminUsername
            formik={updateAdminUsernameFormik}
            setUpdateUsernamePopup={setUpdateUsernamePopup}
          />
        }
      />
    </div>
  );
};
export default AdminSetting;
