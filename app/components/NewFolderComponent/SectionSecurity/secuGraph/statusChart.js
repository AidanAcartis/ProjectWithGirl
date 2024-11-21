import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Enregistrement des composants nécessaires de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Définition des couleurs en RGBA pour chaque statut
const statuses = [
  { label: "Reçu", color: "rgba(59, 130, 246, 0.7)" }, // bg-blue-500
  { label: "En vérification", color: "rgba(234, 179, 8, 0.7)" }, // bg-yellow-500
  { label: "En attente de résolution", color: "rgba(249, 115, 22, 0.7)" }, // bg-orange-500
  { label: "Résolu", color: "rgba(34, 197, 94, 0.7)" }, // bg-green-500
  { label: "Rejeté", color: "rgba(239, 68, 68, 0.7)" }, // bg-red-500
  { label: "Assigné", color: "rgba(20, 184, 166, 0.7)" }, // bg-teal-500
  { label: "En cours de traitement", color: "rgba(168, 85, 247, 0.7)" }, // bg-purple-500
  { label: "Reporté", color: "rgba(107, 114, 128, 0.7)" }, // bg-gray-500
  { label: "En attente de documents", color: "rgba(99, 102, 241, 0.7)" }, // bg-indigo-500
  { label: "En appel", color: "rgba(236, 72, 153, 0.7)" }, // bg-pink-500
  { label: "Clôturé", color: "rgba(16, 185, 129, 0.7)" }, // bg-green-700
  { label: "Escalade", color: "rgba(185, 28, 28, 0.7)" }, // bg-red-700
];

const SignalementCharts = () => {
  const [currentStatusData, setCurrentStatusData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);

  useEffect(() => {
    // Récupérer les données pour current_status
    fetch("http://localhost:3003/api/current-status-distribution")
      .then((response) => response.json())
      .then((data) => setCurrentStatusData(data))
      .catch((error) =>

        console.error("Erreur lors de la récupération des données pour current_status", error)
      );

    // Récupérer les données pour priority
    fetch("http://localhost:3003/api/priority-distribution")
      .then((response) => response.json())
      .then((data) => setPriorityData(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données pour priority", error)
      );
  }, []);

  // Associer les couleurs aux statuts
  const getStatusColor = (status) => {
    const matchedStatus = statuses.find((item) => item.label === status);
    return matchedStatus ? matchedStatus.color : "rgba(107, 114, 128, 0.7)"; // Couleur par défaut (gris)
  };

  // Préparer les données pour le graphique `current_status`
  const currentStatusChartData = {
    labels: currentStatusData.map((item) => item.current_status),
    datasets: [
      {
        label: "Répartition par État",
        data: currentStatusData.map((item) => item.count),
        backgroundColor: currentStatusData.map((item) => getStatusColor(item.current_status)),
      },
    ],
  };

  // Préparer les données pour le graphique `priority`
  const priorityChartData = {
    labels: priorityData.map((item) => item.priority),
    datasets: [
      {
        label: "Répartition par Priorité",
        data: priorityData.map((item) => item.count),
        backgroundColor: priorityData.map((item) =>
          item.priority === "Haute"
            ? "rgba(239, 68, 68, 0.7)" // Rouge pour haute priorité
            : item.priority === "Moyenne"
            ? "rgba(234, 179, 8, 0.7)" // Jaune pour moyenne
            : "rgba(34, 197, 94, 0.7)" // Vert pour basse
        ),
      },
    ],
  };

  return (
    <div>
      <h2>Répartition des signalements</h2>
  
      {/* Graphique à barres pour `current_status` */}
      <h3>État des signalements</h3>
      <Bar data={currentStatusChartData} />
  
      {/* Graphique circulaire pour `priority` */}
      <h3>Priorité des signalements</h3>
      <Pie
        data={{
          labels: priorityData.map((item) => item.priority),
          datasets: [
            {
              label: "Répartition par Priorité",
              data: priorityData.map((item) => item.count),
              backgroundColor: priorityData.map((item) =>
                item.priority === "Haute"
                  ? "rgba(239, 68, 68, 0.7)" // Rouge
                  : item.priority === "Moyenne"
                  ? "rgba(234, 179, 8, 0.7)" // Jaune
                  : "rgba(34, 197, 94, 0.7)" // Vert
              ),
            },
          ],
        }}
      />
    </div>
  );
  
};

export default SignalementCharts;
