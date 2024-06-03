import { Button, Card } from 'reactstrap';

/**
 * This card is designed to be used a template for `Authentication` screens.
 * This card is used in both `LoginScreen` and `SignUpScreen`
 * @param title
 * @param rightHeading
 * @param rightBtnText
 * @param rightBtnAction
 * @param children
 * @param flexReverse
 * @returns {JSX.Element}
 * @constructor
 */
function AuthCard({
  title,
  rightHeading,
  rightBtnText,
  rightBtnAction,
  children,
  flexReverse,
}) {
  return (
    <Card>
      <div className={`d-flex ${flexReverse && 'flex-row-reverse'}`}>
        <div className="p-5 m-5 d-flex flex-column align-items-center">
          <h3 className="my-3 fw-bold">{title}</h3>
          {children}
        </div>
        <div className="p-5 bg-light d-flex flex-column align-items-center justify-content-center">
          <h3 className="h2 fw-bold my-4">{rightHeading}</h3>
          <Button onClick={rightBtnAction}>{rightBtnText}</Button>
        </div>
      </div>
    </Card>
  );
}

export default AuthCard;
