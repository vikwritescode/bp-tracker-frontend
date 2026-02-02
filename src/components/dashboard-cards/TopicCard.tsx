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
  const [ascending, setAscending] = useState(false);
  const stats = debateData.reduce<Record<string, [number, number, number]>>(
    (acc, debate) => {
      for (const category of debate["categories"]) {
        if (!acc[category]) {
          acc[category] = [0, 0, 0];
        }
        acc[category][0] += debate["points"];
        acc[category][1] += debate["speaks"];
        acc[category][2] += 1;
      }
      return acc;
    },
    {},
  );
  const pairs = Object.entries(stats);

  const handleSort = (ind: number) => {
    if (ind === sortBy) {
      // flip ascending/descending
      setAscending((prev) => !prev);
    } else {
      setSortBy(ind);
    }
  };
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
              <TableHead
                className="hover:underline hover:text-secondary-foreground"
                onClick={() => handleSort(0)}
              >
                Average Points
              </TableHead>
              <TableHead
                onClick={() => handleSort(1)}
                className="hover:underline hover:text-secondary-foreground"
              >
                Average Speaks
              </TableHead>
              <TableHead
                className="hover:underline hover:text-secondary-foreground"
                onClick={() => handleSort(2)}
              >
                Count
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pairs
              .sort((a, b) => {
                const mult = ascending ? 1 : -1;
                if (sortBy === 2) {
                  // do not find average in this case
                  return mult * (a[1][2] - b[1][2]);
                }
                const avgA = a[1][sortBy] / a[1][2] || 0;
                const avgB = b[1][sortBy] / b[1][2] || 0;
                return mult * (avgA - avgB);
              })
              .map((pair: Array<any>) => (
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
