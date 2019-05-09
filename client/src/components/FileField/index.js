import React, { useState } from 'react';

import '../Field/index.css';

const FileField = ({
    name,
    required,
    setter,
    placeholder
}) => {
    const [error, setError] = useState('');

    const handleChange = ({target}) => {
        const { files } = target;

        setter(files);
    };

    const handleValidation = ({target}) => {
        const { value } = target;
        let message = '';

        if (required && !value) message = `Field is required`;

        setError(message);
    };

    return (
        <div className="field flex flex-column start mrb-16 relative">
            <label className={`
                field__label
                ${required ? 'field__label--required' : ''}
            `}>
                {name}
            </label>
            <input
                className={`
                    field__input full pd-16
                    ${error ? 'field__input--error' : ''}
                `}
                name={name}
                type="file"
                required={required}
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleValidation}
            />
            {error && <span className="field__error">{error}</span>}
        </div>
    );
};

export default FileField;
