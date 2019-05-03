import React from 'react';

const FormHead = ({title, subTitle}) => (
    <>
        <h2 className="title center mr-none">{title}</h2>
        <h3 className="sub-title mr-none mrb-16">
            {subTitle}
        </h3>
    </>
);

export default FormHead;