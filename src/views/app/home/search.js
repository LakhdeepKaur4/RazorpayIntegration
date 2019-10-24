import React, { useState, useEffect } from "react";
import { getCategories, list,getFilteredProducts } from "../core/apiCore";
import Card from "../core/RelatedProducts";
import Autocomplete from "../core/Autocomplete";

const Search = ({results}) => {

    const searchedProducts = (results = []) => {
        return (
            <div>
                <div className="col-6">
                    {results.map((product, i) => (
                        <Card key={i} product={product} />
                    ))}
                </div>
            </div>
        );
    };



    return (
        <div className="container pl-0 pr-0">
        <div className="row">
            <div className="col-12 mt-5">
                {searchedProducts(results)}
            </div>
          
        </div>
        </div>
    );
};

export default Search;
