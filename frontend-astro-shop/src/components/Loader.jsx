const Loader = () => {
  return (
    <div className="flex items-center justify-center space-x-3">
      <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      <span>Processing...</span>
    </div>
  );
};

export default Loader;
