import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Context } from "../context/AuthContext";
import { useContext } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardAction,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
const AddDebate = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [pos, setPos] = useState("OG");
  const [points, setPoints] = useState("");
  const [speaks, setSpeaks] = useState("");
  const [infoSlide, setInfoSlide] = useState("");
  const [motion, setMotion] = useState("");

  const [open, setOpen] = useState(false);
  const [dataValidError, setDataValidError] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  const { user } = useContext(Context);
  const navigate = useNavigate();
  const handleAdd = async () => {
    const token = await user?.getIdToken();
    // data validation and error checking
    const debateData = {
      position: pos,
      date: date.toISOString().slice(0, 10),
      points: parseInt(points),
      speaks: parseInt(speaks),
      infoslide: infoSlide,
      motion: motion,
    };
    const valid = ["OG", "OO", "CG", "CO"];
    if (
      valid.includes(debateData.position) &&
      debateData.points >= 0 &&
      debateData.points <= 3 &&
      debateData.speaks >= 50 &&
      debateData.speaks <= 100
    ) {
      try {
        setLoad(true);
        setError(false);
        setDataValidError(false);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/add`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(debateData),
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
            <CardTitle className="text-3xl font-semibold">Add Debate</CardTitle>
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
            {/* 1 column on mobile, 2×2 on sm+ */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Date */}
              <div className="space-y-1.5">
                <h3 className="text-sm font-medium">Date</h3>
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

              {/* Position */}
              <div className="space-y-1.5">
                <h3 className="text-sm font-medium">Position</h3>
                <Select value={pos} onValueChange={setPos}>
                  <SelectTrigger className="h-9 w-full text-sm">
                    <SelectValue placeholder="Position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OG">OG</SelectItem>
                    <SelectItem value="OO">OO</SelectItem>
                    <SelectItem value="CG">CG</SelectItem>
                    <SelectItem value="CO">CO</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Points */}
              <div className="space-y-1.5">
                <h3 className="text-sm font-medium">Points</h3>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={3}
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  className="h-9 w-full px-2 text-sm"
                  placeholder="0–3"
                />
              </div>

              {/* Speaks */}
              <div className="space-y-1.5">
                <h3 className="text-sm font-medium">Speaks</h3>
                <Input
                  type="number"
                  inputMode="decimal"
                  min={50}
                  max={100}
                  value={speaks}
                  onChange={(e) => setSpeaks(e.target.value)}
                  className="h-9 w-full px-2 text-sm"
                  placeholder="50–100"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-medium">Info Slide</h3>
              <Textarea
                value={infoSlide}
                onChange={(e) => setInfoSlide(e.target.value)}
                className="min-h-[80px] w-full text-sm resize-y"
                placeholder="Info Slide"
              />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-medium">Motion</h3>
              <Textarea
                value={motion}
                onChange={(e) => setMotion(e.target.value)}
                className="min-h-[80px] w-full text-sm resize-y"
                placeholder="Motion"
              />
            </div>
          </CardContent>

          <CardAction className="flex justify-end px-6 pb-4">
            <Button onClick={handleAdd} disabled={load} size="sm">
              {load ? <Spinner /> : "Add Debate"}
            </Button>
          </CardAction>
        </Card>
      </div>
    </div>
  );
};

export default AddDebate;
