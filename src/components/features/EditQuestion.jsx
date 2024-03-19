import { useFormik } from "formik";
import Popup, { togglePopup } from "../common/Popup";
import * as Yup from "yup";
import { useEffect, useRef } from "react";
import { ReadyState } from "react-use-websocket";
import useWebsocket from "../../hooks/useWebsocket";
import { editQuestion } from "../../slices/questionsSlice";
import { useDispatch } from "react-redux";

const EditQuestion = ({
  currentQuestion,
  sendJsonMessage,
  readyState,
  setPopup,
}) => {
  const submitRef = useRef(null);
  const questionRef = useRef(null);

  const dispatch = useDispatch();

  const questionFormik = useFormik({
    initialValues: {
      question: currentQuestion.content,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      question: Yup.string().required("question cannot be empty"),
    }),
    onSubmit: ({ question }, { setFieldValue }) => {
      console.log("🚀 |~~| file: EditQuestion.jsx:31 |~~| editing question");
      dispatch(
        editQuestion({
          credentials: {
            questionId: currentQuestion.questionId,
            content: question,
          },
          sendJsonMessage,
        }),
      );
      setFieldValue("question", "");
      questionRef.current.style.height = "auto";
      togglePopup(setPopup);
    },
  });

  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.focus();
    }
  }, []);

  const handleInput = (e) => {
    if (questionRef.current) {
      questionRef.current.style.height = "auto";
      questionRef.current.style.height = `${e.target.scrollHeight - 24}px`;
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className=" mx-4 w-full max-w-xl rounded-lg bg-white p-4"
    >
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
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length,
            )
          }
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
        <div className="flex gap-4">
          <button
            ref={submitRef}
            disabled={readyState !== ReadyState.OPEN}
            type="button"
            className="mt-4 w-full rounded-full bg-gray-400 px-4 py-2 font-bold text-dark"
            onClick={() => togglePopup(setPopup)}
          >
            cancel
          </button>
          <button
            ref={submitRef}
            type="submit"
            disabled={readyState !== ReadyState.OPEN}
            className="mt-4 w-full rounded-full bg-green-500 px-4 py-2 font-bold text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditQuestion;
