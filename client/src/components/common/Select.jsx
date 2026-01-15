import PropTypes from 'prop-types';

/**
 * Reusable Select Component
 * Supports labels, error messages, help text, and option groups
 */
function Select({
    label,
    name,
    value,
    onChange,
    onBlur,
    options = [],
    error,
    helpText,
    required = false,
    disabled = false,
    placeholder,
    className = '',
    selectClassName = '',
    ...props
}) {
    const selectId = name || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`form-group ${className}`}>
            {label && (
                <label htmlFor={selectId} className="form-label">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <select
                id={selectId}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
                disabled={disabled}
                className={`form-select ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${selectClassName}`}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={
                    error
                        ? `${selectId}-error`
                        : helpText
                        ? `${selectId}-help`
                        : undefined
                }
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => {
                    // Support both simple arrays and objects
                    if (typeof option === 'string') {
                        return (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        );
                    }
                    return (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </option>
                    );
                })}
            </select>
            {error && (
                <p id={`${selectId}-error`} className="form-error">
                    {error}
                </p>
            )}
            {helpText && !error && (
                <p id={`${selectId}-help`} className="form-help">
                    {helpText}
                </p>
            )}
        </div>
    );
}

Select.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    options: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                label: PropTypes.string.isRequired,
                disabled: PropTypes.bool,
            }),
        ])
    ),
    error: PropTypes.string,
    helpText: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    selectClassName: PropTypes.string,
};

export default Select;
