const Popup = ({ content, popup, setPopup }) => {
  return (
    popup && (
      <div
        onClick={() => togglePopup(setPopup)}
        className="fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-gray-900 bg-opacity-40"
      >
        {content}
      </div>
    )
  );
};

export const togglePopup = (setPopup) => {
  setPopup((prev) => !prev);
};

export default Popup;
