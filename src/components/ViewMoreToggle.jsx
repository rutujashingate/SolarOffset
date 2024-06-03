import { useState } from 'react';
import { Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

/**
 * This component is used to toggle the view of the content
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function ViewMoreToggle({ children }) {
  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse);

  return (
    <div>
      <hr />
      <p color="primary" className="text-center" onClick={toggle}>
        <b>View More</b>
        <FontAwesomeIcon icon={faArrowDown} className="ms-2" />
      </p>

      <Collapse isOpen={collapse}>
        {children}
      </Collapse>
    </div>
  );
}

export default ViewMoreToggle;
