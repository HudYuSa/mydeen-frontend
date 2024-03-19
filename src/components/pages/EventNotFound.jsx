import { useNavigate } from "react-router-dom";
import AppLogo from "../features/AppLogo";
import { BiHome } from "react-icons/bi";
import { FaHashtag } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvent,
  selectEventsError,
  selectEventsErrorMessage,
  selectEventsStatus,
} from "../../slices/eventsSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const EventNotFound = () => {
  const eventsStatus = useSelector(selectEventsStatus);
  const eventsError = useSelector(selectEventsError);
  const eventsErrorMessage = useSelector(selectEventsErrorMessage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      eventCode: "",
    },
    validationSchema: Yup.object({
      eventCode: Yup.number().required(),
    }),
    onSubmit: (credentials) => {
      dispatch(getEvent(credentials.eventCode));
    },
  });

  useEffect(() => {
    if (
      eventsStatus === "success" &&
      formik.values.eventCode.toString().length > 0
    ) {
      navigate(`/event/${formik.values.eventCode}`);
    }
  }, [eventsError, navigate, eventsStatus, formik]);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-mainBackground">
      <header>
        <nav className="mx-2 flex items-center justify-between p-4 text-white">
          <button onClick={handleGoBack}>
            <BiHome size={40} className="text-grayed" />
          </button>

          <div onClick={handleGoBack} className="flex w-full items-center">
            <AppLogo />
          </div>
        </nav>
      </header>
      <main className="mx-auto flex w-full max-w-md flex-grow flex-col justify-center px-2 py-8 text-center">
        <div className="relative">
          <form onSubmit={formik.handleSubmit}>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6">
              <FaHashtag className="text-primary" size={"1.5rem"} />
            </div>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.eventCode}
              name="eventCode"
              id="eventCode"
              className="z-10 w-full rounded-full border py-4 pl-14 pr-[3.5rem] text-xl focus:outline-none"
              type="number"
              placeholder="Masukkan code"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <button
                type="submit"
                className={"cursor-pointer rounded-full bg-primary p-2"}
              >
                <AiOutlineArrowRight color="white" size={"1.25rem"} />
              </button>
            </div>
          </form>
        </div>
        {eventsStatus === "pending" && (
          <div className="mt-6">
            <p className="text-lg">loading...</p>
          </div>
        )}
        {eventsError && eventsStatus !== "pending" && (
          <div className="mt-6">
            <p className="text-lg text-red-500">{eventsErrorMessage}</p>
          </div>
        )}
      </main>
    </div>
  );
};
export default EventNotFound;
