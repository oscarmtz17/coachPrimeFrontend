// src/components/DietList.tsx
import React from "react";

import { useDietList } from "../hooks/useDietList";
import DietListStyles from "../styles/DietListStyles";

interface Diet {
  dietaId: number;
  nombre: string;
  descripcion: string;
  fechaAsignacion: string;
}

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
    <div style={DietListStyles.container}>
      <h3 style={DietListStyles.title}>Dietas del Cliente</h3>
      {error && <p style={DietListStyles.error}>{error}</p>}
      {!error && (
        <table style={DietListStyles.table}>
          <thead>
            <tr style={DietListStyles.headerRow}>
              <th style={{ display: "none" }}>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha de Inicio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {diets.map((diet) => (
              <tr key={diet.dietaId} style={DietListStyles.row}>
                <td style={{ display: "none" }}>{diet.dietaId}</td>
                <td style={DietListStyles.cell}>{diet.nombre}</td>
                <td style={DietListStyles.cell}>{diet.descripcion}</td>
                <td style={DietListStyles.cell}>
                  {new Date(diet.fechaAsignacion).toLocaleDateString("es-ES")}
                </td>
                <td style={DietListStyles.actionCell}>
                  <button
                    onClick={() => handleDownloadPdf(diet.dietaId)}
                    style={DietListStyles.actionButton("#007bff")}
                  >
                    Descargar PDF
                  </button>
                  <button
                    onClick={() => handleViewDiet(diet.dietaId)}
                    style={DietListStyles.actionButton("#28a745")}
                  >
                    Ver Dieta
                  </button>
                  <button
                    onClick={() => handleEditDiet(diet.dietaId)}
                    style={DietListStyles.actionButton("#ffc107")}
                  >
                    Editar Dieta
                  </button>
                  <button
                    onClick={() => handleDeleteDiet(diet.dietaId)}
                    style={DietListStyles.actionButton("#dc3545")}
                  >
                    Eliminar Dieta
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={onClose} style={DietListStyles.closeButton}>
        Cerrar
      </button>
    </div>
  );
};

export default DietList;
