import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../services/api";

interface AIGeneratorProps {
  clienteId: number;
  onRutinaGenerada?: (rutina: any) => void;
  onDietaGenerada?: (dieta: any) => void;
  onClose: () => void;
  allowedTypes?: ("Rutina" | "Dieta" | "Ambos")[];
  defaultType?: "Rutina" | "Dieta" | "Ambos";
}

interface AIRequestConfiguracion {
  nivelDificultad: string;
  tipoDieta: string;
  enfoqueRutina: string;
  incluirCardio: boolean;
  incluirFlexibilidad: boolean;
  caloriasObjetivo: number;
  proteinaObjetivo?: number;
  carbohidratosObjetivo?: number;
  grasasObjetivo?: number;
}

const AIGenerator: React.FC<AIGeneratorProps> = ({
  clienteId,
  onRutinaGenerada,
  onDietaGenerada,
  onClose,
  allowedTypes = ["Rutina", "Dieta", "Ambos"],
  defaultType,
}) => {
  const { t } = useTranslation();
  const [tipoGeneracion, setTipoGeneracion] = useState<
    "Rutina" | "Dieta" | "Ambos"
  >(defaultType || allowedTypes[0] || "Ambos");
  const [configuracion, setConfiguracion] = useState<AIRequestConfiguracion>({
    nivelDificultad: "Intermedio",
    tipoDieta: "Equilibrada",
    enfoqueRutina: "Mixto",
    incluirCardio: true,
    incluirFlexibilidad: true,
    caloriasObjetivo: 2000,
    proteinaObjetivo: 1.6,
    carbohidratosObjetivo: 45,
    grasasObjetivo: 25,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handleGenerar = async () => {
    setIsGenerating(true);
    setError("");
    setResultado(null);

    try {
      let endpoint = "";
      switch (tipoGeneracion) {
        case "Rutina":
          endpoint = `/ai/generar-rutina/${clienteId}`;
          break;
        case "Dieta":
          endpoint = `/ai/generar-dieta/${clienteId}`;
          break;
        case "Ambos":
          endpoint = `/ai/generar/${clienteId}`;
          break;
      }

      const response = await api.post(endpoint, configuracion);

      if (response.data.success) {
        setResultado(response.data.data);
      } else {
        setError(response.data.message || "Error al generar con IA");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Error al conectar con el servicio de IA"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGuardarRutina = async () => {
    if (!resultado?.rutina) return;

    try {
      const response = await api.post(
        `/ai/guardar-rutina/${clienteId}`,
        resultado.rutina
      );

      if (response.data.success) {
        onRutinaGenerada?.(resultado.rutina);
        onClose();
      } else {
        setError("Error al guardar la rutina");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al guardar la rutina");
    }
  };

  const handleGuardarDieta = async () => {
    if (!resultado?.dieta) return;

    try {
      const response = await api.post(
        `/ai/guardar-dieta/${clienteId}`,
        resultado.dieta
      );

      if (response.data.success) {
        onDietaGenerada?.(resultado.dieta);
        onClose();
      } else {
        setError("Error al guardar la dieta");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al guardar la dieta");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            🤖 {t("ai.generadorTitulo")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {!resultado ? (
          <>
            {/* Configuración */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {t("ai.configuracion")}
              </h3>

              {/* Tipo de generación */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t("ai.tipoGeneracion")}
                </label>
                <div className="flex gap-4">
                  {allowedTypes.map((tipo) => (
                    <label key={tipo} className="flex items-center">
                      <input
                        type="radio"
                        name="tipoGeneracion"
                        value={tipo}
                        checked={tipoGeneracion === tipo}
                        onChange={(e) =>
                          setTipoGeneracion(e.target.value as any)
                        }
                        className="mr-2"
                      />
                      {t(`ai.${tipo.toLowerCase()}`)}
                    </label>
                  ))}
                </div>
              </div>

              {/* Nivel de dificultad */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t("ai.nivelDificultad")}
                </label>
                <select
                  value={configuracion.nivelDificultad}
                  onChange={(e) =>
                    setConfiguracion((prev) => ({
                      ...prev,
                      nivelDificultad: e.target.value,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Principiante">{t("ai.principiante")}</option>
                  <option value="Intermedio">{t("ai.intermedio")}</option>
                  <option value="Avanzado">{t("ai.avanzado")}</option>
                </select>
              </div>

              {/* Tipo de dieta */}
              {(tipoGeneracion === "Dieta" || tipoGeneracion === "Ambos") && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    {t("ai.tipoDieta")}
                  </label>
                  <select
                    value={configuracion.tipoDieta}
                    onChange={(e) =>
                      setConfiguracion((prev) => ({
                        ...prev,
                        tipoDieta: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Equilibrada">{t("ai.equilibrada")}</option>
                    <option value="Alta en proteínas">
                      {t("ai.altaProteinas")}
                    </option>
                    <option value="Baja en carbohidratos">
                      {t("ai.bajaCarbohidratos")}
                    </option>
                    <option value="Vegetariana">{t("ai.vegetariana")}</option>
                  </select>
                </div>
              )}

              {/* Enfoque de rutina */}
              {(tipoGeneracion === "Rutina" || tipoGeneracion === "Ambos") && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    {t("ai.enfoqueRutina")}
                  </label>
                  <select
                    value={configuracion.enfoqueRutina}
                    onChange={(e) =>
                      setConfiguracion((prev) => ({
                        ...prev,
                        enfoqueRutina: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Fuerza">{t("ai.fuerza")}</option>
                    <option value="Cardio">{t("ai.cardio")}</option>
                    <option value="Flexibilidad">{t("ai.flexibilidad")}</option>
                    <option value="Mixto">{t("ai.mixto")}</option>
                  </select>
                </div>
              )}

              {/* Opciones adicionales */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={configuracion.incluirCardio}
                    onChange={(e) =>
                      setConfiguracion((prev) => ({
                        ...prev,
                        incluirCardio: e.target.checked,
                      }))
                    }
                    className="mr-2"
                  />
                  {t("ai.incluirCardio")}
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={configuracion.incluirFlexibilidad}
                    onChange={(e) =>
                      setConfiguracion((prev) => ({
                        ...prev,
                        incluirFlexibilidad: e.target.checked,
                      }))
                    }
                    className="mr-2"
                  />
                  {t("ai.incluirFlexibilidad")}
                </label>
              </div>

              {/* Calorías objetivo */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t("ai.caloriasObjetivo")}
                </label>
                <input
                  type="number"
                  value={configuracion.caloriasObjetivo}
                  onChange={(e) =>
                    setConfiguracion((prev) => ({
                      ...prev,
                      caloriasObjetivo: parseInt(e.target.value),
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="1000"
                  max="5000"
                />
              </div>
            </div>

            {/* Botón de generación */}
            <div className="flex justify-center">
              <button
                onClick={handleGenerar}
                disabled={isGenerating}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t("ai.generando")}...
                  </>
                ) : (
                  <>🤖 {t("ai.generar")}</>
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Resultado */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {t("ai.resultado")}
              </h3>

              {/* Análisis */}
              {resultado.analisis && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold mb-2">{t("ai.analisis")}</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    {resultado.analisis.resumenCliente}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    {resultado.analisis.evaluacionProgreso}
                  </p>
                  <p className="text-sm text-gray-700">
                    {resultado.analisis.prediccionResultados}
                  </p>
                </div>
              )}

              {/* Recomendaciones */}
              {resultado.recomendaciones &&
                resultado.recomendaciones.length > 0 && (
                  <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">
                      {t("ai.recomendaciones")}
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {resultado.recomendaciones.map(
                        (rec: string, index: number) => (
                          <li key={index}>{rec}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {/* Rutina generada */}
              {resultado.rutina && (
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold mb-2">
                    {t("ai.rutinaGenerada")}
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>{resultado.rutina.nombre}</strong>
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    {resultado.rutina.descripcion}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    {resultado.rutina.justificacion}
                  </p>

                  <div className="mt-4">
                    <button
                      onClick={handleGuardarRutina}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      💾 {t("ai.guardarRutina")}
                    </button>
                  </div>
                </div>
              )}

              {/* Dieta generada */}
              {resultado.dieta && (
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold mb-2">
                    {t("ai.dietaGenerada")}
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>{resultado.dieta.nombre}</strong>
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    {resultado.dieta.descripcion}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    {resultado.dieta.justificacion}
                  </p>

                  <div className="mt-4">
                    <button
                      onClick={handleGuardarDieta}
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                      💾 {t("ai.guardarDieta")}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex justify-between">
              <button
                onClick={() => setResultado(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                🔄 {t("ai.generarNuevo")}
              </button>
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {t("ai.cerrar")}
              </button>
            </div>
          </>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGenerator;
