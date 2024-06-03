import AppSideBar from 'components/AppSideBar';
import AppTopBar from 'components/AppTopBar';
import { useState } from 'react';

/**
 * This component is used to display the dashboard layout
 * This is a wrapper component for all the pages
 * This contains the sidebar and the topbar
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function DashboardLayout({ children }) {
  const [isOpen, setOpen] = useState(false);
  const togglefunc = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="d-flex h-100vh">
      <AppSideBar isOpen={isOpen} />
      <div className="flex flex-column w-100 h-100vh overflow-scroll">
        <AppTopBar togglefunc={togglefunc} />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
