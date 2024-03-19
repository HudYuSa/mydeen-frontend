import { Link } from "react-router-dom";

const QuickEventOption = ({ event, handleDeleteEvent }) => {
  return (
    <div className="flex w-40 flex-col [&>*:nth-child(2)]:border-b-2 ">
      <Link
        to={"/event/" + event.eventCode + "/participants"}
        target="_blank"
        className="p-4 py-1 hover:bg-gray-100"
      >
        Participant mode
      </Link>
      <Link
        to={"/event/" + event.eventCode + "/present"}
        target="_blank"
        className="p-4 py-1 hover:bg-gray-100"
      >
        Present mode
      </Link>
      <Link
        to={"/event/" + event.eventCode}
        className="p-4 py-1 hover:bg-gray-100"
      >
        Open
      </Link>
      <button
        onClick={() => handleDeleteEvent(event)}
        className="p-4 py-1 text-start hover:bg-gray-100"
      >
        Delete
      </button>
    </div>
  );
};
export default QuickEventOption;
