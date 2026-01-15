import PropTypes from 'prop-types';

/**
 * Reusable Button Component
 * Supports multiple variants, sizes, and states
 */
function Button({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    onClick,
    className = '',
    ...props
}) {
    // Base classes
    const baseClasses = 'btn';

    // Variant classes
    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline',
        danger: 'btn-danger',
    };

    // Size classes
    const sizeClasses = {
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg',
    };

    // Combine all classes
    const buttonClasses = [
        baseClasses,
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || '',
        fullWidth ? 'w-full' : '',
        disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            type={type}
            className={buttonClasses}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <span>{children}</span>
                </span>
            ) : (
                children
            )}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    fullWidth: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default Button;
