import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Item,
  ItemTitle,
  ItemActions,
  ItemContent,
} from "@/components/ui/item";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

interface slugInterface {
  name: string;
  slug: string;
}
const ImportDebates = () => {
  const { user } = useContext(Context);
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

  const handleSlugFetch = async () => {
    setFetchedTouraments(true);
    const token = await user?.getIdToken();
    try {
      setLoad(true);
      setError(false);
      const response = await fetch(
        `http://localhost:8000/api/tournaments?url=${encodeURIComponent(url)}`,
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
        `http://localhost:8000/api/speakers?url=${encodeURIComponent(
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
      setSelectedName(json[0].name);
    } catch (err) {
      console.error(err);
      setFetchedNames(false);
      setNameError(true);
    } finally {
      setNameLoad(false);
    }
  };

  const handleMakeRecords = async () => {
    alert("TODO!");
  };
  return (
    <>
      <h1 className="text-6xl">Import from URL</h1>
      <Card>
        <CardHeader>Find Tournaments from URL</CardHeader>
        <CardContent>
          <Input
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Tab URL"
          />
          <Button onClick={handleSlugFetch} disabled={load}>
            Fetch
          </Button>
          <Alert variant="destructive" hidden={!error}>
            <AlertCircleIcon />
            <AlertTitle className="text-left">
              Unable to Fetch Tournament
            </AlertTitle>
            <AlertDescription>
              Make sure the tab URL is correct, and that only the tab URL is
              present.
            </AlertDescription>
          </Alert>
          <div hidden={!fetchedTournaments}>
            {load ? (
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              <>
                {slugs.map((x: slugInterface) => (
                  <Item
                    variant="outline"
                    className={`mt-4 ${
                      selectedSlug === x.slug ? "ring-2 ring-blue-500" : ""
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
              </>
            )}
          </div>
        </CardContent>
      </Card>
      <Card hidden={!(!load && fetchedTournaments)}>
        <CardHeader>Find Speaker From Name</CardHeader>
        <CardContent>
          <Input
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Speaker Name"
          />
          <Button onClick={handleSpeakerFetch} disabled={nameLoad}>
            Fetch
          </Button>

          <Alert variant="destructive" hidden={!nameError}>
            <AlertCircleIcon />
            <AlertTitle className="text-left">
              Unable to Fetch Speaker
            </AlertTitle>
            <AlertDescription>
              Make sure at least part of the name is correct.
            </AlertDescription>
          </Alert>

          <div hidden={!fetchedNames}>
            {nameLoad ? (
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              <>
                {names.map((x) => (
                  <Item
                    variant="outline"
                    className={`mt-4 ${
                      selectedName === x["name"] ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedName(x["name"])}
                    asChild
                  >
                    <a target="_blank" rel="noopener noreferrer">
                      <ItemContent className="justify-between">
                        <ItemTitle>{x["name"]}</ItemTitle>
                      </ItemContent>
                    </a>
                  </Item>
                ))}
              </>
            )}
            <Button onClick={handleMakeRecords}>Add Records</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ImportDebates;
