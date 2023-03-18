import { ErrorInfo, ErrorTitle } from './ErrorCard.styled';

const ErrorCard = ({ error }) => {
  return (
    <>
      <ErrorTitle>Error</ErrorTitle>
      {error && <ErrorInfo>{error.message}</ErrorInfo>}
      {error && error.response && <ErrorInfo>{error.response.data}</ErrorInfo>}
      {error && error.request && <ErrorInfo>{error.request.data}</ErrorInfo>}
    </>
  );
};

export default ErrorCard;
