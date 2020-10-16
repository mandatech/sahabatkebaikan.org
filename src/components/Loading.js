const Loading = ({ width = 115, height = 115 }) => {
  return (
    <object
      type="image/svg+xml"
      data="/spinner.svg"
      style={{ width, height }}
      aria-label="spinner.svg"
    />
  );
};

export default Loading;
