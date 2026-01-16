import PropTypes from 'prop-types';
import { Sparkles, Loader2 } from 'lucide-react';

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
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Sparkles className="h-4 w-4" />
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
