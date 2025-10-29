import React, { useState } from 'react';
import "https://esm.run/mathlive";

const FormulaEditor = () => {
    const [value, setValue] = useState("");
    return (
        <div className='w-full'>
            <math-field 
                style= {{
                    width: "100% "
                }}
                onInput={evt => setValue(evt.target.value)}
            >
                {value}
            </math-field>
            <p>Value: {value}</p>
        </div>
    );
};

export default FormulaEditor;