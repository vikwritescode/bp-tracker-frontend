import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

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
        speaks: 77
    }
    const response = await fetch("http://localhost:8000/api/add", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
     },
      body: JSON.stringify(debateData)
    });
    const json = await response.json()
    console.log(json)

  };

  return (
    <>
      <Button onClick={handleMakeRequest}>Make Request</Button>

    </>
  );
};

export default Dashboard;
