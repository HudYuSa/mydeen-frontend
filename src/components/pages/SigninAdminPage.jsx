import { Link, useNavigate } from "react-router-dom";
import { FaHashtag } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import AppLogo from "../features/AppLogo";
import { useDispatch, useSelector } from "react-redux";
import {
  refreshAdminData,
  selectAdminError,
  selectAdminErrorMessage,
  selectAdminLoggged,
  signin,
} from "../../slices/adminSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const SigninAdminPage = () => {
  const adminError = useSelector(selectAdminError);
  const adminErrorMessage = useSelector(selectAdminErrorMessage);
  const adminLogged = useSelector(selectAdminLoggged);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "hudyusufatsigah@gmail.com",
      password: "yusufsaleh",
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

  // clear up signin and signup input data
  useEffect(() => {
    dispatch(refreshAdminData());
  }, [dispatch]);

  // redirect to admin dashboard if logged in
  useEffect(() => {
    if (adminLogged) {
      navigate("/admin/dashboard");
    }
  }, [adminLogged, navigate]);

  return (
    !adminLogged && (
      <div className="flex min-h-screen flex-col bg-mainBackground">
        <AppLogo />
        <main className="mx-auto w-full max-w-lg  flex-grow md:w-4/5">
          <h1 className="mx-2 text-2xl">Sign In sebagai admin</h1>
          <h2 className="mx-2 mt-4 text-lg">
            atau{" "}
            <span>
              <Link to={"/admin/signup"} className="text-blue-500">
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
              {formik.isSubmitting ? "Signing in..." : "Sign In"}
            </button>
            {adminError && (
              <p className="mt-2 text-center text-red-500">
                {adminErrorMessage}
              </p>
            )}
          </form>
        </main>
        <footer className="w-full bg-primary py-8">
          <div className="mx-auto w-4/5 max-w-lg">
            <h2 className="py-4 text-2xl text-white">
              Bergabung sebagai peserta?
            </h2>
            <p className="py-4 text-lg text-white ">Tanpa perlu akun.</p>
            <div className="relative">
              <form>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <FaHashtag className="text-primary" size={"1.5rem"} />
                </div>
                <input
                  className="z-10 w-full rounded-full border py-4 pl-12 pr-[3.5rem] text-xl focus:outline-none"
                  type="text"
                  placeholder="Masukkan code"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    className={"cursor-pointer rounded-full bg-primary p-2"}
                  >
                    <AiOutlineArrowRight color="white" size={"1.25rem"} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </footer>
      </div>
    )
  );
};
export default SigninAdminPage;
