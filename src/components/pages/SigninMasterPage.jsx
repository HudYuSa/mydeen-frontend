import { Link, useNavigate } from "react-router-dom";
import {
  refreshMasterData,
  selectMasterError,
  selectMasterErrorMessage,
  selectMasterLoggged,
  selectMasterSignin,
  selectMasterStatus,
  signin,
} from "../../slices/masterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import AppLogo from "../features/AppLogo";

const SigninMasterPage = () => {
  const masterError = useSelector(selectMasterError);
  const masterStatus = useSelector(selectMasterStatus);
  const masterErrorMessage = useSelector(selectMasterErrorMessage);
  const masterLogged = useSelector(selectMasterLoggged);
  const masterSignin = useSelector(selectMasterSignin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "hudjempol@gmail.com",
      password: "jempolbesar",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string()
        .min(6, "Password minimum length is 6")
        .required("Password is required"),
    }),
    onSubmit: (signinCredentials, { setSubmitting }) => {
      dispatch(signin({ signinCredentials, setSubmitting }));
    },
  });

  useEffect(() => {
    dispatch(refreshMasterData());
  }, [dispatch]);

  useEffect(() => {
    if (masterLogged) {
      navigate("/master/generate-invitation");
    } else if (masterSignin) {
      navigate("/master/otp");
    }
  }, [masterStatus, masterLogged, masterSignin, navigate]);
  return (
    !masterLogged && (
      <div className="flex min-h-screen flex-col bg-mainBackground">
        <AppLogo />
        <main className="mx-auto w-full max-w-lg flex-grow">
          <h1 className="mx-2 text-2xl">Sign In sebagai master</h1>
          <h2 className="mx-2 mt-4 text-lg">
            atau{" "}
            <span>
              <Link to={"/master/signup"} className="text-blue-500">
                Buat akun baru
              </Link>
            </span>
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="mx-auto mt-8 rounded-lg bg-white px-8 py-4 shadow-lg"
          >
            <div className="w-full border-b-2">
              <input
                type="text"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Email *"
                className={"w-full py-1 text-xl focus:outline-none"}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-xs text-red-400">{formik.errors.email}</p>
            )}
            <div className="mt-4 w-full border-b-2">
              <input
                className={"w-full py-1 text-xl focus:outline-none"}
                placeholder="Password *"
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {formik.errors.password}
              </p>
            )}

            <button
              className={`${
                formik.isSubmitting ? "bg-primarySoft" : "bg-primary"
              } my-4 w-full rounded-lg py-2 text-lg text-white outline-none`}
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Signing in..." : "Sign in account"}
            </button>
            {masterError && (
              <p className="mt-2 text-center text-red-500">
                {masterErrorMessage}
              </p>
            )}
          </form>
        </main>
      </div>
    )
  );
};
export default SigninMasterPage;
