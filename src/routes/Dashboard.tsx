import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AuthContext";
import PieChartPositionCard from "@/components/dashboard-cards/PieChartPositionCard";
import PieChartPointCard from "@/components/dashboard-cards/PieChartPointCard";
import PointsByTopicCard from "@/components/dashboard-cards/PointsByTopicCard";
import SpeaksByTopicCard from "@/components/dashboard-cards/SpeaksByTopicCard";
import AverageSpeaksCard from "@/components/dashboard-cards/AverageSpeaksCard";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { user } = useContext(Context);
  const [load, setLoad] = useState(false);
  const [debateArr, setDebateArr] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStuff = async () => {
      const token = await user?.getIdToken();
      try {
        setLoad(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/get`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const json = await response.json();
        console.log(json);
        setDebateArr(json.debates);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoad(false);
      }
    };
    fetchStuff();
  }, []);

  if (error) {
    return (
      <div className="w-full px-4 py-6 overflow-x-hidden">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
          Dashboard
        </h1>
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle className="text-left mb-1">Error fetching data</AlertTitle>
          <AlertDescription>Please reload the page.</AlertDescription>
        </Alert>
      </div>
    );
  }
  return (
    <div className="w-full px-4 py-6 overflow-x-hidden">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">Dashboard</h1>
      {load ? (
        <div className="min-h-screen p-6 space-y-6">
          {/* Content Grid */}
          <div className="grid grid-cols-1 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 mt-6">
            <AverageSpeaksCard debateData={debateArr} />
          </div>

          <div className="mt-8">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              Positions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <PieChartPositionCard
                title="OG"
                debateData={debateArr}
                position="OG"
              />
              <PieChartPositionCard
                title="OO"
                debateData={debateArr}
                position="OO"
              />
              <PieChartPositionCard
                title="CG"
                debateData={debateArr}
                position="CG"
              />
              <PieChartPositionCard
                title="CO"
                debateData={debateArr}
                position="CO"
              />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              Points
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <PieChartPointCard
                title="1st"
                debateData={debateArr}
                points={3}
              />
              <PieChartPointCard
                title="2nd"
                debateData={debateArr}
                points={2}
              />
              <PieChartPointCard
                title="3rd"
                debateData={debateArr}
                points={1}
              />
              <PieChartPointCard
                title="4th"
                debateData={debateArr}
                points={0}
              />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl sm:text-4xl font-semibold">Categories</h2>
            <div className="grid grid-cols-1 gap-6 mt-6">
              <PointsByTopicCard debateData={debateArr} />
              <SpeaksByTopicCard debateData={debateArr} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
