"use client";

import { useState, useEffect, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { useRouter } from "next/navigation";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface User {
  name: string;
  email: string;
}

type SentimentPoint = {
  date: string;
  avg_score: number;
  count: number;
};

type Word = {
  text: string;
  value: number;
};

export default function InsightsPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const [sentimentPoints, setSentimentPoints] = useState<SentimentPoint[]>([]);
  const [loadingSentiment, setLoadingSentiment] = useState(true);

  const [words, setWords] = useState<Word[]>([]);
  const [loadingWords, setLoadingWords] = useState(true);

  /* ---------- USER ---------- */
  useEffect(() => {
    fetch("/api/user")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) router.push("/login");
        else setUser(data);
      });
  }, [router]);

  /* ---------- SENTIMENT OVER TIME ---------- */
  useEffect(() => {
    if (!user) return;

    fetch("/api/sentiment_over_time", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setSentimentPoints(data.points || []))
      .finally(() => setLoadingSentiment(false));
  }, [user]);

  /* ---------- WORD FREQUENCIES ---------- */
  useEffect(() => {
    if (!user) return;

    fetch("/api/word_frequencies", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setWords(data.words || []))
      .finally(() => setLoadingWords(false));
  }, [user]);

  /* ---------- WORD CLOUD (simplifié) ---------- */
  const sizedWords = useMemo(() => {
    if (!words.length) return [];
    const values = words.map((w) => w.value);
    const min = Math.min(...values);
    const max = Math.max(...values);

    return words.map((w, i) => {
      const ratio = max === min ? 0.5 : (w.value - min) / (max - min);
      const fontSize = 22 + ratio * 30;
      return {
        ...w,
        fontSize,
        rotation: (i % 6) * 7 - 20,
      };
    });
  }, [words]);

  /* ---------- CHART DATA + COULEURS DYNAMIQUES ---------- */
  const { chartData, chartOptions } = useMemo(() => {
    const labels = sentimentPoints.map((p) => p.date);

    // Couleur par point selon le score
    const pointColors = sentimentPoints.map((p) => {
      if (p.avg_score > 0.1) return "#22c55e"; // vert
      if (p.avg_score < -0.1) return "#ef4444"; // rouge
      return "#9ca3af"; // gris neutre
    });

    const data = {
      labels,
      datasets: [
        {
          label: "Humeur (score moyen)",
          data: sentimentPoints.map((p) => p.avg_score),
          borderColor: "#3b82f6", // couleur de la courbe
          backgroundColor: "rgba(59,130,246,0.2)",
          pointBackgroundColor: pointColors,
          pointBorderColor: pointColors,
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: true,
          tension: 0.35,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top" as const,
        },
        tooltip: {
          callbacks: {
            label: (ctx: any) =>
              `Score moyen: ${ctx.parsed.y.toFixed(3)}`,
          },
        },
      },
      scales: {
        y: {
          min: -1,
          max: 1,
          ticks: {
            stepSize: 0.25,
          },
          grid: {
            color: "rgba(148,163,184,0.3)",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    };

    return { chartData: data, chartOptions: options };
  }, [sentimentPoints]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navigation user={user} />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        <h1 className="text-3xl font-bold mb-2">Insights</h1>

        {/* ---------- ÉVOLUTION DU SENTIMENT ---------- */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Évolution du sentiment</h2>

          {loadingSentiment && (
            <p className="text-gray-500 text-sm">Chargement du graphique...</p>
          )}

          {!loadingSentiment && sentimentPoints.length === 0 && (
            <p className="text-gray-500 text-sm">
              Pas encore assez de données pour afficher la courbe. Écris
              plusieurs jours dans ton journal pour visualiser ton humeur 📈
            </p>
          )}

          {!loadingSentiment && sentimentPoints.length > 0 && (
            <div className="bg-white border rounded-xl shadow-sm p-6">
              <Line data={chartData} options={chartOptions} height={120} />
              <p className="mt-3 text-xs text-gray-500">
                Points verts = jours positifs • rouges = jours négatifs • gris =
                humeur neutre.
              </p>
            </div>
          )}
        </section>

        {/* ---------- NUAGE DE MOTS ---------- */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Nuage de mots</h2>
          <p className="text-gray-600">
            Nuage de mots généré automatiquement à partir de ton journal.
          </p>

          {loadingWords && (
            <p className="text-gray-500 text-sm">Chargement du nuage...</p>
          )}

          {!loadingWords && words.length === 0 && (
            <p className="text-gray-500 text-sm">
              Il n&apos;y a pas encore assez de texte pour générer un nuage de
              mots. Ajoute quelques entrées ✍️
            </p>
          )}

          {!loadingWords && words.length > 0 && (
            <div className="border rounded-xl bg-white shadow-sm p-6 min-h-[220px] flex items-center justify-center">
              <div className="flex flex-wrap gap-4 justify-center">
                {sizedWords.map((w, i) => (
                  <span
                    key={i}
                    className="text-gray-800 font-semibold"
                    style={{
                      fontSize: w.fontSize,
                      transform: `rotate(${w.rotation}deg)`,
                    }}
                  >
                    {w.text}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
