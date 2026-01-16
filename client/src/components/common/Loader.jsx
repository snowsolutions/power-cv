import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

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
        <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
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
