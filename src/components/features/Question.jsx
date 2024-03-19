import { FaRegUser } from "react-icons/fa";
import { RiThumbUpLine } from "react-icons/ri";
import { formatTime, getTimeDifference } from "../../utils/time";
import { BsThreeDots } from "react-icons/bs";
import Popover, {
  resetPopoverPosition,
  togglePopover,
} from "../common/Popover";
import QuestionOption from "./QuestionOption";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteQuestion,
  editQuestion,
  toggleLike,
} from "../../slices/questionsSlice";
import { debounce } from "lodash";

const Question = ({
  setPopup,
  question,
  sendJsonMessage,
  setCurrentQuestion,
}) => {
  const [popover, setPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState("top-5"); // Initial position

  const dispatch = useDispatch();

  const handlePopover = (e) => {
    e.stopPropagation();
    setCurrentQuestion(question);
    console.log(
      "🚀 |~~| file: Question.jsx:33 |~~| question.questionId:",
      question.questionId,
    );
    togglePopover(setPopover);
    resetPopoverPosition(e, popover, setPopoverPosition, "top-5", "bottom-5");
  };

  const handleDeleteQuestion = () => {
    dispatch(
      deleteQuestion({
        credentials: { questionId: question.questionId },
        sendJsonMessage,
      }),
    );
    togglePopover(setPopover);
  };

  // Debounce the function to be called after 250 milliseconds
  const handleToggleLike = debounce((value) => {
    // Handle switch change logic here
    dispatch(
      toggleLike({
        credentials: {
          questionId: question.questionId,
        },
        sendJsonMessage,
      }),
    );
  }, 250);

  return (
    <li className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="w-fit rounded-full bg-slightGray p-3">
          <FaRegUser className="text-dark" size={20} />
        </div>
        <div className="flex w-full flex-col justify-center gap-0 text-left">
          <p className="w-full font-bold">
            {question.username && question.username
              ? question.username
              : "anonymouse"}
          </p>
          <p className="text-sm text-grayed">
            {formatTime(question.createdAt)}
          </p>
        </div>
        <button
          type="button"
          className={`flex w-fit cursor-pointer items-center justify-between gap-2 rounded-full border px-3 py-1 text-gray-800 hover:border hover:bg-green-300 hover:transition-all hover:delay-75 ${
            question.userLiked ? "bg-green-300" : "bg-slightGray"
          }`}
          onClick={handleToggleLike}
        >
          <p>{question.likesCount || 0}</p>
          <RiThumbUpLine size={18} />
        </button>
      </div>

      <div className="mt-2  w-full break-all text-left">
        <div>
          <span className="w-full overflow-hidden">{question.content}</span>
        </div>
        <div className="relative flex justify-end">
          <BsThreeDots
            className="cursor-pointer hover:text-blue-500"
            size={20}
            onClick={handlePopover}
          />
          <Popover
            popover={popover}
            setPopover={setPopover}
            popoverPosition={popoverPosition}
            content={
              <QuestionOption
                handleDeleteQuestion={handleDeleteQuestion}
                setPopup={setPopup}
                setPopover={setPopover}
              />
            }
          />
        </div>
      </div>
    </li>
  );
};
export default Question;
