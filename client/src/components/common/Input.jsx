import PropTypes from 'prop-types';

/**
 * Reusable Input Component
 * Supports labels, error messages, help text, and various input types
 */
function Input({
    label,
    name,
    type = 'text',
    value,
    onChange,
    onBlur,
    placeholder,
    error,
    helpText,
    required = false,
    disabled = false,
    className = '',
    inputClassName = '',
    ...props
}) {
    const inputId = name || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`form-group ${className}`}>
            {label && (
                <label htmlFor={inputId} className="form-label">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                id={inputId}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`form-input ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${inputClassName}`}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={
                    error
                        ? `${inputId}-error`
                        : helpText
                        ? `${inputId}-help`
                        : undefined
                }
                {...props}
            />
            {error && (
                <p id={`${inputId}-error`} className="form-error">
                    {error}
                </p>
            )}
            {helpText && !error && (
                <p id={`${inputId}-help`} className="form-help">
                    {helpText}
                </p>
            )}
        </div>
    );
}

Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    helpText: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
};

export default Input;
