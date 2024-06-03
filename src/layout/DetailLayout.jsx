import React from 'react';

/**
 * This component is used to display the detail layout
 * This is a wrapper component for all the detail pages
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function DetailLayout({ children }) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 ">
      {children}
    </div>
  );
}

export default DetailLayout;
