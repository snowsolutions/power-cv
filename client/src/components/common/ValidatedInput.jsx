import { useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Validated Input Component
 * Reusable input field with inline validation
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {Function} props.validate - Validation function
 * @param {string} props.type - Input type (text, email, tel, url, etc.)
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.required - Whether field is required
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether input is disabled
 * @param {boolean} props.validateOnBlur - Validate only on blur (default: true)
 * @param {boolean} props.showValidIcon - Show checkmark when valid (default: false)
 * @returns {JSX.Element} Validated input component
 */
const ValidatedInput = ({
    label,
    value,
    onChange,
    validate,
    type = "text",
    placeholder = "",
    required = false,
    className = "",
    disabled = false,
    validateOnBlur = true,
    showValidIcon = false,
    ...rest
}) => {
    const [error, setError] = useState(null);
    const [touched, setTouched] = useState(false);
    const [isValid, setIsValid] = useState(false);

    // Validate value when it changes (if not validateOnBlur)
    useEffect(() => {
        if (!validateOnBlur && touched && validate) {
            const result = validate(value, required);
            setError(result.isValid ? null : result.error);
            setIsValid(result.isValid);
        }
    }, [value, validate, required, validateOnBlur, touched]);

    const handleBlur = () => {
        setTouched(true);
        if (validate) {
            const result = validate(value, required);
            setError(result.isValid ? null : result.error);
            setIsValid(result.isValid);
        }
    };

    const handleChange = (e) => {
        onChange(e);

        // Clear error when user starts typing
        if (error && !validateOnBlur) {
            setError(null);
        }
    };

    const handleFocus = () => {
        // Optionally clear error on focus
        if (validateOnBlur) {
            setError(null);
        }
    };

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                <input
                    type={type}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        error
                            ? "border-red-500 bg-red-50"
                            : touched && isValid && showValidIcon
                            ? "border-green-500"
                            : "border-gray-300"
                    } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    {...rest}
                />
                {/* Valid icon */}
                {touched && isValid && showValidIcon && !error && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg
                            className="w-5 h-5 text-green-500"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                )}
                {/* Error icon */}
                {error && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg
                            className="w-5 h-5 text-red-500"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                )}
            </div>
            {/* Error message */}
            {error && (
                <p className="mt-1 text-sm text-red-600 flex items-start gap-1">
                    <span className="flex-shrink-0 mt-0.5">⚠</span>
                    <span>{error}</span>
                </p>
            )}
        </div>
    );
};

ValidatedInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    validate: PropTypes.func,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    validateOnBlur: PropTypes.bool,
    showValidIcon: PropTypes.bool,
};

export default ValidatedInput;
