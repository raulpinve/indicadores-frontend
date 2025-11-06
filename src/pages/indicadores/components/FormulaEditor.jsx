import React, { useEffect, useState } from "react";
import "https://esm.run/mathlive";

const RESERVED = new Set([
  "sin","cos","tan","asin","acos","atan","log","ln","sqrt","abs","max","min","exp",
  "pow","pi","e","sum","int","lim","frac","left","right","cdot","times","begin","end",
  "frac","over","imaginaryI","cccc","exponentialE","x","y","i"
]);

const FormulaEditor = ({ valueFormula, setValueFormula, variables = [], setError, clearErrors, errors }) => {
  const aliasRegex = /\b[A-Za-z_]+\b/g;

  const obtenerVariablesUsadas = (formula) => {
    if (!formula) return [];
    const coincidencias = formula.match(aliasRegex) || [];
    const usadas = coincidencias.filter(c => !RESERVED.has(c.toLowerCase()));
    return [...new Set(usadas)];
  };

  useEffect(() => {
    const usadas = obtenerVariablesUsadas(valueFormula);
    const declaradas = variables.map(v => v.alias.trim());
    const faltantes = usadas.filter(u => !declaradas.includes(u));

    clearErrors("formulaLaTex");

    // ⚙️ si hay alguna variable "rara" o faltante => advertencia general
    if(faltantes.length > 0){
      setError("formulaLaTex", {
        type: "manual", 
        message: "⚠️ La fórmula contiene variables no declaradas o símbolos no válidos."
      })
    }
  }, [valueFormula, variables]);

  const styleCorrecto = errors.formulaLaTex ? {
    width: "100%",
    border: "1px solid #dc2626",  
    boxShadow: "0 0 0 3px rgba(252, 165, 165, 0.5)",
  }:{
    width: "100%"
  }

  return (
    <div className="w-full">
      <h4 className='font-semibold mt-6'>Fórmula</h4>
      <math-field
        style={styleCorrecto}
        onInput={(evt) => {
          setValueFormula(evt.target.value)
        }}
      >
        {valueFormula}
      </math-field>
      {(errors.formulaLaTex && errors.formulaLaTex.message) && (
        <p className="input-message-error">{errors.formulaLaTex.message}</p>
      )}
    </div>
  );
};

export default FormulaEditor;
