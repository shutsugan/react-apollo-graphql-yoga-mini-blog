import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import './index.css';


const Editor = ({ name, required, val, setter }) => {
    const [value, setValue] = useState(val);
    const [error, setError] = useState('');

    useEffect(_ => {setValue(val)}, [val]);

    const handleChange = value => {
        setValue(value);
        setter(value);
    };
    
    const handleValidation = _ => {
        let message = '';
        if (required && !value) message = `Field is required`;

        setError(message);
    };

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['link', 'image']
        ],
    };

    return (
        <div className="full flex flex-column start mrb-16 relative">
            <label className={`
                field__label 
                ${required ? 'field__label--required' : ''}
            `}>
                {name}
            </label>
            <ReactQuill
                className="full editor"
                value={value}
                modules={modules}
                onChange={handleChange}
                onBlur={handleValidation}
            />
            {error && <span className="field__error">{error}</span>}
        </div>
    );
};

export default Editor;