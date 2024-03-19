import { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteEvent,
  finishEvent,
  selectLiveEvents,
  startEvent,
} from "../../slices/eventsSlice";
import { formatTime } from "../../utils/time";
import Popover, {
  resetPopoverPosition,
  togglePopover,
} from "../common/Popover";
import QuickEventOption from "./QuickEventOption";

const EventList = ({ events, type, currentEvent, setCurrentEvent }) => {
  const liveEvents = useSelector(selectLiveEvents);

  const [popover, setPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState("top-9"); // Initial position

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    navigate("/event/" + event.eventCode);
  };

  const handlePopover = (e, event) => {
    e.stopPropagation();
    setCurrentEvent(event.eventId);
    togglePopover(setPopover);
    resetPopoverPosition(e, popover, setPopoverPosition, "top-9", "bottom-9");
  };

  const handleDeleteEvent = (event) => {
    dispatch(
      deleteEvent({
        eventId: event.eventId,
        toggle: () => togglePopover(setPopover),
      }),
    );
  };

  const handleStartEvent = (e, event) => {
    e.stopPropagation();
    dispatch(startEvent({ eventId: event.eventId }));
  };
  const handleFinishEvent = async (e, event) => {
    e.stopPropagation();
    dispatch(finishEvent({ eventId: event.eventId }));
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
          <p className="text-xs text-grayed">{formatTime(event.startDate)}</p>
        </div>
        <div className="flex items-center gap-2">
          {event.status !== "finished" && (
            <div>
              <button
                disabled={
                  liveEvents.length > 0
                    ? event.status === "live"
                      ? false
                      : true
                    : false
                }
                onClick={(e) =>
                  event.status === "scheduled"
                    ? handleStartEvent(e, event)
                    : handleFinishEvent(e, event)
                }
                className={`rounded-full px-5 py-1 text-white ${
                  liveEvents.length < 1
                    ? "bg-confirm"
                    : event.status === "live"
                      ? "bg-red-600"
                      : "bg-confirmSoft"
                }`}
              >
                {event.status === "live" ? "Finish" : "Start"}
              </button>
            </div>
          )}
          <div
            onClick={(e) => handlePopover(e, event)}
            className="relative p-2"
          >
            <BsThreeDotsVertical className="hover:text-blue-500" size={20} />
            <Popover
              popover={popover}
              setPopover={setPopover}
              popoverPosition={popoverPosition}
              togglePopover={togglePopover}
              uniqueCLass={"right-4"}
              content={
                <>
                  {currentEvent === event.eventId && (
                    <QuickEventOption
                      event={event}
                      handleDeleteEvent={handleDeleteEvent}
                    />
                  )}
                </>
              }
            />
          </div>
        </div>
      </li>
    );
  });

  return (
    <div>
      <h2 className="mx-4 my-4 w-full max-w-2xl text-xl font-bold text-grayed sm:mx-auto">
        {type}
      </h2>
      <ul className="mx-auto w-full max-w-2xl divide-y divide-gray-300 border-y border-solid border-gray-300 bg-white sm:rounded-xl sm:border">
        {eventsComponent}
      </ul>
    </div>
  );
};
export default EventList;
