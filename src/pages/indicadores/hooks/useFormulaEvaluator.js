import { useMemo } from "react";
import { ComputeEngine } from "@cortex-js/compute-engine";

export function useFormulaEvaluator() {
  const ce = useMemo(() => new ComputeEngine(), []);

  const evaluarFormula = (latex, variables = []) => {
    try {
      let formula = latex;

      variables.forEach(v => {
        const regex = new RegExp(`\\b${v.alias}\\b`, "g");
        formula = formula.replace(regex, v.valor);
      });
      const expr = ce.parse(formula);
      const result = expr.N().valueOf();
      return result;
    } catch (err) {
      console.error("Error evaluando fórmula:", err);
      return null;
    }
  };

  return evaluarFormula;
}
