import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../../slices/eventsSlice";
import { togglePopup } from "../common/Popup";

export const DeleteEvent = ({ eventId, setDeletePopup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteEvent = () => {
    console.log("🚀 |~~| file: DeleteEvent.jsx:9 |~~| deleting...");
    dispatch(
      deleteEvent({
        eventId: eventId,
        toggle: () => togglePopup(setDeletePopup),
      }),
      navigate("/admin/dashboard"),
    );
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" w-80 max-w-xl rounded-lg bg-white p-4"
    >
      <h4 className="mb-2 text-xl font-medium">Delete Event</h4>
      <p className="mb-4 text-sm leading-4 text-gray-700">
        {
          "Would you like to permanently delete this event? All event data will be lost. you can't undo this action"
        }
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => togglePopup(setDeletePopup)}
          className="rounded-md border-2 border-grayed px-4 py-1"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteEvent}
          className="rounded-md bg-red-600 px-4 py-1 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
