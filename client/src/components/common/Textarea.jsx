import PropTypes from 'prop-types';

/**
 * Reusable Textarea Component
 * Supports labels, error messages, help text, and character count
 */
function Textarea({
    label,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    error,
    helpText,
    required = false,
    disabled = false,
    rows = 4,
    maxLength,
    showCharCount = false,
    className = '',
    textareaClassName = '',
    ...props
}) {
    const textareaId = name || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const charCount = value ? value.length : 0;

    return (
        <div className={`form-group ${className}`}>
            {label && (
                <label htmlFor={textareaId} className="form-label">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <textarea
                id={textareaId}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                rows={rows}
                maxLength={maxLength}
                className={`form-textarea ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${textareaClassName}`}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={
                    error
                        ? `${textareaId}-error`
                        : helpText
                        ? `${textareaId}-help`
                        : undefined
                }
                {...props}
            />
            <div className="flex justify-between items-start mt-1">
                <div className="flex-1">
                    {error && (
                        <p id={`${textareaId}-error`} className="form-error">
                            {error}
                        </p>
                    )}
                    {helpText && !error && (
                        <p id={`${textareaId}-help`} className="form-help">
                            {helpText}
                        </p>
                    )}
                </div>
                {showCharCount && maxLength && (
                    <p className="text-xs text-gray-500 ml-2">
                        {charCount}/{maxLength}
                    </p>
                )}
            </div>
        </div>
    );
}

Textarea.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    helpText: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    rows: PropTypes.number,
    maxLength: PropTypes.number,
    showCharCount: PropTypes.bool,
    className: PropTypes.string,
    textareaClassName: PropTypes.string,
};

export default Textarea;
