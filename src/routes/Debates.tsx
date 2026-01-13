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
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InfoIcon } from "lucide-react";
const Debates = () => {
  const { user } = useContext(Context);
  const [debateArr, setDebateArr] = useState([]);
  const [load, setLoad] = useState(true);
  const [loads, setLoads] = useState<boolean[]>([]);
  const [refresher, setRefresher] = useState(false);
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
        setLoads(Array(json.debates.length).fill(false));
        setLoad(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStuff();
  }, [refresher]);

  const handleDeleteClick = async (x: number) => {
    try {
      setLoads((prev) => prev.map((v, i) => (i === x ? true : v)));
      const token = await user?.getIdToken();
      const response = await fetch(`http://localhost:8000/api/delete/${x}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const json = await response.json();
      console.log(json);
      setRefresher((prev) => !prev);
    } catch (err) {
      console.error(err);
    } finally {
      setLoad(false);
      setLoads((prev) => prev.map((v, i) => (i === x ? false : v)));
    }
  };
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
            <TableHead>Info Slide</TableHead>
            <TableHead>Motion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {debateArr.map((rec, i) => (
            <TableRow>
              <TableCell>{rec[2]}</TableCell>
              <TableCell>{rec[3]}</TableCell>
              <TableCell>{rec[4]}</TableCell>
              <TableCell>{rec[5]}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost">
                      <InfoIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-md max-h-[400px] overflow-y-auto">
                    <p className="text-sm whitespace-pre-wrap">{rec[6]}</p>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost">
                      <InfoIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-md max-h-[400px] overflow-y-auto">
                    <p className="text-sm whitespace-pre-wrap">{rec[7]}</p>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell onClick={() => handleDeleteClick(rec[0])}>
                <Button
                  disabled={loads[i]}
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  {loads[i] ? <Spinner /> : <Trash />}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Debates;
