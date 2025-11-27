import { useMemo } from "react";
import { ComputeEngine } from "@cortex-js/compute-engine";

export function useFormulaEvaluator() {
  const ce = useMemo(() => new ComputeEngine(), []);

  const evaluarFormula = (latex, variables = []) => {
    try {
      if (!latex || typeof latex !== "string") return null;

      let formula = latex;

      variables.forEach(v => {
        if (v.valor === undefined || v.valor === null) return;
        const regex = new RegExp(`\\b${v.alias}\\b`, "g");
        formula = formula.replace(regex, v.valor);
      });

      const expr = ce.parse(formula);
      const result = expr.N().valueOf();

      // Validación de seguridad contra NaN, Infinity, errores
      if (result === null || result === undefined || Number.isNaN(result) || !isFinite(result)) {
        return null;
      }

      return result;
    } catch {
      return null;
    }
  };
  return evaluarFormula;
}
