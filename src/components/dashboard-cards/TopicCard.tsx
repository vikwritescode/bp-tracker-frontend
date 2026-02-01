import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
interface TopicCardProps {
  debateData: Array<any>;
}
const TopicCard = ({ debateData }: TopicCardProps) => {
  const [sortBy, setSortBy] = useState(0);
  const stats = debateData.reduce<Record<string, [number, number, number]>>((acc, debate) => {
    for (const category of debate["categories"]) {
      if (!acc[category]) {
        acc[category] = [0, 0, 0];
      }
      acc[category][0] += debate["points"];
      acc[category][1] += debate["speaks"];
      acc[category][2] += 1;
    }
    return acc;
  }, {});
  const pairs = Object.entries(stats);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-4xl">Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Average Points</TableHead>
              <TableHead>Average Speaks</TableHead>
              <TableHead>Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pairs
            .sort((a, b) => {
              const avgA = (a[1][sortBy] / a[1][2]) || 0;
              const avgB = (b[1][sortBy] / b[1][2]) || 0;
              return avgB - avgA
            })
            .map((pair: Array<any>)  => (
              <TableRow>
                <TableCell>{pair[0] == "null" ? "Other" : pair[0]}</TableCell>
                <TableCell>{(pair[1][0] / pair[1][2]).toFixed(2)}</TableCell>
                <TableCell>{(pair[1][1] / pair[1][2]).toFixed(2)}</TableCell>
                <TableCell>{pair[1][2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopicCard;
