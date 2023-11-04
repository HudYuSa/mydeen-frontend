import {
  checkOtp,
  selectMasterError,
  selectMasterErrorMessage,
  selectMasterLoggged,
  selectMasterSignin,
} from "../../slices/masterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import AppLogo from "../features/AppLogo";

const MasterOtp = () => {
  const masterError = useSelector(selectMasterError);
  const masterErrorMessage = useSelector(selectMasterErrorMessage);
  const masterLogged = useSelector(selectMasterLoggged);
  const masterSignin = useSelector(selectMasterSignin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("Otp code is required"),
    }),
    onSubmit: (data, { setSubmitting }) => {
      dispatch(checkOtp({ otpCode: data.otp, setSubmitting }));
    },
  });

  useEffect(() => {
    if (masterLogged) {
      navigate("/master/generate-invitation");
    }
    if (!masterSignin) {
      navigate("/master/signin");
    }
  }, [masterLogged, masterSignin, navigate]);
  return (
    <div className="flex min-h-screen flex-col bg-mainBackground">
      <AppLogo />
      <main className="mx-auto w-4/5 max-w-lg flex-grow">
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto mt-8 rounded-lg bg-white px-8 py-4 shadow-lg"
        >
          <div className="mt-4 w-full border-b-2">
            <input
              className={"w-full py-1 text-xl focus:outline-none"}
              placeholder="OTP Code"
              type="text"
              id="otp"
              name="otp"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.otp}
            />
          </div>
          <button className="text-blue-500 outline-none">
            Send new otp code
          </button>
          <button
            className={`${
              formik.isSubmitting ? "bg-primarySoft" : "bg-primary"
            } my-4 w-full rounded-lg py-2 text-lg text-white outline-none`}
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "verifying..." : " Verify Code"}
          </button>

          {masterError && (
            <p className="mt-2 text-center text-red-500">
              {masterErrorMessage}
            </p>
          )}
        </form>
      </main>
    </div>
  );
};
export default MasterOtp;
