import { BallTriangle } from 'react-loader-spinner';

const loader = () => {
  return (
    <>
      <BallTriangle
        wrapperClass="loader"
        radius={5}
        ariaLabel="ball-triangle-loading"
      />
    </>
  );
};

export default loader;
