import PropTypes from "prop-types";
import DOMPurify from "dompurify";

/**
 * Formatted Description Component
 * Handles rendering of text with bullet points, line breaks, and HTML content
 * @param {Object} props - Component props
 * @param {string} props.text - Text to format and display (can be plain text or HTML)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.idPrefix - Prefix for granular page break IDs
 * @param {Object} props.pageMargins - Map of IDs to top margins
 * @returns {JSX.Element} Formatted description component
 */
const FormattedDescription = ({
    text,
    className = "",
    idPrefix = "",
    pageMargins = {},
}) => {
    if (!text) return null;

    // Check if text contains HTML tags
    const containsHTML = /<[a-z][\s\S]*>/i.test(text);

    if (containsHTML) {
        // Sanitize and render HTML content
        const sanitizedHTML = DOMPurify.sanitize(text, {
            ALLOWED_TAGS: [
                "p",
                "br",
                "strong",
                "b",
                "em",
                "i",
                "u",
                "s",
                "strike",
                "ul",
                "ol",
                "li",
                "a",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "span",
                "div",
                "blockquote",
                "pre",
                "code",
            ],
            ALLOWED_ATTR: ["href", "target", "rel", "class", "style"],
        });

        const id = idPrefix ? `${idPrefix}-html` : "";
        const marginStyle =
            id && pageMargins[id] ? { marginTop: `${pageMargins[id]}px` } : {};

        return (
            <div
                id={id}
                style={marginStyle}
                className={`formatted-description formatted-html avoid-page-break ${className} ${id && pageMargins[id] ? "force-page-break" : ""}`}
                dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            />
        );
    }

    // Plain text handling below (original logic)
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
                            style={
                                id && pageMargins[id]
                                    ? { marginTop: `${pageMargins[id]}px` }
                                    : {}
                            }
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
                        style={
                            id && pageMargins[id]
                                ? { marginTop: `${pageMargins[id]}px` }
                                : {}
                        }
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
