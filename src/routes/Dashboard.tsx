import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import PieChartPointCard from "@/components/dashboard-cards/PieChartPointCard";
import { Card } from "@/components/ui/card";
import PositionWisePointCard from "@/components/dashboard-cards/PositionWisePointCard";

const Dashboard = () => {
  const { user } = useContext(Context);
  const [load, setLoad] = useState(true);
  const [debateArr, setDebateArr] = useState([]);

  useEffect(() => {
    const fetchStuff = async () => {
      const token = await user?.getIdToken();
      try {
        const response = await fetch("http://localhost:8000/api/get", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await response.json();
        console.log(json);
        setDebateArr(json.debates);
        setLoad(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStuff();
  }, []);

  const handleMakeRequest = async () => {
    const token = await user?.getIdToken();
    const debateData = {
      position: "OG",
      date: "2025-12-31",
      points: 3,
      speaks: 77,
    };
    const response = await fetch("http://localhost:8000/api/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(debateData),
    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <>
      {/*<Button onClick={handleMakeRequest}>Make Request</Button>*/}

      <PositionWisePointCard debateData={debateArr}/>
      <div className="mt-4">
        <h1 className="text-6xl">By Team Points</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <PieChartPointCard title="1st" debateData={debateArr} points={3} />
          <PieChartPointCard title="2nd" debateData={debateArr} points={2} />
          <PieChartPointCard title="3rd" debateData={debateArr} points={1} />
          <PieChartPointCard title="4th" debateData={debateArr} points={0} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
