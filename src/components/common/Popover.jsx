const Popover = ({
  content,
  popover,
  popoverPosition,
  setPopover,
  uniqueCLass,
}) => {
  return (
    popover && (
      <>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute z-20 cursor-auto rounded-md bg-white py-2 drop-shadow-md ${
            uniqueCLass || ""
          } ${popoverPosition}`}
        >
          {content}
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            togglePopover(setPopover);
          }}
          className="fixed bottom-0 left-0 right-0 top-0 z-10 cursor-auto bg-black opacity-0"
        ></div>
      </>
    )
  );
};

export const resetPopoverPosition = (
  e,
  popover,
  setPopoverPosition,
  topPosition,
  bottomPosition,
) => {
  if (!popover) {
    // Get mouse coordinates
    const mouseY = e.clientY;

    // Determine the threshold for showing the popover at the bottom
    const threshold = (window.innerHeight * 75) / 100; // Adjust as needed

    // Conditionally set the popover position
    if (mouseY > threshold) {
      setPopoverPosition(bottomPosition);
    } else {
      setPopoverPosition(topPosition);
    }
  }
};

export const togglePopover = (setPopover) => {
  setPopover((prev) => !prev);
};

export default Popover;
