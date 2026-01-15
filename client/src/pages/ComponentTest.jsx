import { useState } from 'react';
import { Button, Input, Textarea, Select, Modal, Loader } from '../components/common';

function ComponentTest() {
    const [inputValue, setInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const selectOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const handleLoadingTest = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="page-container">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    Common UI Components Test Page
                </h1>

                {/* Button Components */}
                <section className="card mb-8">
                    <div className="card-header">
                        <h2 className="section-title">Buttons</h2>
                    </div>
                    <div className="card-body">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Variants
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    <Button variant="primary">Primary</Button>
                                    <Button variant="secondary">Secondary</Button>
                                    <Button variant="outline">Outline</Button>
                                    <Button variant="danger">Danger</Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Sizes
                                </h3>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Button size="sm">Small</Button>
                                    <Button size="md">Medium</Button>
                                    <Button size="lg">Large</Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    States
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    <Button disabled>Disabled</Button>
                                    <Button loading>Loading</Button>
                                    <Button fullWidth>Full Width</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Input Components */}
                <section className="card mb-8">
                    <div className="card-header">
                        <h2 className="section-title">Inputs</h2>
                    </div>
                    <div className="card-body">
                        <div className="space-y-4 max-w-2xl">
                            <Input
                                label="Basic Input"
                                name="basic"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter some text..."
                            />

                            <Input
                                label="Required Input"
                                name="required"
                                required
                                placeholder="This field is required"
                                helpText="This is a required field"
                            />

                            <Input
                                label="Input with Error"
                                name="error"
                                error="This field has an error"
                                placeholder="Error state"
                            />

                            <Input
                                label="Disabled Input"
                                name="disabled"
                                disabled
                                value="This is disabled"
                            />

                            <Input
                                label="Email Input"
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                                helpText="We'll never share your email"
                            />
                        </div>
                    </div>
                </section>

                {/* Textarea Components */}
                <section className="card mb-8">
                    <div className="card-header">
                        <h2 className="section-title">Textareas</h2>
                    </div>
                    <div className="card-body">
                        <div className="space-y-4 max-w-2xl">
                            <Textarea
                                label="Basic Textarea"
                                name="basic-textarea"
                                value={textareaValue}
                                onChange={(e) => setTextareaValue(e.target.value)}
                                placeholder="Enter multiple lines of text..."
                                rows={4}
                            />

                            <Textarea
                                label="Textarea with Character Count"
                                name="char-count"
                                maxLength={200}
                                showCharCount
                                placeholder="Maximum 200 characters"
                                helpText="Limited to 200 characters"
                            />

                            <Textarea
                                label="Textarea with Error"
                                name="error-textarea"
                                error="This field is required"
                                rows={3}
                            />
                        </div>
                    </div>
                </section>

                {/* Select Components */}
                <section className="card mb-8">
                    <div className="card-header">
                        <h2 className="section-title">Select Dropdowns</h2>
                    </div>
                    <div className="card-body">
                        <div className="space-y-4 max-w-2xl">
                            <Select
                                label="Basic Select"
                                name="basic-select"
                                value={selectValue}
                                onChange={(e) => setSelectValue(e.target.value)}
                                options={selectOptions}
                                placeholder="Choose an option..."
                            />

                            <Select
                                label="Required Select"
                                name="required-select"
                                options={['Apple', 'Banana', 'Cherry', 'Date']}
                                required
                                placeholder="Select a fruit"
                                helpText="Please select one option"
                            />

                            <Select
                                label="Select with Error"
                                name="error-select"
                                options={selectOptions}
                                error="Please select an option"
                            />

                            <Select
                                label="Disabled Select"
                                name="disabled-select"
                                options={selectOptions}
                                disabled
                                value="option1"
                            />
                        </div>
                    </div>
                </section>

                {/* Modal Components */}
                <section className="card mb-8">
                    <div className="card-header">
                        <h2 className="section-title">Modals</h2>
                    </div>
                    <div className="card-body">
                        <div className="space-y-4">
                            <Button onClick={() => setIsModalOpen(true)}>
                                Open Modal
                            </Button>

                            <Modal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                title="Example Modal"
                                size="md"
                                footer={
                                    <div className="flex justify-end gap-3">
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="primary"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Confirm
                                        </Button>
                                    </div>
                                }
                            >
                                <div className="space-y-4">
                                    <p className="text-gray-700">
                                        This is a modal dialog. It can contain any
                                        content you want.
                                    </p>
                                    <Input
                                        label="Name"
                                        placeholder="Enter your name"
                                    />
                                    <Textarea
                                        label="Message"
                                        placeholder="Enter your message"
                                        rows={4}
                                    />
                                </div>
                            </Modal>
                        </div>
                    </div>
                </section>

                {/* Loader Components */}
                <section className="card mb-8">
                    <div className="card-header">
                        <h2 className="section-title">Loaders</h2>
                    </div>
                    <div className="card-body">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                    Spinner Variant
                                </h3>
                                <div className="flex flex-wrap items-center gap-8">
                                    <Loader size="sm" variant="spinner" />
                                    <Loader size="md" variant="spinner" />
                                    <Loader size="lg" variant="spinner" />
                                    <Loader size="xl" variant="spinner" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                    Dots Variant
                                </h3>
                                <div className="flex flex-wrap items-center gap-8">
                                    <Loader size="sm" variant="dots" />
                                    <Loader size="md" variant="dots" />
                                    <Loader size="lg" variant="dots" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                    Pulse Variant
                                </h3>
                                <div className="flex flex-wrap items-center gap-8">
                                    <Loader size="sm" variant="pulse" />
                                    <Loader size="md" variant="pulse" />
                                    <Loader size="lg" variant="pulse" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                    With Text
                                </h3>
                                <Loader
                                    size="md"
                                    variant="spinner"
                                    text="Loading..."
                                />
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                    Full Screen (Click to test)
                                </h3>
                                <Button onClick={handleLoadingTest}>
                                    Test Full Screen Loader (3s)
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Current Values */}
                <section className="card">
                    <div className="card-header">
                        <h2 className="section-title">Current Values (Debug)</h2>
                    </div>
                    <div className="card-body">
                        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                            <div>
                                <strong>Input Value:</strong>{' '}
                                {inputValue || '(empty)'}
                            </div>
                            <div>
                                <strong>Textarea Value:</strong>{' '}
                                {textareaValue || '(empty)'}
                            </div>
                            <div>
                                <strong>Select Value:</strong>{' '}
                                {selectValue || '(empty)'}
                            </div>
                            <div>
                                <strong>Modal Open:</strong>{' '}
                                {isModalOpen ? 'Yes' : 'No'}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Full Screen Loader */}
            {isLoading && (
                <Loader
                    fullScreen
                    size="xl"
                    variant="spinner"
                    text="Loading, please wait..."
                />
            )}
        </div>
    );
}

export default ComponentTest;
