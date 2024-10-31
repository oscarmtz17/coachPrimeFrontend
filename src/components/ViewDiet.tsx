// src/components/ViewDiet.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface Alimento {
  nombre: string;
  cantidad: number;
  unidad: string;
}

interface Comida {
  nombre: string;
  orden: number;
  hora: string;
  alimentos: Alimento[];
}

interface DietDetails {
  nombre: string;
  descripcion: string;
  clienteId: number;
  comidas: Comida[];
  notas: string;
}

const ViewDiet: React.FC = () => {
  const { clienteId, dietaId } = useParams<{
    clienteId: string;
    dietaId: string;
  }>();

  const navigate = useNavigate();
  const [diet, setDiet] = useState<DietDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiet = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5267/api/dieta/${clienteId}/${dietaId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Adaptar la estructura de la respuesta
        const adaptedDiet = {
          ...response.data,
          comidas: response.data.comidas.$values.map((comida: any) => ({
            ...comida,
            alimentos: comida.alimentos.$values,
          })),
        };

        setDiet(adaptedDiet);
        setError(null);
      } catch (error: any) {
        setError("Error al cargar los detalles de la dieta");
        console.error(error);
      }
    };

    fetchDiet();
  }, [dietaId]);

  const handleDownloadPdf = async () => {
    if (!diet) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5267/api/dieta/${diet.clienteId}/${dietaId}/pdf`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Dieta_${diet.nombre.replace(/\s+/g, "_")}.pdf`
      );
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      setError("No se pudo descargar el PDF de la dieta.");
    }
  };

  const handleDeleteDiet = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta dieta?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `http://localhost:5267/api/dieta/${diet?.clienteId}/${dietaId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("Dieta eliminada exitosamente.");
        navigate("/dashboard"); // Redirige al dashboard
      } catch (error) {
        console.error("Error al eliminar la dieta:", error);
        setError("Error al eliminar la dieta.");
      }
    }
  };

  const handleEditDiet = () => {
    if (diet) {
      navigate(`/editar-dieta/${clienteId}/${dietaId}`);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {diet && (
        <>
          <h3>{diet.nombre}</h3>
          <p>{diet.descripcion}</p>
          <button onClick={handleDownloadPdf}>Descargar PDF</button>
          <button onClick={handleEditDiet}>Editar Dieta</button>
          <button onClick={handleDeleteDiet}>Eliminar Dieta</button>
          {diet.comidas.map((comida, index) => (
            <div key={index}>
              <h4>{`Comida ${comida.orden} - ${comida.hora}`}</h4>
              <h5>{comida.nombre}</h5>
              <table>
                <thead>
                  <tr>
                    <th>Alimento</th>
                    <th>Cantidad</th>
                    <th>Unidad</th>
                  </tr>
                </thead>
                <tbody>
                  {comida.alimentos.map((alimento, idx) => (
                    <tr key={idx}>
                      <td>{alimento.nombre}</td>
                      <td>{alimento.cantidad}</td>
                      <td>{alimento.unidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <h4>Notas</h4>
          <p>{diet.notas}</p>
        </>
      )}
    </div>
  );
};

export default ViewDiet;
