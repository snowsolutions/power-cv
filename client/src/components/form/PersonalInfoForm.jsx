import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { X, User, Info } from "lucide-react";
import { SectionTitleEditor, ValidatedInput } from "../common";
import { DEFAULT_SECTION_TITLES } from "../../utils/constants";
import {
    validateEmail,
    validatePhone,
    validateText,
} from "../../utils/validation";

const PersonalInfoForm = ({ personalInfo, onUpdate, onUpdateSectionTitle }) => {
    const [avatarPreview, setAvatarPreview] = useState(
        personalInfo.avatar || "",
    );

    // Sync avatarPreview with personalInfo.avatar when it changes
    useEffect(() => {
        setAvatarPreview(personalInfo.avatar || "");
    }, [personalInfo.avatar]);

    const handleFieldChange = (field, value) => {
        onUpdate(field, value);
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                alert("Please upload an image file");
                return;
            }

            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert("Image size should be less than 2MB");
                return;
            }

            // Convert to base64 for preview and storage
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setAvatarPreview(base64String);
                handleFieldChange("avatar", base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveAvatar = () => {
        setAvatarPreview("");
        handleFieldChange("avatar", "");
        // Reset file input
        const fileInput = document.getElementById("avatar-upload");
        if (fileInput) {
            fileInput.value = "";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Section Title */}
            <SectionTitleEditor
                sectionKey="personalInfo"
                currentTitle={personalInfo.sectionTitle}
                defaultTitle={DEFAULT_SECTION_TITLES.personalInfo}
                onUpdate={onUpdateSectionTitle}
            />
            <p className="text-sm text-gray-500 -mt-4 mb-6">
                Enter your personal information
            </p>

            {/* Avatar Upload Section */}
            <div className="mb-6 flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Photo
                    </label>
                    <div className="relative">
                        {avatarPreview ? (
                            <div className="relative group">
                                <img
                                    src={avatarPreview}
                                    alt="Avatar preview"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                                />
                                <button
                                    onClick={handleRemoveAvatar}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                    title="Remove photo"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-gray-200 flex items-center justify-center">
                                <User className="w-16 h-16 text-gray-400" />
                            </div>
                        )}
                    </div>
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                    />
                    <label
                        htmlFor="avatar-upload"
                        className="mt-3 block w-32 text-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 cursor-pointer transition-colors"
                    >
                        {avatarPreview ? "Change Photo" : "Upload Photo"}
                    </label>
                    <p className="mt-2 text-xs text-gray-500 text-center">
                        Max 2MB
                    </p>
                </div>

                {/* Personal Info Fields */}
                <div className="flex-grow w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ValidatedInput
                            label="Full Name"
                            value={personalInfo.name || ""}
                            onChange={(e) =>
                                handleFieldChange("name", e.target.value)
                            }
                            placeholder="John Doe"
                            required
                            validate={(value) => {
                                if (!value || value.trim() === "") {
                                    return {
                                        isValid: false,
                                        error: "Name is required",
                                    };
                                }
                                if (value.trim().length < 2) {
                                    return {
                                        isValid: false,
                                        error: "Name must be at least 2 characters",
                                    };
                                }
                                return { isValid: true };
                            }}
                            showValidIcon={true}
                        />

                        <ValidatedInput
                            label="Email"
                            type="email"
                            value={personalInfo.email || ""}
                            onChange={(e) =>
                                handleFieldChange("email", e.target.value)
                            }
                            placeholder="john.doe@example.com"
                            validate={validateEmail}
                            showValidIcon={true}
                        />

                        <ValidatedInput
                            label="Phone"
                            type="tel"
                            value={personalInfo.phone || ""}
                            onChange={(e) =>
                                handleFieldChange("phone", e.target.value)
                            }
                            placeholder="+1 (555) 123-4567"
                            validate={validatePhone}
                            showValidIcon={true}
                        />

                        <ValidatedInput
                            label="Address"
                            value={personalInfo.address || ""}
                            onChange={(e) =>
                                handleFieldChange("address", e.target.value)
                            }
                            placeholder="City, Country"
                            validate={(value) =>
                                validateText(value, "Address", 200)
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Info Box */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                        <p className="font-medium">Tips:</p>
                        <ul className="mt-1 list-disc list-inside space-y-1">
                            <li>
                                Your photo should be professional and recent
                            </li>
                            <li>
                                Use a valid email address for professional
                                contact
                            </li>
                            <li>All changes are saved automatically</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

PersonalInfoForm.propTypes = {
    personalInfo: PropTypes.shape({
        sectionTitle: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onUpdateSectionTitle: PropTypes.func.isRequired,
};

export default PersonalInfoForm;
