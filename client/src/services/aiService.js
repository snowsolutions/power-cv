/**
 * AI Service - OpenAI API Integration
 * Handles AI-powered content improvement for CV sections
 */

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_MODEL = import.meta.env.VITE_OPENAI_DEFAULT_MODEL || "gpt-4o-mini";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

/**
 * Improves CV content using OpenAI API
 * @param {string} currentContent - The current content to improve
 * @param {string} userPrompt - User's instructions for improvement
 * @param {string} sectionType - Type of section (e.g., 'introduction', 'workHistory')
 * @returns {Promise<{success: boolean, content?: string, error?: string}>}
 */
export async function improveContent(
    currentContent,
    userPrompt,
    sectionType = "general",
) {
    if (!OPENAI_API_KEY) {
        return {
            success: false,
            error: "OpenAI API key is not configured. Please set VITE_OPENAI_API_KEY in your environment.",
        };
    }

    // Strip HTML tags for cleaner processing
    const plainTextContent = currentContent.replace(/<[^>]*>/g, "");

    const systemPrompt = getSystemPrompt(sectionType);

    const messages = [
        {
            role: "system",
            content: systemPrompt,
        },
        {
            role: "user",
            content: `Here is my current CV content:\n\n${plainTextContent}\n\nUser's request: ${userPrompt}\n\nPlease improve this content based on the user's request. Return ONLY the improved content without any explanations or markdown formatting.`,
        },
    ];

    try {
        const response = await fetch(OPENAI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: OPENAI_MODEL,
                messages,
                temperature: 0.7,
                max_tokens: 2000,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage =
                errorData.error?.message ||
                `API request failed with status ${response.status}`;
            console.error("OpenAI API Error:", errorMessage);
            return {
                success: false,
                error: errorMessage,
            };
        }

        const data = await response.json();
        const improvedContent = data.choices?.[0]?.message?.content?.trim();

        if (!improvedContent) {
            return {
                success: false,
                error: "No content received from AI",
            };
        }

        return {
            success: true,
            content: improvedContent,
        };
    } catch (error) {
        console.error("AI Service Error:", error);
        return {
            success: false,
            error: error.message || "Failed to connect to AI service",
        };
    }
}

/**
 * Get system prompt based on section type
 * @param {string} sectionType
 * @returns {string}
 */
function getSystemPrompt(sectionType) {
    const basePrompt = `You are an expert CV/resume writer and career coach. Your task is to improve CV content to make it more professional, impactful, and engaging for recruiters and hiring managers.

Guidelines:
- Use strong action verbs
- Quantify achievements when possible
- Keep content concise and impactful
- Maintain a professional tone
- Focus on accomplishments rather than just responsibilities
- Use industry-appropriate language`;

    const sectionPrompts = {
        introduction: `${basePrompt}

For the Professional Profile/Introduction section:
- Create a compelling summary that highlights key strengths
- Keep it to 3-5 impactful sentences
- Focus on unique value proposition
- Include relevant skills and experience level`,

        workHistory: `${basePrompt}

For Work History/Career Summary descriptions:
- Start bullet points with strong action verbs
- Quantify results and achievements (percentages, numbers, metrics)
- Focus on impact and accomplishments
- Use the STAR method (Situation, Task, Action, Result) where applicable
- Keep bullet points concise but informative`,

        general: basePrompt,
    };

    return sectionPrompts[sectionType] || sectionPrompts.general;
}

/**
 * Convert plain text to basic HTML formatting
 * Preserves line breaks and basic structure
 * @param {string} text
 * @returns {string}
 */
export function textToHtml(text) {
    if (!text) return "";

    // Split by double newlines for paragraphs
    const paragraphs = text.split(/\n\n+/);

    return paragraphs
        .map((para) => {
            // Check if it's a list (starts with bullet or number)
            const lines = para.split("\n");
            const isList = lines.every(
                (line) => /^[\s]*[•\-*\d+.]\s/.test(line) || line.trim() === "",
            );

            if (isList && lines.filter((l) => l.trim()).length > 0) {
                const listItems = lines
                    .filter((line) => line.trim())
                    .map(
                        (line) =>
                            `<li>${line.replace(/^[\s]*[•\-*\d+.]\s*/, "")}</li>`,
                    )
                    .join("");
                return `<ul>${listItems}</ul>`;
            }

            // Regular paragraph
            return `<p>${para.replace(/\n/g, "<br>")}</p>`;
        })
        .join("");
}

export default {
    improveContent,
    textToHtml,
};
