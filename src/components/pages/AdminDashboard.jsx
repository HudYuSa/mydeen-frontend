import { IoArrowBack, IoSettingsSharp } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import DashboardHero from "../../assets/dashboard-hero.svg";
import { useEffect, useState } from "react";
import Popup from "../common/Popup";

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
} from "../../slices/eventSlice";
import EventList from "../features/EventList";
import { useOnMountUnsafe } from "../../hooks/useOnMountUnsafe";
import Loader from "../common/Loader";

const AdminDashboard = () => {
  const adminLogged = useSelector(selectAdminLoggged);
  const [popup, setPopup] = useState(false);
  const [toggleSeach, setToggleSearch] = useState(false);
  const [popover, setPopover] = useState(false);
  const [currentEvent, setCurrentEvent] = useState("");
  const [eventsFetched, setEventsFetched] = useState(false);

  const admin = useSelector(selectAdmin);
  const events = useSelector(selectEvents);
  const eventsStatus = useSelector(selectEventsStatus);
  const eventsError = useSelector(selectEventsError);
  const eventsErrorMessage = useSelector(selectEventsErrorMessage);

  const scheduledEvents = useSelector(selectScheduledEvents);
  const finishedEvents = useSelector(selectFinishedEvents);
  const liveEvents = useSelector(selectLiveEvents);

  const dispatch = useDispatch();

  const togglePopup = () => {
    setPopup((prev) => {
      return !prev;
    });
  };

  const togglePopover = () => {
    setPopover((prev) => !prev);
    setCurrentEvent("");
  };

  const handleToggleSearch = () => {
    setToggleSearch((prev) => !prev);
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
  };

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

          <main className="mb-28">
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
                  onClick={togglePopup}
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
                setPopover={setPopover}
                togglePopover={togglePopover}
              />
            )}
            {scheduledEvents.length > 0 && (
              <EventList
                events={scheduledEvents}
                type={"Schduled"}
                currentEvent={currentEvent}
                setCurrentEvent={setCurrentEvent}
                setPopover={setPopover}
                togglePopover={togglePopover}
              />
            )}
            {finishedEvents.length > 0 && (
              <EventList
                events={finishedEvents}
                type={"Finished"}
                currentEvent={currentEvent}
                setCurrentEvent={setCurrentEvent}
                setPopover={setPopover}
                togglePopover={togglePopover}
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
                  onClick={togglePopup}
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
            togglePopup={togglePopup}
          />

          {popover && (
            <div
              onClick={togglePopover}
              className="fixed bottom-0 left-0 right-0  top-0 z-10 opacity-0"
            ></div>
          )}
        </div>
      )
    )
  ) : (
    <Navigate to={"/"} />
  );
};
export default AdminDashboard;
