const Popup = (props) => {
  const { content, togglePopup } = props;

  return (
    <div
      onClick={togglePopup}
      className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-gray-900 bg-opacity-40"
    >
      {content}
    </div>
  );
};

export default Popup;
