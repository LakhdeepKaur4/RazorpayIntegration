import React, { useState, useEffect,Fragment } from "react";
import { CustomInput } from "reactstrap";

const RadioBox = ({ prices, handleFilters, selectOption, setSelectOption }) => {
    const [value, setValue] = useState(0);
   
    const handleChange = event => {
        setSelectOption(event.currentTarget.name);
        handleFilters(event.target.value);
        setValue(event.target.value);
    };


    return (
     <Fragment>

        { prices.map((p, i) => (
        <div key={i} className="p-1">
           {p.name} <CustomInput
                onChange={handleChange}
                value={`${p._id}`}
                checked={selectOption === `${p.space}`}
                name={p.space}
                type="radio"
                className="float-right"
                id={`${p._id}`}
            />
        </div>
    ))
    }
   </Fragment>
)
};


export default RadioBox;
