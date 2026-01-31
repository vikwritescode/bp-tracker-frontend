import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Context } from "../context/AuthContext";
import { useContext } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
const AddTournaments = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [name, setName] = useState("");


  const [open, setOpen] = useState(false);
  const [dataValidError, setDataValidError] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);


  const { user } = useContext(Context);
  const navigate = useNavigate();
  const handleAdd = async () => {
    const token = await user?.getIdToken();
    // data validation and error checking
    const tournData = {
      date: date.toISOString().slice(0, 10),
      name: name,
    };


    if (tournData.name.trim() !== "" && tournData.date !== undefined) {
      try {
        setLoad(true);
        setError(false);
        setDataValidError(false);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/usertournaments/create`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tournData),
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const json = await response.json();
        console.log(json);
        navigate("/debates");
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoad(false);
      }
    } else {
      setDataValidError(true);
      console.log("get good");
    }
  };
  return (
    <div className="w-full px-4 py-6 overflow-x-hidden">
      <div>
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">Add Tournament</CardTitle>
          </CardHeader>


          <CardContent className="space-y-6">
            <Alert variant="destructive" hidden={!dataValidError}>
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle className="text-left">Invalid Credentials</AlertTitle>
              <AlertDescription>
                Make sure your entry is valid.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive" hidden={!error}>
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle className="text-left">Oopsie Woopsie</AlertTitle>
              <AlertDescription>The API fumbled.</AlertDescription>
            </Alert>
            <div className="grid gap-4">
              {/* Date */}
              <div className="space-y-1.5">
                <h3 className="text-sm text-left font-medium">Date</h3>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-9 w-full justify-start text-left text-sm"
                    >
                      {date ? date.toLocaleDateString() : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => {
                        if (!d) return;
                        setDate(d);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>


            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-medium text-left">Name</h3>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tournament name"
              />
            </div>
          </CardContent>


          <CardFooter className="px-6">
            <Button className="w-full" onClick={handleAdd} disabled={load}>
              {load ? <Spinner /> : "Add Tournament"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};


export default AddTournaments;