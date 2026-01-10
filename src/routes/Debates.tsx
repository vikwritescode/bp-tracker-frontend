import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AuthContext";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const Debates = () => {
  const { user } = useContext(Context);
  const [debateArr, setDebateArr] = useState([]);
  const [load, setLoad] = useState(true);
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
  return (
    <>
      <h1 className="text-6xl">Your Debates</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Speaks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>5173
            {debateArr.map(rec => (
                <TableRow>
                    <TableCell>{rec[2]}</TableCell>
                    <TableCell>{rec[3]}</TableCell>
                    <TableCell>{rec[4]}</TableCell>
                    <TableCell>{rec[5]}</TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Debates;
