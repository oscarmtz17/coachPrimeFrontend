// src/components/DietList.tsx
import React from "react";
import { useDietList } from "../hooks/useDietList";

interface DietListProps {
  clienteId: number;
  onClose: () => void;
}

const DietList: React.FC<DietListProps> = ({ clienteId, onClose }) => {
  const {
    diets,
    error,
    handleDownloadPdf,
    handleViewDiet,
    handleEditDiet,
    handleDeleteDiet,
  } = useDietList(clienteId);

  return (
    <div className="w-full max-w-2xl mx-auto bg-black bg-opacity-90 p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-primary mb-6 text-center">
        Dietas del Cliente
      </h3>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {!error && (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-dark text-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-secondary text-primary">
                <th className="hidden">ID</th>
                <th className="py-3 px-4">Nombre</th>
                <th className="py-3 px-4">Notas</th>
                <th className="py-3 px-4">Fecha de Inicio</th>
                <th className="py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {diets.map((diet) => (
                <tr
                  key={diet.dietaId}
                  className="border-b border-border-gray hover:bg-dark-gray transition-colors"
                >
                  <td className="hidden">{diet.dietaId}</td>
                  <td className="py-2 px-4">{diet.nombre}</td>
                  <td className="py-2 px-4">{diet.notas}</td>
                  <td className="py-2 px-4">
                    {new Date(diet.fechaAsignacion).toLocaleDateString("es-ES")}
                  </td>
                  <td className="py-2 px-4 flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => handleDownloadPdf(diet.dietaId)}
                      className="bg-info text-white py-1 px-3 rounded-md text-sm font-semibold transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Descargar PDF
                    </button>
                    <button
                      onClick={() => handleViewDiet(diet.dietaId)}
                      className="bg-success text-white py-1 px-3 rounded-md text-sm font-semibold transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      Ver Dieta
                    </button>
                    <button
                      onClick={() => handleEditDiet(diet.dietaId)}
                      className="bg-primary text-black py-1 px-3 rounded-md text-sm font-semibold transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      Editar Dieta
                    </button>
                    <button
                      onClick={() => handleDeleteDiet(diet.dietaId)}
                      className="bg-danger text-white py-1 px-3 rounded-md text-sm font-semibold transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Eliminar Dieta
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={onClose}
        className="w-full mt-4 bg-danger text-white py-3 px-6 rounded-md text-base font-semibold cursor-pointer transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Cerrar
      </button>
    </div>
  );
};

export default DietList;
