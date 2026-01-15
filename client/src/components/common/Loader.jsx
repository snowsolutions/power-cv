import PropTypes from 'prop-types';

/**
 * Reusable Loader/Spinner Component
 * Supports different sizes and variants for various loading states
 */
function Loader({
    size = 'md',
    variant = 'spinner',
    fullScreen = false,
    text = '',
    className = '',
}) {
    // Size classes
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
    };

    // Spinner component
    const Spinner = () => (
        <svg
            className={`animate-spin ${sizeClasses[size]} ${className}`}
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
    );

    // Dots component
    const Dots = () => (
        <div className={`flex space-x-2 ${className}`}>
            <div
                className={`${sizeClasses[size]} bg-primary-600 rounded-full animate-bounce`}
                style={{ animationDelay: '0ms' }}
            ></div>
            <div
                className={`${sizeClasses[size]} bg-primary-600 rounded-full animate-bounce`}
                style={{ animationDelay: '150ms' }}
            ></div>
            <div
                className={`${sizeClasses[size]} bg-primary-600 rounded-full animate-bounce`}
                style={{ animationDelay: '300ms' }}
            ></div>
        </div>
    );

    // Pulse component
    const Pulse = () => (
        <div
            className={`${sizeClasses[size]} bg-primary-600 rounded-full animate-pulse ${className}`}
        ></div>
    );

    // Select variant
    const loaderVariants = {
        spinner: <Spinner />,
        dots: <Dots />,
        pulse: <Pulse />,
    };

    const loader = loaderVariants[variant] || loaderVariants.spinner;

    // Full screen loader
    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
                <div className="flex flex-col items-center gap-4">
                    {loader}
                    {text && (
                        <p className="text-gray-600 text-lg font-medium">
                            {text}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // Inline loader
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            {loader}
            {text && (
                <p className="text-gray-600 text-sm font-medium">{text}</p>
            )}
        </div>
    );
}

Loader.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    variant: PropTypes.oneOf(['spinner', 'dots', 'pulse']),
    fullScreen: PropTypes.bool,
    text: PropTypes.string,
    className: PropTypes.string,
};

export default Loader;
