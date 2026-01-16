import { useContext, useState } from "react";
import { Context } from "../context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Item, ItemTitle, ItemContent } from "@/components/ui/item";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
interface slugInterface {
  name: string;
  slug: string;
}
const ImportDebates = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(
    "There's no error. This message should be hidden."
  );
  const [url, setUrl] = useState("");
  const [slugs, setSlugs] = useState([]);
  const [fetchedTournaments, setFetchedTouraments] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState("_");

  // name related variables
  const [searchName, setSearchName] = useState("");
  const [fetchedNames, setFetchedNames] = useState(false);
  const [names, setNames] = useState([]);
  const [nameLoad, setNameLoad] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [selectedName, setSelectedName] = useState("");

  // final tab import loading
  const [tabLoad, setTabLoad] = useState(false);
  const [tabError, setTabError] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const handleSlugFetch = async () => {
    setFetchedTouraments(true);
    const token = await user?.getIdToken();
    try {
      setLoad(true);
      setError(false);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tournaments?url=${encodeURIComponent(url)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const json = await response.json();

      console.log(json);
      setSlugs(json);
      setSelectedSlug(json[0].slug);
    } catch (err) {
      console.error(err);
      setFetchedTouraments(false);
      setError(true);
      const message = err instanceof Error ? err.message : String(err);
      setErrorMessage(message);
    } finally {
      setLoad(false);
    }
  };
  const handleSpeakerFetch = async () => {
    setFetchedNames(true);
    const token = await user?.getIdToken();
    try {
      setNameLoad(true);
      setNameError(false);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/speakers?url=${encodeURIComponent(
          url
        )}&slug=${encodeURIComponent(
          selectedSlug
        )}&speaker=${encodeURIComponent(searchName)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const json = await response.json();

      console.log(json);
      setNames(json);
      setSelectedName(json[0].url);
    } catch (err) {
      console.error(err);
      setFetchedNames(false);
      setNameError(true);
      const message = err instanceof Error ? err.message : String(err);
      setErrorMessage(message);
    } finally {
      setNameLoad(false);
    }
  };

  const handleMakeRecords = async () => {
    try {
      setTabLoad(true);
      setTabError(false);
      const token = await user?.getIdToken();
      const reqData = {
        url: url,
        slug: selectedSlug,
        speaker: selectedName,
        date: date.toISOString().slice(0, 10),
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/import`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const json = await response.json();
      console.log(json);
      navigate("/debates");
    } catch (err) {
      console.error(err);
      setTabError(true);
      const message = err instanceof Error ? err.message : String(err);
      setErrorMessage(message);
    } finally {
      setTabLoad(false);
    }
  };
  return (
    <>
      <h1 className="text-6xl">
        Import from URL
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Card 1: Tournaments */}
        <Card>
          <CardHeader>Find Tournaments from URL</CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Tab URL"
                className="flex-1"
              />
              <Button
                onClick={handleSlugFetch}
                disabled={load}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Fetch
              </Button>
            </div>

            <Alert variant="destructive" hidden={!error}>
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle className="text-left">
                Unable to Fetch Tournament
              </AlertTitle>
              <AlertDescription>
                Make sure the tab URL is correct, and that only the tab URL is
                present.
                {errorMessage}
              </AlertDescription>
            </Alert>

            <div hidden={!fetchedTournaments}>
              {load ? (
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {slugs.map((x: slugInterface) => (
                    <Item
                      key={x.slug}
                      variant="outline"
                      className={`mt-2 cursor-pointer transition ring-offset-2 ${
                        selectedSlug === x.slug
                          ? "ring-2 ring-blue-500"
                          : "hover:bg-accent"
                      }`}
                      onClick={() => setSelectedSlug(x.slug)}
                      asChild
                    >
                      <a target="_blank" rel="noopener noreferrer">
                        <ItemContent className="justify-between">
                          <ItemTitle>{x.name}</ItemTitle>
                        </ItemContent>
                      </a>
                    </Item>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Speakers + Date + Import */}
        <Card hidden={!(!load && fetchedTournaments)}>
          <CardHeader>Find Speaker From Name</CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Speaker Name"
                className="flex-1"
              />
              <Button
                onClick={handleSpeakerFetch}
                disabled={nameLoad}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Fetch
              </Button>
            </div>

            <Alert variant="destructive" hidden={!nameError}>
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle className="text-left">
                Unable to Fetch Speaker
              </AlertTitle>
              <AlertDescription>
                Make sure at least part of the name is correct.
                {errorMessage}
              </AlertDescription>
            </Alert>

            <div hidden={!fetchedNames} className="space-y-4">
              {nameLoad ? (
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 items-start">
                  {/* Left: names */}
                  <div className="space-y-2">
                    {names.map((x) => (
                      <Item
                        key={x["url"]}
                        variant="outline"
                        className={`mt-2 cursor-pointer transition ring-offset-2 ${
                          selectedName === x["url"]
                            ? "ring-2 ring-blue-500"
                            : "hover:bg-accent"
                        }`}
                        onClick={() => setSelectedName(x["url"])}
                        asChild
                      >
                        <a target="_blank" rel="noopener noreferrer">
                          <ItemContent className="justify-between">
                            <ItemTitle>{x["name"]}</ItemTitle>
                          </ItemContent>
                        </a>
                      </Item>
                    ))}
                  </div>

                  {/* Right: date + import + error */}
                  <div className="space-y-3">
                    <h3 className="text-xl">Tournament Date</h3>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => d && setDate(d)}
                      className="rounded-md border shadow-sm w-full"
                      captionLayout="dropdown"
                    />
                    <Button
                      onClick={handleMakeRecords}
                      disabled={tabLoad}
                      className="w-full"
                    >
                      {tabLoad ? <Spinner /> : "Add Records"}
                    </Button>

                    <Alert variant="destructive" hidden={!tabError}>
                      <AlertCircleIcon className="h-4 w-4" />
                      <AlertTitle className="text-left">
                        Unable to Import Records
                      </AlertTitle>
                      <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ImportDebates;
