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

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Trash, AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { type TournamentRecord } from "@/interfaces";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  DialogClose,
  DialogDescription,
  DialogTrigger,
} from "@radix-ui/react-dialog";

const Tournaments = () => {
  const { user } = useContext(Context);
  const [tournamentArr, setTournamentArr] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);
  const [loads, setLoads] = useState<boolean[]>([]);
  const [refresher, setRefresher] = useState(false);
  useEffect(() => {
    const fetchStuff = async () => {
      const token = await user?.getIdToken();
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/usertournaments`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const json = await response.json();
        console.log(json);
        setTournamentArr(json);
        setLoads(Array(json.length).fill(false));
        setLoad(false);
      } catch (err) {
        setError(true);
        console.error(err);
      }
    };
    fetchStuff();
  }, [refresher]);

  const handleDeleteClick = async (x: number) => {
    try {
      setLoads((prev) => prev.map((v, i) => (i === x ? true : v)));
      const token = await user?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/usertournaments/delete/${x}`,
        {
          method: "DELETE",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        },
      );
      if (!response.ok) {
        console.log(load);
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

  const [sortBy, setSortBy] = useState("date");
  const [ascending, setAscending] = useState(false);

  const handleSort = (ind: string) => {
    if (ind === sortBy) {
      // flip ascending/descending
      setAscending((prev) => !prev);
    } else {
      setSortBy(ind);
    }
  };

  if (error) {
    return (
      <div className="w-full px-4 py-6 overflow-x-hidden">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
          Your Tournaments
        </h1>
        <Alert variant="destructive" className="mt-6">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle className="text-left mb-1">
            Error retrieving debate history
          </AlertTitle>
          <AlertDescription>Please reload the page.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6 overflow-x-hidden">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
        Your Tournaments
      </h1>
      <div className="py-4">
        <Table>
          <TableHeader>
            <TableRow className="text-left">
              <TableHead
                className="cursor-pointer hover:underline hover:text-secondary-foreground"
                onClick={() => handleSort("date")}
              >
                Date
              </TableHead>
              <TableHead
                className="cursor-pointer hover:underline hover:text-secondary-foreground"
                onClick={() => handleSort("name")}
              >
                Tournament
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-left">
            {tournamentArr
              .sort((a, b) => {
                const mult = ascending ? 1 : -1;
                if (sortBy == "date") {
                  return (
                    mult *
                    (new Date(a["date"]).getTime() -
                      new Date(b["date"]).getTime())
                  );
                } else if (sortBy === "name") {
                  const valA =
                    (a[sortBy] as string) === null ? "" : (a[sortBy] as string);
                  const valB =
                    (b[sortBy] as string) === null ? "" : (b[sortBy] as string);
                  return (
                    mult *
                    valA.localeCompare(valB, undefined, { numeric: true })
                  );
                } else if (sortBy === "date") {
                  const valA = new Date(a[sortBy]);
                  const valB = new Date(b[sortBy]);
                  return mult * (valA.getDate() - valB.getDate());
                }
                return mult * (a[sortBy] - b[sortBy]);
              })
              .map((rec: TournamentRecord, i) => (
                <TableRow>
                  <TableCell>{rec["date"]}</TableCell>
                  <TableCell>{rec["name"]}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        {
                          <Button
                            disabled={loads[i]}
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            {loads[i] ? <Spinner /> : <Trash />}
                          </Button>
                        }
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>Delete Tournament</DialogHeader>
                        <DialogDescription>
                          Are you sure you want to delete {rec["name"]}?
                        </DialogDescription>
                        <DialogClose asChild>
                          <Button
                            onClick={() => handleDeleteClick(rec["id"])}
                            disabled={loads[i]}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            OK
                          </Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Tournaments;
