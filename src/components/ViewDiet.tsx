// src/components/ViewDiet.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useViewDiet } from "../hooks/useViewDiet";
import ViewDietStyles from "../styles/ViewDietStyles";

const ViewDiet: React.FC = () => {
  const { clienteId, dietaId } = useParams<{
    clienteId: string;
    dietaId: string;
  }>();
  const navigate = useNavigate();
  const { diet, error, handleDownloadPdf, handleDeleteDiet, handleEditDiet } =
    useViewDiet(clienteId, dietaId, navigate);

  return (
    <div style={ViewDietStyles.background}>
      {error && <p style={ViewDietStyles.error}>{error}</p>}
      {diet && (
        <div style={ViewDietStyles.container}>
          <h3 style={ViewDietStyles.title}>{diet.nombre}</h3>
          <p style={ViewDietStyles.description}>{diet.descripcion}</p>
          <div style={ViewDietStyles.buttonContainer}>
            <button
              onClick={handleDownloadPdf}
              style={ViewDietStyles.downloadButton}
            >
              Descargar PDF
            </button>
            <button onClick={handleEditDiet} style={ViewDietStyles.editButton}>
              Editar Dieta
            </button>
            <button
              onClick={handleDeleteDiet}
              style={ViewDietStyles.deleteButton}
            >
              Eliminar Dieta
            </button>
          </div>
          {diet.comidas.map((comida, index) => (
            <div key={index} style={ViewDietStyles.mealContainer}>
              <h4 style={ViewDietStyles.mealTitle}>
                {`Comida ${comida.orden} - ${comida.hora}`}
              </h4>
              <h5 style={ViewDietStyles.mealSubtitle}>{comida.nombre}</h5>
              <table style={ViewDietStyles.table}>
                <thead>
                  <tr>
                    <th style={ViewDietStyles.tableHeader}>Alimento</th>
                    <th style={ViewDietStyles.tableHeader}>Cantidad</th>
                    <th style={ViewDietStyles.tableHeader}>Unidad</th>
                  </tr>
                </thead>
                <tbody>
                  {comida.alimentos.map((alimento, idx) => (
                    <tr key={idx} style={ViewDietStyles.tableRow}>
                      <td style={ViewDietStyles.tableCell}>
                        {alimento.nombre}
                      </td>
                      <td style={ViewDietStyles.tableCell}>
                        {alimento.cantidad}
                      </td>
                      <td style={ViewDietStyles.tableCell}>
                        {alimento.unidad}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <h4 style={ViewDietStyles.notesTitle}>Notas</h4>
          <p style={ViewDietStyles.notes}>{diet.notas}</p>
        </div>
      )}
    </div>
  );
};

export default ViewDiet;
