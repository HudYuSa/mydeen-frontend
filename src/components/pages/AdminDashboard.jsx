import { IoArrowBack, IoSettingsSharp } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import DashboardHero from "../../assets/dashboard-hero.svg";
import { useEffect, useState } from "react";
import Popup from "../features/Popup";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { selectAdminLoggged } from "../../slices/adminSlice";
import CreateEventForm from "../features/CreateEventForm";

const AdminDashboard = () => {
  const adminLogged = useSelector(selectAdminLoggged);
  const [popup, setPopup] = useState(false);
  const [toggleSeach, setToggleSearch] = useState(false);

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentDate = new Date();

  console.log(currentDate.toISOString());

  const formik = useFormik({
    initialValues: {
      eventName: "",
      date: currentDate.toISOString().split("T")[0],
      time: "",
    },
    validationSchema: Yup.object({
      eventName: Yup.string().required("Event name is required"),
      date: Yup.date().required("Date is required"),
      time: Yup.string()
        .matches(
          /^(?:[01]\d|2[0-3]):[0-5]\d$/,
          'Time must be in the "HH:mm" format (24-hour)',
        )
        .required("Time is required"),
    }),
    // onSubmit: (signinCredentials, { setSubmitting }) => {
    // dispatch(signin({ signinCredentials, setSubmitting }));
    // },
  });

  useEffect(() => {
    if (!adminLogged) {
      navigate("/");
    }
  }, [adminLogged, navigate]);

  const togglePopup = () => {
    setPopup((prev) => {
      return !prev;
    });
    formik.resetForm();
  };

  const handleToggleSearch = () => {
    setToggleSearch((prev) => !prev);
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
  };

  return (
    adminLogged && (
      <>
        <header>
          {!toggleSeach && (
            <nav className="flex items-center justify-between bg-primary p-4 text-white">
              <Link to={"/admin/setting"}>
                <IoSettingsSharp size={20} />
              </Link>

              <h1 className="text-xl">Events</h1>

              <button onClick={handleToggleSearch}>
                <HiMagnifyingGlass size={20} />
              </button>
            </nav>
          )}
          {toggleSeach && (
            <nav className="flex items-center justify-between bg-primary p-4 text-white">
              <button onClick={handleToggleSearch}>
                <IoArrowBack size={20} />
              </button>

              <input
                onChange={handleSearch}
                className="text-md flex-grow bg-transparent px-2 text-gray-200 focus:outline-none"
                type="text"
                placeholder="Search"
              />
            </nav>
          )}
        </header>
        <main>
          <div className="mx-auto mt-8 w-4/5 max-w-2xl">
            <img
              className="w-full"
              src={DashboardHero}
              alt="dashboard hero img"
            />
          </div>

          <button
            onClick={togglePopup}
            className="mx-auto mt-2 flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-white"
          >
            <FiPlus size={30} />
            Create Event
          </button>
          {popup && (
            <Popup
              content={
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className=" w-full max-w-xl rounded-lg bg-white p-4"
                >
                  <CreateEventForm formik={formik} />
                </div>
              }
              togglePopup={togglePopup}
            />
          )}
        </main>
      </>
    )
  );
};
export default AdminDashboard;
