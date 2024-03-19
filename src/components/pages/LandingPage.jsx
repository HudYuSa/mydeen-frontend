import { FaHashtag } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import AppLogo from "../features/AppLogo";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvent,
  resetError,
  selectEventsError,
  selectEventsErrorMessage,
  selectEventsStatus,
} from "../../slices/eventsSlice";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const LandingPage = () => {
  const eventsStatus = useSelector(selectEventsStatus);
  const eventsError = useSelector(selectEventsError);
  const eventsErrorMessage = useSelector(selectEventsErrorMessage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [initLoad, setInitLoad] = useState();

  const formik = useFormik({
    initialValues: {
      eventCode: "",
    },
    validationSchema: Yup.object({
      eventCode: Yup.number().required(),
    }),
    onSubmit: (credentials) => {
      console.log(
        "🚀 |~~| file: LandingPage.jsx:35 |~~| credentials:",
        credentials,
      );
      dispatch(getEvent(credentials.eventCode));
    },
  });

  useEffect(() => {
    dispatch(resetError());
    setInitLoad(true);
  }, [dispatch]);

  useEffect(() => {
    if (initLoad) {
      if (
        eventsError &&
        eventsErrorMessage === "there is no event with the given code"
      ) {
        navigate("/event/notfound");
      } else if (
        eventsStatus === "success" &&
        formik.values.eventCode.toString().length > 0
      ) {
        navigate(`/event/${formik.values.eventCode}`);
      }
    }
  }, [
    eventsError,
    navigate,
    eventsStatus,
    formik,
    eventsErrorMessage,
    initLoad,
  ]);

  return (
    <>
      <AppLogo />
      <main>
        <section className="mx-auto w-4/5 max-w-lg">
          <div className="w-full rounded-lg  bg-primary px-4 py-8">
            <h1 className="mb-4 text-center text-2xl text-white">
              Gabung sebagai peserta
            </h1>
            <div className="relative">
              <form onSubmit={formik.handleSubmit}>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <FaHashtag className="text-primary" size={"1.5rem"} />
                </div>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.eventCode}
                  name="eventCode"
                  id="eventCode"
                  className="z-10 w-full rounded-md border py-4 pl-12 pr-[3.5rem] text-xl focus:outline-none"
                  type="number"
                  placeholder="Masukkan code"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    className={"cursor-pointer rounded-full bg-primary p-2"}
                    type="submit"
                  >
                    <AiOutlineArrowRight color="white" size={"1.25rem"} />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Link
              className={
                "rounded-xl bg-primary px-10 py-2 text-xl text-white md:px-[4.5rem]"
              }
              to={"/admin/signup"}
            >
              Sign Up
            </Link>
            <Link
              className={
                "rounded-xl bg-primary px-10 py-2 text-xl text-white md:px-[4.5rem]"
              }
              to={"/admin/signin"}
            >
              Sign In
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};
export default LandingPage;
