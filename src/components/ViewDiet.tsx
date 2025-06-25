// src/components/ViewDiet.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useViewDiet } from "../hooks/useViewDiet";

const ViewDiet: React.FC = () => {
  const { clienteId, dietaId } = useParams<{
    clienteId: string;
    dietaId: string;
  }>();
  const navigate = useNavigate();
  const { diet, error, handleDownloadPdf, handleDeleteDiet, handleEditDiet } =
    useViewDiet(clienteId, dietaId, navigate);

  return (
    <div className="bg-zinc-900 min-h-screen flex justify-center items-center p-4 md:p-8">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {diet && (
        <div className="bg-zinc-800 text-white p-6 rounded-lg max-w-4xl w-full shadow-lg">
          <h3 className="text-yellow-400 text-2xl text-center font-semibold mb-4">
            {diet.nombre}
          </h3>
          <p className="text-gray-300 text-center mb-4">{diet.descripcion}</p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={handleDownloadPdf}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Descargar PDF
            </button>
            <button
              onClick={handleEditDiet}
              className="bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-300 transition-colors"
            >
              Editar Dieta
            </button>
            <button
              onClick={handleDeleteDiet}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
            >
              Eliminar Dieta
            </button>
          </div>
          {diet.comidas.map((comida, index) => (
            <div key={index} className="bg-zinc-700 p-4 rounded-lg mb-4">
              <h4 className="text-yellow-400 text-xl font-semibold mb-2">
                {`${comida.nombre} - ${comida.hora}`}
              </h4>
              <h5 className="text-gray-300 text-lg mb-3">{comida.nombre}</h5>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse mb-4">
                  <thead>
                    <tr>
                      <th className="bg-zinc-600 text-yellow-400 p-3 text-left">
                        Alimento
                      </th>
                      <th className="bg-zinc-600 text-yellow-400 p-3 text-left">
                        Cantidad
                      </th>
                      <th className="bg-zinc-600 text-yellow-400 p-3 text-left">
                        Unidad
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comida.alimentos.map((alimento, idx) => (
                      <tr key={idx} className="border-b border-zinc-600">
                        <td className="p-3 text-white">{alimento.nombre}</td>
                        <td className="p-3 text-white">{alimento.cantidad}</td>
                        <td className="p-3 text-white">{alimento.unidad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          <h4 className="text-yellow-400 text-xl font-semibold mt-6 mb-3">
            Notas
          </h4>
          <p className="text-gray-300">{diet.notas}</p>
        </div>
      )}
    </div>
  );
};

export default ViewDiet;
