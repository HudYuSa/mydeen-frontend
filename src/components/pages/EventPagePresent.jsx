import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getEvent,
  selectEventByEventCode,
  selectEventsError,
  selectEventsErrorMessage,
  selectEventsStatus,
} from "../../slices/eventsSlice";
import { motion } from "framer-motion";
import { BiComment } from "react-icons/bi";
import { FaChevronDown, FaRegComment } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { QRCodeSVG } from "qrcode.react";
import { handleDownloadQr } from "../../utils/qrCode";

const EventPagePresent = () => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("Popular");

  const qrCodeRef = useRef(null);

  const { eventCode } = useParams();

  const event = useSelector((state) =>
    selectEventByEventCode(state, eventCode),
  );
  const eventsStatus = useSelector(selectEventsStatus);
  const eventsError = useSelector(selectEventsError);
  const eventsErrorMessage = useSelector(selectEventsErrorMessage);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!event) {
      dispatch(getEvent(eventCode));
    }
  }, [event, eventCode, dispatch]);

  useEffect(() => {
    if (eventsError) {
      setShowErrorMessage(true);
      const timer = setTimeout(() => {
        setShowErrorMessage(false);
      }, 2000); // 3000 milliseconds (3 seconds)
      return () => clearTimeout(timer); // Clear the timer when the component unmounts
    }
  }, [eventsError, eventsStatus]);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const filters = ["Popular", "Terbaru", "Terlama", "Starred"];
  const filterComponents = filters.map((f, idx) => {
    return (
      <li
        key={idx}
        className={`flex justify-between py-2 ${
          f !== filter ? "cursor-pointer" : null
        }`}
      >
        <p
          className={`text-xl ${
            filter === f ? "cursor-default font-bold" : null
          }`}
        >
          {f}
        </p>
        {filter === f && <AiOutlineCheck size={20} strokeWidth={50} />}
      </li>
    );
  });

  return (
    <div className="flex min-h-screen w-full flex-col bg-primary">
      <header>
        <div className="flex items-center justify-between p-4 text-white">
          <div className="flex items-center gap-2">
            <BiComment size={25} />
            <h1 className="text-xl font-bold tracking-wide">Q&A</h1>
          </div>
          <div className="flex items-center gap-4">
            <div
              onClick={toggleFilter}
              className="flex cursor-pointer items-center gap-1 rounded-md p-1 px-2 transition-all duration-500 hover:bg-primarySoft"
            >
              <p className="text-lg">Popular</p>
              <FaChevronDown size={25} />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xl">3</p>
              <FaRegComment size={25} />
            </div>
          </div>
        </div>
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

        {event &&
        event.status !== "finished" &&
        event.status !== "scheduled" ? (
          <div className="flex flex-grow flex-col items-center justify-center gap-4">
            <div
              onClick={() => handleDownloadQr(qrCodeRef)}
              className="mx-auto cursor-pointer rounded-md bg-white p-4"
            >
              <div ref={qrCodeRef}>
                <QRCodeSVG value="https://www.youtube.com" size={250} />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">
                {`bergabung di mydeen.com #${event.eventCode}`}
              </h2>
            </div>
          </div>
        ) : event && event.status === "finished" ? (
          <div>
            <h2 className="text-2xl font-bold text-white">
              Your event is finished
            </h2>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-white">
              Your event is inactive
            </h2>
          </div>
        )}
      </main>
      {showFilter && (
        <div
          onClick={toggleFilter}
          className="fixed bottom-0 left-0 right-0 top-0  z-10 bg-black bg-opacity-20"
        >
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white px-8 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="py-4 text-grayed">Display Options</h3>
            <ul className="flex flex-col divide-y">{filterComponents}</ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default EventPagePresent;
