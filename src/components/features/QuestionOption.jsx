import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { togglePopover } from "../common/Popover";
import { togglePopup } from "../common/Popup";

const QuestionOption = ({ setPopup, handleDeleteQuestion, setPopover }) => {
  return (
    <div className="text-dark">
      <ul className="flex flex-col gap-2">
        <li
          className="flex cursor-pointer items-center justify-start gap-2 px-4 py-1 hover:bg-gray-100"
          onClick={() => {
            togglePopup(setPopup);
            togglePopover(setPopover);
          }}
        >
          <MdEdit />
          <button>edit</button>
        </li>
        <li
          className="flex cursor-pointer items-center justify-start gap-2 px-4 py-1 hover:bg-gray-100"
          onClick={handleDeleteQuestion}
        >
          <FaTrashAlt />
          <button>withdraw</button>
        </li>
      </ul>
    </div>
  );
};
export default QuestionOption;
