import './button.styles.scss';

const Button = ({ children, isLoading, buttonType, ...otherProps }) => {
  return (
    <button
      disabled={isLoading}
      className={`button-container ${buttonType}`}
      {...otherProps}
    >
      {isLoading ? 'Processing...' : children}
    </button>
  );
};

export default Button;
