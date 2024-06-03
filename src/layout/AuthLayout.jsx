/**
 * @module AuthLayout
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function AuthLayout({ children }) {
  return (
    <div className="h-100vh w-100 d-flex align-items-center justify-content-center">
      {children}
    </div>
  );
}

export default AuthLayout;
