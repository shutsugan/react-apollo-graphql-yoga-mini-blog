import React, { useState, useEffect } from 'react';

import './index.css';

const Field = ({
    name,
    type,
    required,
    pattern = /.*/,
    pattern_message,
    val,
    setter,
    placeholder
}) => {
    const [value, setValue] = useState(val);
    const [error, setError] = useState('');

    useEffect(_ => {setValue(val)}, [val]);

    const handleChange = ({target}) => {
        const { value } = target;

        setValue(value);
        setter(value);
    };

    const handleValidation = ({target}) => {
        const { value } = target;
        let message = '';

        if (!value.match(pattern)) message = pattern_message;
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
                type={type}
                value={value}
                required={required}
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleValidation}
            />
            {error && <span className="field__error">{error}</span>}
        </div>
    );
};

export default Field;
