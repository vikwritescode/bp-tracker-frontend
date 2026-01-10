import React, { useContext, useEffect } from "react";
import { Context } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(Context);

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
      <button onClick={handleMakeRequest}>Make Request</button>
    </>
  );
};

export default Dashboard;
