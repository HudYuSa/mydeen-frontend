import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectAdminLoggged } from "../../slices/adminSlice";
import { selectMasterLoggged } from "../../slices/masterSlice";
import { resetError } from "../../slices/eventsSlice";

const NotFoundPage = () => {
  const adminLogged = useSelector(selectAdminLoggged);
  const masterLogged = useSelector(selectMasterLoggged);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoBackToDashboard = () => {
    dispatch(resetError());
    navigate("/");
  };

  return (
    <div className="mx-auto min-h-screen w-max p-8">
      <h1 className="mb-4 text-6xl text-primary">404</h1>
      <h2 className="mb-4 text-5xl text-primary">PAGE NOT FOUND</h2>
      <p className="text-xl">We looked everywhere for this page,</p>
      <p className="text-xl">Are you sure the website URL is correct?</p>

      {adminLogged && (
        <div className="mt-8">
          <button
            className="rounded-full border-2 border-solid border-primary px-4 py-2 text-primary"
            onClick={handleGoBackToDashboard}
          >
            Go Back to Dashboard
          </button>
        </div>
      )}
      {masterLogged && (
        <div className="mt-8">
          <Link
            className="rounded-full border-2 border-solid border-primary px-4 py-2 text-primary"
            to={"/master/generate-invitation"}
          >
            Go Back
          </Link>
        </div>
      )}
    </div>
  );
};
export default NotFoundPage;
