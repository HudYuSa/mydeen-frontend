import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import {
  checkRole,
  selectCommonAuthenticate,
  selectCommonError,
  selectCommonErrorMessage,
} from "../../slices/commonSlice";
import { useEffect } from "react";

const Authenticate = () => {
  const commonAuthenticate = useSelector(selectCommonAuthenticate);
  const commonError = useSelector(selectCommonError);
  const commonErrorMessage = useSelector(selectCommonErrorMessage);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkRole());
  }, [dispatch]);

  useEffect(() => {
    if (commonError) {
      console.log(
        "🚀 |~~| file: Authenticate.jsx:24 |~~| commonErrorMessage:",
        commonErrorMessage,
      );
      sessionStorage.setItem("master_logged", "false");
      sessionStorage.setItem("admin_logged", "false");
    }
  }, [commonError, commonErrorMessage]);

  return commonAuthenticate && <Outlet />;
};
export default Authenticate;
