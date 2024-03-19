import { IoArrowBack, IoSettingsSharp } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import DashboardHero from "../../assets/dashboard-hero.svg";
import { useEffect, useState } from "react";
import Popup, { togglePopup } from "../common/Popup";

import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, selectAdminLoggged } from "../../slices/adminSlice";
import CreateEventForm from "../features/CreateEventForm";
import {
  getFinishedEvents,
  getLiveEvent,
  getScheduledEvents,
  selectEvents,
  resetEvents,
  selectEventsError,
  selectEventsStatus,
  selectScheduledEvents,
  selectFinishedEvents,
  selectLiveEvents,
  selectEventsErrorMessage,
} from "../../slices/eventsSlice";
import EventList from "../features/EventList";
import { useOnMountUnsafe } from "../../hooks/useOnMountUnsafe";
import Loader from "../common/Loader";

const AdminDashboard = () => {
  const [popup, setPopup] = useState(false);
  const [toggleSeach, setToggleSearch] = useState(false);
  const [currentEvent, setCurrentEvent] = useState("");
  const [eventsFetched, setEventsFetched] = useState(false);

  const adminLogged = useSelector(selectAdminLoggged);
  const admin = useSelector(selectAdmin);
  const events = useSelector(selectEvents);
  const eventsStatus = useSelector(selectEventsStatus);
  const eventsError = useSelector(selectEventsError);
  const eventsErrorMessage = useSelector(selectEventsErrorMessage);

  const scheduledEvents = useSelector(selectScheduledEvents);
  const finishedEvents = useSelector(selectFinishedEvents);
  const liveEvents = useSelector(selectLiveEvents);

  const dispatch = useDispatch();

  useOnMountUnsafe(() => {
    // if (events.length < 1) {
    dispatch(resetEvents());
    dispatch(getScheduledEvents());
    dispatch(getFinishedEvents());
    dispatch(getLiveEvent(admin.adminCode));
    // }
  });

  useEffect(() => {
    setPopup(false);
  }, [events]);

  useEffect(() => {
    if (eventsStatus === "success" && !eventsError) {
      setEventsFetched(true);
    }
  }, [eventsFetched, eventsStatus, events, eventsError]);

  const handleToggleSearch = () => {
    setToggleSearch((prev) => !prev);
  };

  const handleSearch = (e) => {
    console.log(
      "🚀 |~~| file: AdminDashboard.jsx:73 |~~| e.target.value:",
      e.target.value,
    );
  };

  return adminLogged ? (
    eventsStatus === "pending" && !eventsFetched ? (
      <Loader />
    ) : (
      eventsFetched && (
        <div
          className={`min-h-screen w-full ${
            events.length > 0 ? "bg-mainBackground" : "bg-white"
          }`}
        >
          <header>
            <nav className="flex items-center justify-between bg-primary p-4 text-white">
              {!toggleSeach && (
                <>
                  <Link to={"/admin/setting"}>
                    <IoSettingsSharp size={20} />
                  </Link>

                  <h1 className="text-xl">Events</h1>

                  <button onClick={handleToggleSearch}>
                    <HiMagnifyingGlass size={20} />
                  </button>
                </>
              )}
              {toggleSeach && (
                <>
                  <button onClick={handleToggleSearch}>
                    <IoArrowBack size={20} />
                  </button>

                  <input
                    onChange={handleSearch}
                    className="text-md flex-grow bg-transparent px-2 text-gray-200 focus:outline-none"
                    type="text"
                    placeholder="Search"
                  />
                </>
              )}
            </nav>
          </header>

          <main className="pb-28">
            {events.length < 1 && eventsStatus === "success" && (
              <>
                <div className="mx-auto mt-8 w-4/5 max-w-2xl">
                  <img
                    className="w-full"
                    src={DashboardHero}
                    alt="dashboard hero img"
                  />
                </div>

                <button
                  onClick={() => togglePopup(setPopup)}
                  className="mx-auto mt-2 flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-white"
                >
                  <FiPlus size={30} />
                  Create Event
                </button>
              </>
            )}

            {liveEvents.length > 0 && (
              <EventList
                events={liveEvents}
                type={"Live"}
                currentEvent={currentEvent}
                setCurrentEvent={setCurrentEvent}
              />
            )}
            {scheduledEvents.length > 0 && (
              <EventList
                events={scheduledEvents}
                type={"Schduled"}
                currentEvent={currentEvent}
                setCurrentEvent={setCurrentEvent}
              />
            )}
            {finishedEvents.length > 0 && (
              <EventList
                events={finishedEvents}
                type={"Finished"}
                currentEvent={currentEvent}
                setCurrentEvent={setCurrentEvent}
              />
            )}

            {eventsError && (
              <div className="absolute bottom-2 left-2">
                <p className="text-red-500">{eventsErrorMessage}</p>
              </div>
            )}

            {/* fixed add  event button */}
            {events.length > 0 && (
              <div className="fixed bottom-8 right-8 z-10 rounded-full shadow-xl">
                <button
                  onClick={() => togglePopup(setPopup)}
                  className="rounded-full bg-green-500 p-4"
                >
                  <AiOutlinePlus
                    className="text-2xl font-extrabold text-white"
                    size={20}
                    strokeWidth={50}
                  />
                </button>
              </div>
            )}
          </main>

          <Popup
            content={
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className=" w-full max-w-xl rounded-lg bg-white p-4"
              >
                <CreateEventForm popup={popup} />
              </div>
            }
            popup={popup}
            setPopup={setPopup}
          />
        </div>
      )
    )
  ) : (
    <Navigate to={"/"} />
  );
};
export default AdminDashboard;
