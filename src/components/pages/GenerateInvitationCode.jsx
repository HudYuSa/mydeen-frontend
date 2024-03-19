import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  generateInvitation,
  selectMaster,
  selectMasterError,
  selectMasterErrorMessage,
  selectMasterLoggged,
} from "../../slices/masterSlice";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AppLogo from "../features/AppLogo";

const GenerateInvitationCode = () => {
  const master = useSelector(selectMaster);
  const masterLogged = useSelector(selectMasterLoggged);
  const masterError = useSelector(selectMasterError);
  const masterErrorMessage = useSelector(selectMasterErrorMessage);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {},
    onSubmit: (_, { setSubmitting }) => {
      dispatch(generateInvitation({ setSubmitting }));
    },
  });

  useEffect(() => {
    if (!masterLogged) {
      navigate("/");
    }
  }, [masterLogged, navigate]);
  return (
    masterLogged && (
      <>
        <AppLogo />
        <main className="mx-auto w-4/5 max-w-lg flex-grow">
          <form onSubmit={formik.handleSubmit}>
            <button
              className={`${
                formik.isSubmitting ? "bg-primarySoft" : "bg-primary"
              } my-4 w-full rounded-lg py-2 text-lg text-white outline-none`}
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting
                ? "Generating..."
                : "Generate invitation code"}
            </button>
          </form>
          {masterError && (
            <p className="mt-2 text-center text-red-500">
              {masterErrorMessage}
            </p>
          )}

          <p>Invitation code: {master?.invitationCode}</p>
        </main>
      </>
    )
  );
};
export default GenerateInvitationCode;
