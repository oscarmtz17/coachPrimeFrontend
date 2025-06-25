// src/components/ViewRoutine.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useViewRoutine } from "../hooks/useViewRoutine";

const ViewRoutine: React.FC = () => {
  const { rutinaId } = useParams<{ rutinaId: string }>();
  const navigate = useNavigate();

  const {
    routine,
    error,
    handleDownloadPdf,
    handleEditRoutine,
    handleDeleteRoutine,
  } = useViewRoutine(rutinaId, navigate);

  return (
    <div className="bg-zinc-900 min-h-screen pt-8 flex justify-center items-center p-4 md:p-8">
      <div className="bg-zinc-800 text-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {routine && (
          <>
            <h3 className="text-yellow-400 text-2xl text-center font-semibold mb-4">
              {routine.nombre}
            </h3>
            <p className="text-gray-300 text-center mb-4">
              {routine.descripcion}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <button
                onClick={handleDownloadPdf}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                Descargar PDF
              </button>
              <button
                onClick={handleEditRoutine}
                className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors"
              >
                Editar Rutina
              </button>
              <button
                onClick={handleDeleteRoutine}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
              >
                Eliminar Rutina
              </button>
            </div>
            {routine.diasEntrenamiento.map((dia, diaIndex) => (
              <div key={diaIndex} className="mb-6">
                <h4 className="text-yellow-400 text-xl font-semibold mb-2">
                  {dia.diaSemana}
                </h4>
                {dia.agrupaciones.map((agrupacion, groupIndex) => (
                  <div
                    key={groupIndex}
                    className="bg-zinc-700 p-4 rounded-lg mb-4"
                  >
                    <h5 className="text-yellow-400 text-lg font-semibold mb-3">
                      {agrupacion.tipo}
                    </h5>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse mb-4">
                        <thead>
                          <tr className="bg-zinc-600 text-yellow-400 text-center">
                            <th className="p-3">Nombre</th>
                            <th className="p-3">Series</th>
                            <th className="p-3">Repeticiones</th>
                            <th className="p-3">Imagen</th>
                          </tr>
                        </thead>
                        <tbody>
                          {agrupacion.ejercicios.map((ejercicio, exIndex) => (
                            <tr
                              key={exIndex}
                              className="text-center border-b border-zinc-600"
                            >
                              <td className="p-3 text-white">
                                {ejercicio.nombre}
                              </td>
                              <td className="p-3 text-white">
                                {ejercicio.series}
                              </td>
                              <td className="p-3 text-white">
                                {ejercicio.repeticiones}
                              </td>
                              <td className="p-3">
                                {ejercicio.imagenUrl ? (
                                  <img
                                    src={ejercicio.imagenUrl}
                                    alt={ejercicio.nombre}
                                    className="w-24 h-24 object-cover rounded mx-auto"
                                  />
                                ) : (
                                  <p className="text-gray-400 italic">
                                    Imagen no disponible
                                  </p>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewRoutine;
