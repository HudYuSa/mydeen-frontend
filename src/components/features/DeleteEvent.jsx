import { useDispatch } from "react-redux";
import { deleteEvent } from "../../slices/eventSlice";

export const DeleteEvent = ({ toggleDeletePopup, eventId }) => {
  const dispath = useDispatch();

  const handleDeleteEvent = () => {
    dispath(deleteEvent({ eventId }));
    toggleDeletePopup();
    console.log("deleting");
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
          onClick={toggleDeletePopup}
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
