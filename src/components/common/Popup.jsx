const Popup = (props) => {
  const { content, popup, togglePopup } = props;

  return (
    popup && (
      <div
        onClick={togglePopup}
        className="fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-gray-900 bg-opacity-40"
      >
        {content}
      </div>
    )
  );
};

export default Popup;
