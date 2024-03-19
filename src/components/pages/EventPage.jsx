import { IoArrowBack, IoSettingsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  finishEvent,
  selectEventByEventCode,
  selectEventsError,
  selectEventsErrorMessage,
  selectEventsStatus,
  startEvent,
} from "../../slices/eventsSlice";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { handleDownloadQr } from "../../utils/qrCode";
import Popup from "../common/Popup";

const EventPage = () => {
  const eventsStatus = useSelector(selectEventsStatus);
  const eventsError = useSelector(selectEventsError);
  const eventsErrorMessage = useSelector(selectEventsErrorMessage);

  const qrCodeRef = useRef(null);

  const { eventCode } = useParams();
  const event = useSelector((state) =>
    selectEventByEventCode(state, eventCode),
  );

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [copyToClipboard, setCopyToClipboard] = useState(false);
  const [popup, setPopup] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (eventsError) {
      setShowErrorMessage(true);
      const timer = setTimeout(() => {
        setShowErrorMessage(false);
      }, 2000); // 3000 milliseconds (3 seconds)
      return () => clearTimeout(timer); // Clear the timer when the component unmounts
    }
  }, [eventsError, eventsStatus]);

  const togglePopup = () => {
    setPopup((prev) => {
      return !prev;
    });
  };

  const handleStartEvent = () => {
    dispatch(startEvent({ eventId: event.eventId }));
  };
  const handleFinishEvent = () => {
    dispatch(finishEvent({ eventId: event.eventId }));
    togglePopup();
  };

  const handleCopyLink = () => {
    setCopyToClipboard(true);
    navigator.clipboard.writeText(`localhost:5173/event/${event.eventCode}`);
    const timer = setTimeout(() => {
      setCopyToClipboard(false);
    }, 1000); // 3000 milliseconds (3 seconds)
    return () => clearTimeout(timer); // Clear the timer when the
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-mainBackground">
      <header>
        <nav className="flex items-center justify-between bg-primary p-4 text-white">
          <Link to={"/admin/dashboard"}>
            <IoArrowBack size={20} />
          </Link>

          <h1 className="text-xl">Events</h1>

          <Link to={"settings"}>
            <IoSettingsSharp size={20} />
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-grow flex-col justify-center px-2 py-8 text-center">
        {eventsError && showErrorMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="fixed right-4 top-20 translate-x-0 transform rounded bg-red-500 px-6 py-1"
          >
            <p className="text-white">{eventsErrorMessage}</p>
          </motion.div>
        )}
        {eventsError && !showErrorMessage && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed right-4 top-20 translate-x-0 transform rounded bg-red-500 px-6 py-1"
          >
            <p className="text-white">{eventsErrorMessage}</p>
          </motion.div>
        )}

        {event && event.status !== "finished" ? (
          <div className="flex flex-grow flex-col items-center justify-center">
            <div>
              <h2 className="text-2xl font-bold">
                {event && event.status === "live"
                  ? "Your event is active"
                  : "Your event is inactive"}
              </h2>
              <h3 className="text-lg font-medium text-grayed">
                {event && event.status === "live"
                  ? `Participants can send questions at mydeen.com with ${
                      event && event.eventCode
                    }`
                  : "Begin your event, allowing participants to ask questions."}
              </h3>
            </div>
            {event && event.status === "live" && (
              <div className="flex w-max flex-col items-center justify-center gap-4 py-4">
                <div
                  onClick={() => handleDownloadQr(qrCodeRef)}
                  className="cursor-pointer rounded-md bg-white p-4"
                >
                  <div ref={qrCodeRef}>
                    <QRCodeSVG
                      value={`http://localhost:5173/event/${event.eventCode}`}
                      size={250}
                    />
                  </div>
                </div>
                <button
                  onClick={handleCopyLink}
                  className="w-full rounded-xl border-2 py-2 text-xl font-bold"
                >
                  Link
                </button>
                <Link
                  to={`/event/${event.eventCode}/present`}
                  target="_blank"
                  className="w-full rounded-xl bg-confirm py-2 text-xl font-bold text-white"
                >
                  Present
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold">Your event is finished</h2>
          </div>
        )}

        <Popup
          content={
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className=" w-80 max-w-xl rounded-lg bg-white p-4 text-start"
            >
              <h4 className="mb-2 text-xl font-medium">End Q&A</h4>
              <p className="mb-4 text-sm leading-4 text-gray-700">
                {"Would you like to end the Q&A?"}
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={togglePopup}
                  className="rounded-md border-2 border-grayed px-4 py-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFinishEvent}
                  className="rounded-md bg-red-600 px-4 py-1 text-white"
                >
                  End
                </button>
              </div>
            </div>
          }
          popup={popup}
          togglePopup={togglePopup}
        />

        {copyToClipboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="fixed right-4 top-20 translate-x-0 transform rounded border-2 bg-white px-6 py-1"
          >
            <p>Link copied to clipboard</p>
          </motion.div>
        )}

        {event && event.status === "finished" ? null : event &&
          event.status === "scheduled" ? (
          <button
            onClick={handleStartEvent}
            className="w-full rounded-lg bg-primary py-2 font-bold text-white"
            disabled={eventsError}
          >
            Start Q&A
          </button>
        ) : (
          <button
            onClick={togglePopup}
            className="w-full rounded-lg bg-primary py-2 font-bold text-white"
            disabled={eventsError}
          >
            End Q&A
          </button>
        )}
      </main>
    </div>
  );
};
export default EventPage;
