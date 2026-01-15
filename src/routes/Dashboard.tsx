import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/AuthContext";
import PieChartPointCard from "@/components/dashboard-cards/PieChartPointCard";
import PositionWisePointCard from "@/components/dashboard-cards/PositionWisePointCard";
import { Spinner } from "@/components/ui/spinner";
import PointsByTopicCard from "@/components/dashboard-cards/PointsByTopicCard";

const Dashboard = () => {
  const { user } = useContext(Context);
  const [load, setLoad] = useState(false);
  const [debateArr, setDebateArr] = useState([]);

  useEffect(() => {
    const fetchStuff = async () => {
      const token = await user?.getIdToken();
      try {
        setLoad(true);
        const response = await fetch("http://localhost:8000/api/get", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const json = await response.json();
        console.log(json);
        setDebateArr(json.debates);
        setLoad(false);
      } catch (err) {
        console.error(err);
      } finally {
        setLoad(false);
      }
    };
    fetchStuff();
  }, []);

  if (load) {
    return <Spinner />;
  }

  return (
    <>
      {/*<Button onClick={handleMakeRequest}>Make Request</Button>*/}
      <h1 className="text-6xl">Dashboard</h1>
      <PositionWisePointCard debateData={debateArr} />
      <div className="mt-4">
        <h2 className="text-4xl">By Team Points</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <PieChartPointCard title="1st" debateData={debateArr} points={3} />
          <PieChartPointCard title="2nd" debateData={debateArr} points={2} />
          <PieChartPointCard title="3rd" debateData={debateArr} points={1} />
          <PieChartPointCard title="4th" debateData={debateArr} points={0} />
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-4xl">Categories</h2>
        <div className="grid grid-cols-1 gap-6 mt-4">
          <PointsByTopicCard debateData={debateArr}/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
