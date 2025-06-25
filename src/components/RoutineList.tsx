// src/components/RoutineList.tsx
import React from "react";
import { useRoutineList } from "../hooks/useRoutineList";

interface RoutineListProps {
  clienteId: number;
  onClose: () => void;
}

const RoutineList: React.FC<RoutineListProps> = ({ clienteId, onClose }) => {
  const {
    routines,
    error,
    handleDownloadPdf,
    handleViewRoutine,
    handleEditRoutine,
    handleDeleteRoutine,
  } = useRoutineList(clienteId);

  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h3 className="text-yellow-400 text-2xl text-center font-semibold mb-4">
        Rutinas del Cliente
      </h3>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {!error && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-zinc-700 text-yellow-400 text-center">
                <th className="hidden">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Descripción</th>
                <th className="p-3">Fecha Inicio</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {routines.map((routine) => (
                <tr
                  key={routine.rutinaId}
                  className="text-center border-b border-zinc-600"
                >
                  <td className="hidden">{routine.rutinaId}</td>
                  <td className="p-3 text-white">{routine.nombre}</td>
                  <td className="p-3 text-white">{routine.descripcion}</td>
                  <td className="p-3 text-white">
                    {new Date(routine.fechaInicio).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <div className="flex flex-col gap-2 justify-center">
                      <button
                        onClick={() => handleDownloadPdf(routine.rutinaId)}
                        className="bg-blue-600 text-white py-1 px-2 rounded text-sm border-none cursor-pointer hover:bg-blue-700 transition-colors"
                      >
                        Descargar PDF
                      </button>
                      <button
                        onClick={() => handleViewRoutine(routine.rutinaId)}
                        className="bg-green-600 text-white py-1 px-2 rounded text-sm border-none cursor-pointer hover:bg-green-700 transition-colors"
                      >
                        Ver Rutina
                      </button>
                      <button
                        onClick={() => handleEditRoutine(routine.rutinaId)}
                        className="bg-yellow-600 text-white py-1 px-2 rounded text-sm border-none cursor-pointer hover:bg-yellow-700 transition-colors"
                      >
                        Editar Rutina
                      </button>
                      <button
                        onClick={() => handleDeleteRoutine(routine.rutinaId)}
                        className="bg-red-600 text-white py-1 px-2 rounded text-sm border-none cursor-pointer hover:bg-red-700 transition-colors"
                      >
                        Eliminar Rutina
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={onClose}
        className="bg-gray-300 text-zinc-800 py-2 px-4 rounded cursor-pointer w-full hover:bg-gray-400 transition-colors"
      >
        Cerrar
      </button>
    </div>
  );
};

export default RoutineList;
