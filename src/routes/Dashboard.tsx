import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AuthContext";
import PieChartPointCard from "@/components/dashboard-cards/PieChartPointCard";
import PositionWisePointCard from "@/components/dashboard-cards/PositionWisePointCard";
import PointsByTopicCard from "@/components/dashboard-cards/PointsByTopicCard";
import SpeaksByTopicCard from "@/components/dashboard-cards/SpeaksByTopicCard";
import AverageSpeaksCard from "@/components/dashboard-cards/AverageSpeaksCard";

const Dashboard = () => {
  const { user } = useContext(Context);
  //const [load, setLoad] = useState(false);
  const [debateArr, setDebateArr] = useState([]);

  useEffect(() => {
    const fetchStuff = async () => {
      const token = await user?.getIdToken();
      try {
        //setLoad(true);
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
        //setLoad(false);
      } catch (err) {
        console.error(err);
      } finally {
        //setLoad(false);
      }
    };
    fetchStuff();
  }, []);

  return (
    <div className="w-full px-4 py-6 overflow-x-hidden">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 mt-6">
        <AverageSpeaksCard debateData={debateArr} />
        <PositionWisePointCard debateData={debateArr} />
      </div>

      <div className="mt-8">
        <h2 className="text-3xl sm:text-4xl font-semibold">By Team Points</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <PieChartPointCard title="1st" debateData={debateArr} points={3} />
          <PieChartPointCard title="2nd" debateData={debateArr} points={2} />
          <PieChartPointCard title="3rd" debateData={debateArr} points={1} />
          <PieChartPointCard title="4th" debateData={debateArr} points={0} />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-3xl sm:text-4xl font-semibold">Categories</h2>
        <div className="grid grid-cols-1 gap-6 mt-6">
          <PointsByTopicCard debateData={debateArr} />
          <SpeaksByTopicCard debateData={debateArr} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
