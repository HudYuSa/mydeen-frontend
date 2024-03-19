import { useEffect, useRef } from "react";
import { togglePopup } from "../common/Popup";

const UpdateAdminUsername = ({ formik, setUpdateUsernamePopup }) => {
  const submitRef = useRef(null);
  const adminUsernameRef = useRef(null);

  useEffect(() => {
    if (adminUsernameRef.current) {
      adminUsernameRef.current.focus();
    }
  }, []);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-4/5 max-w-xl rounded-lg bg-white p-4"
    >
      <h4 className="mb-2 text-2xl font-medium">Update Event Name</h4>
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            e.preventDefault();
            submitRef.current.click();
          }
        }}
      >
        <input
          ref={adminUsernameRef}
          type="text"
          id="username"
          name="username"
          value={formik.values.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="mt-2 w-full rounded-xl border-2 border-solid px-4 py-2 text-xl focus:outline-blue-400"
        />
        {formik.touched.username && formik.errors.username && (
          <>
            <p>{formik.values.username}</p>
            <p className="mt-1 text-xs text-red-400">
              {formik.errors.username}
            </p>
          </>
        )}

        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={() => togglePopup(setUpdateUsernamePopup)}
            className="rounded-md border-2 border-grayed px-4 py-1"
          >
            Cancel
          </button>
          <button
            ref={submitRef}
            type="submit"
            className="rounded-md bg-confirm px-4 py-1 text-white"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
export default UpdateAdminUsername;
