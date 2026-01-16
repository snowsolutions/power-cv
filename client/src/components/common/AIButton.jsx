import PropTypes from 'prop-types';

/**
 * AI Button Component
 * A small button with a sparkle/AI icon to trigger AI-powered improvements
 */
function AIButton({ onClick, disabled = false, loading = false, className = '', title = 'Improve with AI' }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled || loading}
            title={title}
            className={`
                inline-flex items-center justify-center
                w-8 h-8 rounded-lg
                bg-gradient-to-r from-purple-500 to-indigo-500
                hover:from-purple-600 hover:to-indigo-600
                text-white shadow-sm
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:shadow-md hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                ${className}
            `}
        >
            {loading ? (
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
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            ) : (
                <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Sparkle/Stars icon */}
                    <path
                        d="M12 2L13.09 8.26L19 9.27L14.55 13.14L15.82 19.02L12 16.14L8.18 19.02L9.45 13.14L5 9.27L10.91 8.26L12 2Z"
                        fill="currentColor"
                    />
                    <path
                        d="M5 3L5.5 5L7.5 5.5L5.5 6L5 8L4.5 6L2.5 5.5L4.5 5L5 3Z"
                        fill="currentColor"
                        opacity="0.7"
                    />
                    <path
                        d="M19 14L19.5 16L21.5 16.5L19.5 17L19 19L18.5 17L16.5 16.5L18.5 16L19 14Z"
                        fill="currentColor"
                        opacity="0.7"
                    />
                </svg>
            )}
        </button>
    );
}

AIButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    className: PropTypes.string,
    title: PropTypes.string,
};

export default AIButton;
