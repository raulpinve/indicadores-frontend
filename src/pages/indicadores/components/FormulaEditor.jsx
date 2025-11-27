import React, { useEffect, useState } from "react";
// import "https://esm.run/mathlive";
// import "mathlive/dist/mathlive.min.css";
import { MathfieldElement } from "mathlive";
MathfieldElement.fontsDirectory = '/node_modules/mathlive/fonts';

const RESERVED = new Set([
  "sin","cos","tan","asin","acos","atan","log","ln","sqrt","abs","max","min","exp",
  "pow","pi","e","sum","int","lim","frac","left","right","cdot","times","begin","end",
  "frac","over","imaginaryI","cccc","exponentialE","x","y","i"
]);

const FormulaEditor = ({ valueFormula, setValueFormula, variables = [], setError, clearErrors, errors }) => {
  const aliasRegex = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g;

  const obtenerVariablesUsadas = (formula) => {
    if (!formula) return [];
    const coincidencias = formula.match(aliasRegex) || [];
    const usadas = coincidencias.filter(c => !RESERVED.has(c.toLowerCase()));
    return [...new Set(usadas)];
  };

  useEffect(() => {
    let usadas = obtenerVariablesUsadas(valueFormula).map(u => u.toLowerCase());
    let declaradas = variables.map(v => v.alias.trim().toLowerCase());

    const faltantes = usadas.filter(u => !declaradas.includes(u));

    const hayFaltantes = faltantes.length > 0;

    if (hayFaltantes) {
      if (!errors.formulaLaTex) {
        setError("formulaLaTex", {
          type: "manual",
          message: "⚠️ La fórmula contiene variables no declaradas o símbolos no válidos."
        });
      }
    } else {
      if (errors.formulaLaTex) {
        clearErrors("formulaLaTex");
      }
    }
  }, [valueFormula, variables, errors?.formulaLaTex]);

  const styleCorrecto = errors.formulaLaTex ? {
    width: "100%",
    border: "1px solid #dc2626",  
    boxShadow: "0 0 0 3px rgba(252, 165, 165, 0.5)",
  }:{
    width: "100%"
  }

  return (
    <div className="w-full">
      <h4 className='font-semibold'>Fórmula</h4>
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
