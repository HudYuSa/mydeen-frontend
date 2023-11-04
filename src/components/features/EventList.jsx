import { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const EventList = ({ events, type }) => {
  const navigate = useNavigate();

  const [popover, setPopover] = useState(false);
  const [currentEvent, setCurrentEvent] = useState("");

  const handleClick = (event) => {
    navigate("/event/" + event.eventId);
  };

  const togglePopover = () => {
    setPopover((prev) => !prev);
    setCurrentEvent("");
  };

  const handleTooltip = (e, event) => {
    e.stopPropagation();
    setCurrentEvent(event.eventId);
    setPopover((prev) => !prev);
  };

  const eventsComponent = events.map((event, idx) => {
    return (
      <li
        key={idx}
        className="flex cursor-pointer items-center gap-4 bg-white 
        p-4 first:rounded-t-xl last:rounded-b-xl"
        onClick={() => handleClick(event)}
      >
        <div className="rounded-full bg-mainBackground p-2">
          <AiOutlineCalendar className="text-confirm" size={25} />
        </div>
        <div className="flex-grow">
          <p className="text-base font-medium">{event.eventName}</p>
          <p className="text-grayed text-xs">
            {event.startDate
              .replace(/[A-Za-z]/g, " ")
              .split(" ")
              .reverse()
              .join(" ")
              .trim()}
          </p>
        </div>
        <div
          onClick={(e) => handleTooltip(e, event)}
          className="relative right-0 p-2"
        >
          <BsThreeDotsVertical className="hover:text-blue-500" size={20} />
          {currentEvent === event.eventId && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-4 top-9 z-20 flex w-36 flex-col rounded-md bg-white py-2 drop-shadow-md"
            >
              <Link
                to={"/event/" + event.eventId + "/present"}
                className="p-4 py-1 first:border-b-2 hover:bg-gray-100"
              >
                Present mode
              </Link>
              <Link
                to={"/event/" + event.eventId}
                className="p-4 py-1 hover:bg-gray-100"
              >
                Open
              </Link>
              <Link className="p-4 py-1 hover:bg-gray-100">Delete</Link>
            </div>
          )}
        </div>
      </li>
    );
  });

  return (
    <div>
      <h2 className="text-grayed mx-4 my-4 w-full max-w-2xl text-xl font-bold sm:mx-auto">
        {type}
      </h2>
      <ul className="mx-auto w-full max-w-2xl divide-y divide-gray-300 border-y border-solid border-gray-300 bg-white sm:rounded-xl sm:border">
        {eventsComponent}
      </ul>
      {popover && (
        <div
          onClick={togglePopover}
          className="opacity absolute bottom-0 left-0 right-0 top-0 z-10"
        ></div>
      )}
    </div>
  );
};
export default EventList;
