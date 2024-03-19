import { useDispatch, useSelector } from "react-redux";
import {
  createEvent,
  selectEventsError,
  selectEventsErrorMessage,
} from "../../slices/eventsSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef } from "react";

const CreateEventForm = () => {
  const eventNameRef = useRef();

  const dispatch = useDispatch();

  const eventsError = useSelector(selectEventsError);
  const eventsErrorMessage = useSelector(selectEventsErrorMessage);

  const currentDate = new Date();
  const formik = useFormik({
    initialValues: {
      eventName: "new event",
      date: currentDate.toISOString().split("T")[0],
      time: "20:00",
    },
    validationSchema: Yup.object({
      eventName: Yup.string().required("Event name is required"),
      date: Yup.date().required("Date is required"),
      time: Yup.string()
        .matches(
          /^(?:[01]\d|2[0-3]):[0-5]\d$/,
          'Time must be in the "HH:mm" format (24-hour)',
        )
        .required("Time is required"),
    }),
    onSubmit: ({ eventName, date, time }, { setSubmitting }) => {
      const startDate = date + " " + time + ":00";
      dispatch(
        createEvent({
          createEventCredentials: { eventName, startDate },
          setSubmitting,
        }),
      );
    },
  });

  useEffect(() => {
    if (eventNameRef.current) {
      eventNameRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label className="text-xl text-gray-600" htmlFor="eventName">
          Event Name
        </label>
        <input
          ref={eventNameRef}
          type="text"
          id="eventName"
          name="eventName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.eventName}
          placeholder="Event Name"
          className={
            "mt-2 w-full rounded-xl border-2 border-solid px-4 py-2 text-xl focus:outline-blue-400"
          }
        />
      </div>
      {formik.touched.eventName && formik.errors.eventName && (
        <p className="text-md mt-2 text-red-400">{formik.errors.eventName}</p>
      )}

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
        <p className="text-md mt-2 text-red-400">{formik.errors.date}</p>
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
        <p className="text-md mt-2 text-red-400">{formik.errors.time}</p>
      )}

      <button
        className={`${
          formik.isSubmitting ? "bg-confirmSoft" : "bg-confirm"
        } my-4 w-full rounded-lg py-2 text-lg text-white outline-none`}
        type="submit"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Creating..." : "Create Event"}
      </button>
      {eventsError && (
        <p className="mt-4 text-center text-lg text-red-500">
          {eventsErrorMessage}
        </p>
      )}
    </form>
  );
};
export default CreateEventForm;
