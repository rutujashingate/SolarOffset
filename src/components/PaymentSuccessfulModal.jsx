import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * This modal is shown when the payment is successful
 * @param isOpen
 * @returns {JSX.Element}
 * @constructor
 */
function PaymentSuccessModal({
  isOpen,
}) {
  return (
    <Modal isOpen={isOpen} centered>
      <ModalHeader>Payment Successful</ModalHeader>
      <ModalBody>
        <div className="d-flex flex-column justify-content-between align-items-center">
          <h3 className="text-center mb-3">Thanks for contributing towards a green future</h3>
          <FontAwesomeIcon icon={faCheckCircle} color="green" fontSize="80" />
          <p className="mt-3">You will be redirected in a few seconds</p>
        </div>

      </ModalBody>
    </Modal>
  );
}

export default PaymentSuccessModal;
