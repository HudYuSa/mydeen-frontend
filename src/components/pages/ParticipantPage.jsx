import { RxExit } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { selectEventByEventCode } from "../../slices/eventsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CommentLogo from "../../assets/comment-logo.svg";
import useWebsocket from "../../hooks/useWebsocket";
import { ReadyState } from "react-use-websocket";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useOnMountUnsafe } from "../../hooks/useOnMountUnsafe";
import {
  createQuestion,
  getEventQuestions,
  retrieveQuestionMessages,
  selectQuestions,
} from "../../slices/questionsSlice";
import Question from "../features/Question";
import EditQuestion from "../features/EditQuestion";
import Popup from "../common/Popup";

const ParticipantPage = () => {
  const { eventCode } = useParams();
  const event = useSelector((state) =>
    selectEventByEventCode(state, eventCode),
  );

  const questions = useSelector(selectQuestions);

  const dispatch = useDispatch();

  const [popup, setPopup] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // variable that needs to be replaced with a real data
  const totalQuestions = 0;
  const questionError = false;

  const submitRef = useRef(null);
  const questionRef = useRef(null);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebsocket();

  // useEffect to get initial questions data from database
  useOnMountUnsafe(() => {
    dispatch(getEventQuestions(event.eventId));
  });

  // useffect to get all retrieved messages
  useEffect(() => {
    dispatch(retrieveQuestionMessages(lastJsonMessage));
  }, [lastJsonMessage]);

  const questionFormik = useFormik({
    initialValues: {
      question: "",
      username: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      question: Yup.string().required("question cannot be empty"),
      username: Yup.string().min(3, "minimum 3 letter username"),
    }),
    onSubmit: ({ question, username }, { setFieldValue }) => {
      console.log(
        "🚀 |~~| file: ParticipantPage.jsx:67 |~~| { question, username }:",
        { question, username },
      );
      dispatch(
        createQuestion({
          credentials: { eventId: event.eventId, content: question, username },
          sendJsonMessage,
        }),
      );
      setFieldValue("question", "");
      questionRef.current.style.height = "auto";
    },
  });

  const handleInput = (e) => {
    if (questionRef.current) {
      questionRef.current.style.height = "auto";
      questionRef.current.style.height = `${e.target.scrollHeight - 24}px`;
    }
  };

  return (
    <div className="min-h-screen w-full bg-mainBackground">
      <header>
        <nav className="flex items-center justify-between bg-primary p-4 text-white">
          <Link to={"/event/notfound"}>
            <RxExit size={20} strokeWidth={0.8} />
          </Link>

          <h1 className="flex-grow text-center text-xl">{event.eventName}</h1>

          <button>
            <FaRegUser size={20} />
          </button>
        </nav>
      </header>
      <main className="mx-auto flex w-full max-w-2xl flex-grow flex-col justify-center px-2 py-8 text-center">
        <section className="rounded-md bg-white p-4 shadow-lg">
          <form
            onSubmit={questionFormik.handleSubmit}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                e.preventDefault();
                submitRef.current.click();
              }
            }}
          >
            <textarea
              ref={questionRef}
              placeholder="Ketik pertanyaan anda"
              className="w-full resize-none overflow-hidden py-2 text-xl text-dark outline-none"
              id="question"
              name="question"
              onInput={handleInput}
              value={questionFormik.values.question}
              onBlur={questionFormik.handleBlur}
              onChange={questionFormik.handleChange}
            />
            {questionFormik.errors.question && (
              <p className="my-2 text-left text-red-500">
                {questionFormik.errors.question}
              </p>
            )}

            <div
              className="flex w-full items-center justify-between gap-2
          "
            >
              <div className="w-fit rounded-full bg-slightGray p-3">
                <FaRegUser className="text-dark" size={20} />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={questionFormik.values.username}
                onBlur={questionFormik.handleBlur}
                onChange={questionFormik.handleChange}
                className="w-full text-lg text-dark outline-none"
                placeholder="Your name (optional)"
              />
              <p>
                {totalQuestions}/{event.maxQuestions}
              </p>
              <button
                ref={submitRef}
                type="submit"
                disabled={readyState !== ReadyState.OPEN}
                className="rounded-full bg-green-500 px-4 py-2 font-bold text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
        <section>
          {questions.length < 1 ? (
            <div>
              <div className="flex w-full items-center justify-center py-20">
                <img
                  className="h-40 w-40"
                  src={CommentLogo}
                  alt="dashboard hero img"
                />
              </div>
              <p className="text-lg text-dark">
                Belum ada pertanyaan yang masuk
              </p>
              <p className="text-xl font-bold text-gray-700">
                Jadilah penanya pertama
              </p>
            </div>
          ) : (
            <ul className="mt-4 flex flex-col gap-4">
              {questions.map((question, index) => (
                <Question
                  key={index}
                  question={question}
                  sendJsonMessage={sendJsonMessage}
                  setPopup={setPopup}
                  setCurrentQuestion={setCurrentQuestion}
                  currentQuestion={currentQuestion}
                />
              ))}
            </ul>
          )}
        </section>

        {/* edit question popup */}
        <Popup
          popup={popup}
          setPopup={setPopup}
          content={
            <EditQuestion
              currentQuestion={currentQuestion}
              readyState={readyState}
              sendJsonMessage={sendJsonMessage}
              setPopup={setPopup}
            />
          }
        />
      </main>
    </div>
  );
};
export default ParticipantPage;
