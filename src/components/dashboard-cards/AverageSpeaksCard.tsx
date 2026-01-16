import type { DebateRecord } from "@/interfaces";
import { Card, CardContent } from "../ui/card";
import { mean } from "mathjs";
import { useEffect, useState } from "react";

interface AverageSpeaksCardProps {
  debateData: Array<DebateRecord>;
}
const AverageSpeaksCard = ({ debateData }: AverageSpeaksCardProps) => {
  const speakArray = debateData.map((x) => x["speaks"]);
  const [speaks, setMeanSpeaks] = useState<number>(0);
  useEffect(() => {
    if (speakArray.length === 0) {
      setMeanSpeaks(0);
    } else {
      setMeanSpeaks(mean(speakArray));
    }
  }, [debateData]);

  return (
    <Card>
      <CardContent>
        <h2 className="bold text-2xl">
          You average a speaker score of {speaks.toFixed(2)}
        </h2>
      </CardContent>
    </Card>
  );
};

export default AverageSpeaksCard;
