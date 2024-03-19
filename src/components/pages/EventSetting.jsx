import { IoArrowBack } from "react-icons/io5";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEventByEventCode,
  selectEventsError,
  selectEventsErrorMessage,
  selectEventsStatus,
  updateEventDate,
  updateEventMaxQuestionLength,
  updateEventModeration,
  updateEventName,
  updateMaxQuestions,
} from "../../slices/eventsSlice";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { BiCopy, BiDownload } from "react-icons/bi";
import { handleDownloadQr } from "../../utils/qrCode";
import { QRCodeSVG } from "qrcode.react";
import SwitchButton from "../common/SwitchButton";
import Popup, { togglePopup } from "../common/Popup";
import { formatTime } from "../../utils/time";
import { useFormik } from "formik";
import { DeleteEvent } from "../features/DeleteEvent";
import UpdateEventName from "../features/UpdateEventName";
import { UpdateEventDate } from "../features/UpdateEventDate";
import * as Yup from "yup";
import { debounce } from "lodash";
import { selectAdminLoggged } from "../../slices/adminSlice";

const EventSetting = () => {
  const { eventCode } = useParams();
  const event = useSelector((state) =>
    selectEventByEventCode(state, eventCode),
  );

  const eventsStatus = useSelector(selectEventsStatus);
  const eventsError = useSelector(selectEventsError);
  const eventsErrorMessage = useSelector(selectEventsErrorMessage);
  const adminLogged = useSelector(selectAdminLoggged);

  const qrCodeRef = useRef(null);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [copyToClipboard, setCopyToClipboard] = useState(false);
  const [moderation, setModeration] = useState(event.moderation);
  const [questionLength, setQuestionLength] = useState(event.maxQuestionLength);
  const [maxQuestions, setMaxQuestions] = useState(event.maxQuestions);
  const [deletePopup, setDeletePopup] = useState(false);
  const [updateNamePopup, setUpdateNamePopup] = useState(false);
  const [updateDatePopup, setUpdateDatePopup] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateEventNameFormik = useFormik({
    initialValues: {
      eventName: event.eventName,
    },
    validationSchema: Yup.object({
      eventName: Yup.string().required("Event name is required"),
    }),
    onSubmit: ({ eventName }) => {
      dispatch(
        updateEventName({
          eventId: event.eventId,
          eventName,
          toggle: () => togglePopup(setUpdateNamePopup),
        }),
      );
    },
  });
  const formattedDate = formatTime(event.startDate).split(" ");
  const updateEventDateFormik = useFormik({
    initialValues: {
      date: formattedDate[0],
      time: formattedDate[1],
    },
    validationSchema: Yup.object({
      date: Yup.date().required("Date is required"),
      time: Yup.string()
        .matches(
          /^(?:[01]\d|2[0-3]):[0-5]\d$/,
          'Time must be in the "HH:mm" format (24-hour)',
        )
        .required("Time is required"),
    }),
    onSubmit: ({ date, time }) => {
      const startDate = date + " " + time + ":00";
      dispatch(
        updateEventDate({
          eventId: event.eventId,
          startDate,
          toggle: () => togglePopup(setUpdateDatePopup),
        }),
      );
    },
  });

  useEffect(() => {
    if (eventsError) {
      setShowErrorMessage(true);
      const timer = setTimeout(() => {
        setShowErrorMessage(false);
      }, 2000); // 3000 milliseconds (3 seconds)
      return () => clearTimeout(timer); // Clear the timer when the component unmounts
    }
  }, [eventsError, eventsStatus]);

  useEffect(() => {
    setModeration(event.moderation);
    setQuestionLength(event.maxQuestionLength);
    setMaxQuestions(event.maxQuestions);
    // UpdateEventDateFormik.resetForm();
    // UpdateEventNameFormik.resetForm();
  }, [event]);

  // if there's no admin logged
  useEffect(() => {
    if (!adminLogged) {
      navigate("/");
    }
  }, [adminLogged, navigate]);

  const handleCopyToClipboard = (text) => {
    setCopyToClipboard(true);
    navigator.clipboard.writeText(text);
    const timer = setTimeout(() => {
      setCopyToClipboard(false);
    }, 1000); // 3000 milliseconds (3 seconds)
    return () => clearTimeout(timer); // Clear the timer when the
  };

  // Debounce the function to be called after 500 milliseconds
  const handleModerationChange = debounce((value) => {
    // Handle switch change logic here
    dispatch(
      updateEventModeration({ eventId: event.eventId, moderation: value }),
    );
  }, 250);

  const handleMaxQuestionLengthChange = debounce((value) => {
    dispatch(
      updateEventMaxQuestionLength({
        eventId: event.eventId,
        maxQuestionLength: value,
      }),
    );
  }, 250);

  const handleMaxQuestionsChange = debounce((value) => {
    dispatch(
      updateMaxQuestions({
        eventId: event.eventId,
        maxQuestions: value,
      }),
    );
  }, 250);

  const maxQuestionLengthButtons = [160, 240, 360, 480].map((l, idx) => {
    return (
      <label key={idx} className="cursor-pointer">
        <input
          type="radio"
          className="sr-only"
          name="radioGroup"
          value={l}
          checked={questionLength === l}
          onChange={() => handleMaxQuestionLengthChange(l)}
        />
        <div
          className={`rounded-full px-4 py-1 text-center sm:mx-2 ${
            questionLength === l
              ? "border-2 border-primary text-primary"
              : "border border-gray-400 text-gray-600"
          }`}
        >
          {l}
        </div>
      </label>
    );
  });

  const maxQuestionsButtons = [1, 3, 5].map((m, idx) => {
    return (
      <label key={idx} className="cursor-pointer">
        <input
          type="radio"
          className="sr-only"
          name="radioGroup"
          value={m}
          checked={maxQuestions === m}
          onChange={() => handleMaxQuestionsChange(m)}
        />
        <div
          className={`rounded-full px-3 py-1 text-center sm:mx-2 ${
            maxQuestions === m
              ? "border-2 border-primary text-primary"
              : "border border-gray-400 text-gray-600"
          }`}
        >
          {m}
        </div>
      </label>
    );
  });

  return (
    <div className="flex min-h-screen w-full flex-col bg-mainBackground">
      <header>
        <nav className="flex items-center justify-between bg-primary p-4 text-white">
          <Link to={`/event/${event.eventCode}`}>
            <IoArrowBack size={20} />
          </Link>

          <h1 className="flex-grow text-center text-xl">Event Settings</h1>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-2xl">
        {eventsError && showErrorMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="fixed mt-2 w-full max-w-2xl rounded bg-red-500 px-6 py-1"
          >
            <p className="text-white">{eventsErrorMessage}</p>
          </motion.div>
        )}
        {eventsError && !showErrorMessage && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed mt-2 w-full max-w-2xl rounded bg-red-500 px-6 py-1"
          >
            <p className="text-white">{eventsErrorMessage}</p>
          </motion.div>
        )}

        <div>
          <h2 className="ml-4 py-4 text-2xl text-grayed sm:m-0">General</h2>

          <ul className="mb-4 flex w-full flex-col divide-y-2 border-y-2 bg-white sm:rounded-md sm:border-2">
            <li className="flex items-center justify-between px-4 py-2">
              <p>Event Name</p>
              <div>
                <button
                  onClick={() => togglePopup(setUpdateNamePopup)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <p className="text-grayed">{event.eventName}</p>
                  <FaChevronRight />
                </button>
              </div>
            </li>
            <li className="flex items-center justify-between px-4 py-2">
              <p>Date</p>
              <div>
                <button
                  onClick={() => togglePopup(setUpdateDatePopup)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <p className="text-grayed">{formatTime(event.startDate)}</p>
                  <FaChevronRight />
                </button>
              </div>
            </li>
            <li className="flex items-center justify-between px-4 py-2">
              <p>Event Code</p>
              <div>
                <button onClick={() => handleCopyToClipboard(event.eventCode)}>
                  <BiCopy />
                </button>
              </div>
            </li>
            <li className="flex items-center justify-between px-4 py-2">
              <p>Event Link</p>
              <div>
                <button
                  onClick={() =>
                    handleCopyToClipboard(
                      `localhost:5173/event/${event.eventCode}`,
                    )
                  }
                >
                  <BiCopy />
                </button>
              </div>
            </li>
            <li className="flex items-center justify-between px-4 py-2">
              <p>Download QR Code</p>
              <div>
                <div className="hidden" ref={qrCodeRef}>
                  <QRCodeSVG
                    value={`http://localhost:5173/event/${event.eventCode}`}
                    size={250}
                  />
                </div>
                <button onClick={() => handleDownloadQr(qrCodeRef)}>
                  <BiDownload />
                </button>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="ml-4 py-4 text-2xl text-grayed sm:m-0">
            Audience QnA
          </h2>

          <div className="mb-4 w-full border-y-2 bg-white p-4 sm:rounded-md sm:border-2 ">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Moderation</h3>
                <p className="text-sm text-grayed">
                  easily review all questions before they go live
                </p>
              </div>
              <SwitchButton
                handleChange={(e) => handleModerationChange(e.target.checked)}
                isChecked={moderation}
              />
            </div>

            <div className="mb-4 flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <h3 className="mb-2 text-lg font-bold sm:m-0">
                Max question length
              </h3>
              <div className="flex w-full items-center gap-4 sm:w-auto sm:gap-1">
                {maxQuestionLengthButtons}
              </div>
            </div>

            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <h3 className="mb-2 text-lg font-bold sm:m-0">
                max questions ask
              </h3>
              <div className="flex w-full items-center justify-start gap-4 sm:w-auto sm:gap-1">
                {maxQuestionsButtons}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => togglePopup(setDeletePopup)}
            className="text-2xl font-medium text-red-500"
          >
            Delete Event
          </button>
        </div>

        <Popup
          popup={updateNamePopup}
          setPopup={setUpdateNamePopup}
          content={
            <UpdateEventName
              formik={updateEventNameFormik}
              setUpdateEventName={setUpdateNamePopup}
            />
          }
        />

        <Popup
          popup={updateDatePopup}
          setPopup={setUpdateDatePopup}
          content={
            <UpdateEventDate
              formik={updateEventDateFormik}
              setUpdateEventDate={setUpdateDatePopup}
            />
          }
        />

        <Popup
          content={
            <DeleteEvent
              setDeletePopup={setDeletePopup}
              eventId={event.eventId}
            />
          }
          popup={deletePopup}
          setPopup={setDeletePopup}
        />

        {copyToClipboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="fixed right-4 top-20 translate-x-0 transform rounded border-2 bg-white px-6 py-1"
          >
            <p>copied to clipboard</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};
export default EventSetting;
