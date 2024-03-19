import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import Loader from "../common/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvent,
  selectEventByEventCode,
  selectEventsError,
  selectEventsStatus,
} from "../../slices/eventsSlice";
import { selectAdminLoggged } from "../../slices/adminSlice";

const FetchEvent = () => {
  const [eventFetched, setEventFetched] = useState(false);

  const { eventCode } = useParams();

  const event = useSelector((state) =>
    selectEventByEventCode(state, eventCode),
  );
  const eventsStatus = useSelector(selectEventsStatus);
  const eventsError = useSelector(selectEventsError);

  const adminLogged = useSelector(selectAdminLoggged);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!event) {
      dispatch(getEvent(eventCode));
    }
  }, [event, eventCode, dispatch]);

  // check event status dan event error
  // and label eventFetched as true
  useEffect(() => {
    if (eventsStatus === "success" || eventsError) {
      setEventFetched(true);
    }
  }, [eventFetched, eventsStatus, event, eventsError]);

  // navigate to not found page if event is not found
  useEffect(() => {
    if (!event && eventFetched && eventsError) {
      navigate("/event/notfound");
      setEventFetched(false);
    }
  }, [event, navigate, eventFetched, eventsStatus, eventsError]);

  return eventsStatus === "pending" && !eventFetched ? (
    <Loader />
  ) : !event && eventsError && eventFetched && adminLogged ? (
    <Navigate to={"/admin/dashboard"} />
  ) : (
    event && eventFetched && <Outlet />
  );
};
export default FetchEvent;
