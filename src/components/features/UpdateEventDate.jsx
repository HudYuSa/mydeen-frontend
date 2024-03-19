import { useRef } from "react";
import { togglePopup } from "../common/Popup";

export const UpdateEventDate = ({ formik, setUpdateEventDate }) => {
  const submitRef = useRef(null);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-4/5 max-w-xl rounded-lg bg-white p-4"
    >
      <h4 className="mb-2 text-2xl font-medium">Update Event Date</h4>
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            e.preventDefault();
            submitRef.current.click();
          }
        }}
      >
        <div className="mt-2">
          <label htmlFor="date" className="text-xl text-gray-600">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formik.values.date}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="mt-2 w-full rounded-xl border-2 border-solid px-4 py-2 text-xl focus:outline-blue-400"
          />
        </div>
        {formik.touched.date && formik.errors.date && (
          <p className="mt-1 text-xs text-red-400">{formik.errors.date}</p>
        )}

        <div className="mt-2">
          <label htmlFor="time" className="text-xl text-gray-600">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formik.values.time}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="mt-2 w-full rounded-xl border-2 border-solid px-4 py-2 text-xl focus:outline-blue-400"
          />
        </div>
        {formik.touched.time && formik.errors.time && (
          <>
            <p>{formik.values.time}</p>
            <p className="mt-1 text-xs text-red-400">{formik.errors.time}</p>
          </>
        )}

        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={() => togglePopup(setUpdateEventDate)}
            className="rounded-md border-2 border-grayed px-4 py-1"
          >
            Cancel
          </button>
          <button
            ref={submitRef}
            type="submit"
            className="rounded-md bg-confirm px-4 py-1 text-white"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
