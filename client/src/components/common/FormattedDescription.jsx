import PropTypes from "prop-types";

/**
 * Formatted Description Component
 * Handles rendering of text with bullet points and line breaks
 * @param {Object} props - Component props
 * @param {string} props.text - Text to format and display
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.idPrefix - Prefix for granular page break IDs
 * @param {Object} props.pageMargins - Map of IDs to top margins
 * @returns {JSX.Element} Formatted description component
 */
const FormattedDescription = ({ text, className = "", idPrefix = "", pageMargins = {} }) => {
    if (!text) return null;

    // Split text into lines
    const lines = text.split("\n").filter((line) => line.trim() !== "");

    // Check if text contains bullet points
    const hasBullets = lines.some(
        (line) =>
            line.trim().startsWith("•") ||
            line.trim().startsWith("*") ||
            line.trim().startsWith("-"),
    );

    if (hasBullets) {
        // Render as bullet list
        return (
            <ul
                className={`list-none space-y-2 formatted-description avoid-page-break ${className}`}
            >
                {lines.map((line, index) => {
                    // Remove bullet character if present
                    const cleanLine = line.trim().replace(/^[•\-*]\s*/, "");

                    if (!cleanLine) return null;
                    const id = idPrefix ? `${idPrefix}-li-${index}` : "";

                    return (
                        <li
                            key={index}
                            id={id}
                            style={id && pageMargins[id] ? { marginTop: `${pageMargins[id]}px` } : {}}
                            className={`flex items-start gap-2 avoid-page-break ${id && pageMargins[id] ? "force-page-break" : ""}`}
                        >
                            <span className="text-current mt-1 flex-shrink-0">
                                •
                            </span>
                            <span className="flex-1">{cleanLine}</span>
                        </li>
                    );
                })}
            </ul>
        );
    }

    // Render as paragraphs with line breaks
    return (
        <div className={`formatted-description avoid-page-break ${className}`}>
            {lines.map((line, index) => {
                const id = idPrefix ? `${idPrefix}-p-${index}` : "";
                return (
                    <p
                        key={index}
                        id={id}
                        style={id && pageMargins[id] ? { marginTop: `${pageMargins[id]}px` } : {}}
                        className={`avoid-page-break ${index > 0 ? "mt-2" : ""} ${id && pageMargins[id] ? "force-page-break" : ""}`}
                    >
                        {line}
                    </p>
                );
            })}
        </div>
    );
};

FormattedDescription.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    idPrefix: PropTypes.string,
    pageMargins: PropTypes.object,
};

export default FormattedDescription;
