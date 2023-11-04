import { IoArrowBack, IoSettingsSharp } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import DashboardHero from "../../assets/dashboard-hero.svg";
import { useEffect, useState } from "react";
import Popup from "../common/Popup";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, selectAdminLoggged } from "../../slices/adminSlice";
import CreateEventForm from "../features/CreateEventForm";
import {
  createEvent,
  getFinishedEvents,
  getLiveEvent,
  getScheduledEvents,
  selectEventsError,
  selectFinishedEvents,
  selectLiveEvent,
  selectScheduledEvents,
} from "../../slices/eventSlice";
import EventList from "../features/EventList";

const AdminDashboard = () => {
  const adminLogged = useSelector(selectAdminLoggged);
  const [popup, setPopup] = useState(false);
  const [toggleSeach, setToggleSearch] = useState(false);
  const [empty, setEmpty] = useState(true);

  const admin = useSelector(selectAdmin);

  const scheduledEvents = useSelector(selectScheduledEvents);
  const finishedEvents = useSelector(selectFinishedEvents);
  const liveEvent = useSelector(selectLiveEvent);
  const eventsStatus = useSelector(selectEventsError);

  const eventsError = useSelector(selectEventsError);

  const dispatch = useDispatch();

  const currentDate = new Date();
  const formik = useFormik({
    initialValues: {
      eventName: "new event",
      date: currentDate.toISOString().split("T")[0],
      time: "20:00",
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
    onSubmit: ({ eventName, date, time }, { setSubmitting }) => {
      const startDate = date + " " + time + ":00";
      console.log(startDate);
      console.log(eventName);
      dispatch(
        createEvent({
          createEventCredentials: { eventName, startDate },
          setSubmitting,
        }),
      );
    },
  });

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

  // get data of scheduled, finished, and live events
  useEffect(() => {
    dispatch(getScheduledEvents());
    dispatch(getFinishedEvents());
    console.log(admin);
    dispatch(getLiveEvent(admin.adminCode));
  }, [dispatch, admin, adminLogged]);

  // check is there a scheduled,live, or finished events
  useEffect(() => {
    if (
      scheduledEvents.length < 1 &&
      finishedEvents.length < 1 &&
      liveEvent === null
    ) {
      console.log("it is empty");
      setEmpty(true);
    } else {
      console.log("it is not empty");
      setEmpty(false);
    }
  }, [scheduledEvents, liveEvent, finishedEvents]);

  return adminLogged ? (
    <div className="min-h-screen w-full bg-mainBackground">
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
        {eventsError && (
          <p className="mt-4 text-center text-lg text-red-500">
            Failed to retrieve events data
          </p>
        )}
        {empty && eventsStatus === "idle" && (
          <div className="mx-auto mt-8 w-4/5 max-w-2xl">
            <img
              className="w-full"
              src={DashboardHero}
              alt="dashboard hero img"
            />
          </div>
        )}
        {empty && eventsStatus === "idle" && (
          <button
            onClick={togglePopup}
            className="mx-auto mt-2 flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-white"
          >
            <FiPlus size={30} />
            Create Event
          </button>
        )}
        {empty && eventsStatus === "idle" && popup && (
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
        {liveEvent && <EventList events={[liveEvent]} type={"Live"} />}
        {scheduledEvents.length > 0 && (
          <EventList events={scheduledEvents} type={"Schduled"} />
        )}
        {finishedEvents.length > 0 && (
          <EventList events={finishedEvents} type={"Finished"} />
        )}
      </main>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};
export default AdminDashboard;
