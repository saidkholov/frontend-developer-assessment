import { Toast, ToastContainer } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ErrorMessage({message, onClose}) {
  return (
    <ToastContainer className='position-fixed bottom-0 end-0 p-3'>
      <Toast onClose={onClose} bg='danger' show={!!message} delay={4000} autohide>
        <Toast.Body className='text-white'>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorMessage;
