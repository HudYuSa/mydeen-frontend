import { motion } from "framer-motion";

const ErrorSlide = ({ error, showError, errMsg }) => {
  return (
    <>
      {error && showError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="fixed right-4 top-20 translate-x-0 transform rounded bg-red-500 px-6 py-1"
        >
          <p className="text-white">{errMsg}</p>
        </motion.div>
      )}
      {error && !showError && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed right-4 top-20 translate-x-0 transform rounded bg-red-500 px-6 py-1"
        >
          <p className="text-white">{errMsg}</p>
        </motion.div>
      )}
    </>
  );
};
export default ErrorSlide;
