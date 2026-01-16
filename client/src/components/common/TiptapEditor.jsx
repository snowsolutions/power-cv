import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import PropTypes from "prop-types";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Link2,
    Heading1,
    Heading2,
    Strikethrough,
} from "lucide-react";

const MenuButton = ({ onClick, active, disabled, children, title }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={`p-2 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${
            active ? "bg-blue-100 text-blue-600" : "text-gray-600"
        }`}
        type="button"
    >
        {children}
    </button>
);

MenuButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
};

const TiptapEditor = ({
    content,
    onChange,
    placeholder = "Start typing...",
    showHeadings = true,
    minHeight = "200px"
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-600 underline",
                },
            }),
        ],
        content: content || "",
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange(html);
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none focus:outline-none p-4",
                style: `min-height: ${minHeight}`,
            },
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content || "");
        }
    }, [content, editor]);

    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        if (url === null) {
            return;
        }

        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    };

    return (
        <div className="tiptap-editor-wrapper">
            {/* Toolbar */}
            <div className="border border-gray-300 rounded-t-md bg-gray-50 p-2 flex flex-wrap gap-1">
                {showHeadings && (
                    <>
                        <MenuButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 1 })
                                    .run()
                            }
                            active={editor.isActive("heading", { level: 1 })}
                            title="Heading 1"
                        >
                            <Heading1 className="w-4 h-4" />
                        </MenuButton>
                        <MenuButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 2 })
                                    .run()
                            }
                            active={editor.isActive("heading", { level: 2 })}
                            title="Heading 2"
                        >
                            <Heading2 className="w-4 h-4" />
                        </MenuButton>
                        <div className="w-px h-6 bg-gray-300 mx-1" />
                    </>
                )}
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive("bold")}
                    title="Bold"
                >
                    <Bold className="w-4 h-4" />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive("italic")}
                    title="Italic"
                >
                    <Italic className="w-4 h-4" />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    active={editor.isActive("strike")}
                    title="Strikethrough"
                >
                    <Strikethrough className="w-4 h-4" />
                </MenuButton>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    active={editor.isActive("bulletList")}
                    title="Bullet List"
                >
                    <List className="w-4 h-4" />
                </MenuButton>
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    active={editor.isActive("orderedList")}
                    title="Numbered List"
                >
                    <ListOrdered className="w-4 h-4" />
                </MenuButton>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <MenuButton
                    onClick={setLink}
                    active={editor.isActive("link")}
                    title="Add Link"
                >
                    <Link2 className="w-4 h-4" />
                </MenuButton>
            </div>

            {/* Editor Content */}
            <div className="border border-t-0 border-gray-300 rounded-b-md bg-white">
                <EditorContent editor={editor} />
            </div>

            {/* Custom Styles */}
            <style>{`
                .tiptap-editor-wrapper .ProseMirror {
                    min-height: ${minHeight};
                }

                .tiptap-editor-wrapper .ProseMirror:focus {
                    outline: none;
                }

                .tiptap-editor-wrapper .ProseMirror p.is-editor-empty:first-child::before {
                    color: #9ca3af;
                    content: "${placeholder}";
                    float: left;
                    height: 0;
                    pointer-events: none;
                }

                .tiptap-editor-wrapper .ProseMirror h1 {
                    font-size: 1.5em;
                    font-weight: bold;
                    margin-top: 0.5em;
                    margin-bottom: 0.5em;
                }

                .tiptap-editor-wrapper .ProseMirror h2 {
                    font-size: 1.25em;
                    font-weight: bold;
                    margin-top: 0.5em;
                    margin-bottom: 0.5em;
                }

                .tiptap-editor-wrapper .ProseMirror h3 {
                    font-size: 1.1em;
                    font-weight: bold;
                    margin-top: 0.5em;
                    margin-bottom: 0.5em;
                }

                .tiptap-editor-wrapper .ProseMirror ul,
                .tiptap-editor-wrapper .ProseMirror ol {
                    padding-left: 1.5em;
                    margin: 0.5em 0;
                }

                .tiptap-editor-wrapper .ProseMirror ul {
                    list-style-type: disc;
                }

                .tiptap-editor-wrapper .ProseMirror ol {
                    list-style-type: decimal;
                }

                .tiptap-editor-wrapper .ProseMirror li {
                    margin: 0.25em 0;
                }

                .tiptap-editor-wrapper .ProseMirror a {
                    color: #2563eb;
                    text-decoration: underline;
                    cursor: pointer;
                }

                .tiptap-editor-wrapper .ProseMirror a:hover {
                    color: #1d4ed8;
                }

                .tiptap-editor-wrapper .ProseMirror strong {
                    font-weight: bold;
                }

                .tiptap-editor-wrapper .ProseMirror em {
                    font-style: italic;
                }

                .tiptap-editor-wrapper .ProseMirror s {
                    text-decoration: line-through;
                }

                .tiptap-editor-wrapper .ProseMirror p {
                    margin: 0.5em 0;
                }

                .tiptap-editor-wrapper .ProseMirror p:first-child {
                    margin-top: 0;
                }

                .tiptap-editor-wrapper .ProseMirror p:last-child {
                    margin-bottom: 0;
                }
            `}</style>
        </div>
    );
};

TiptapEditor.propTypes = {
    content: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    showHeadings: PropTypes.bool,
    minHeight: PropTypes.string,
};

export default TiptapEditor;
