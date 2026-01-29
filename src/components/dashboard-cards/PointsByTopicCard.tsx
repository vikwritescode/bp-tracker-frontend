import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface PointsByTopicCardProps {
  debateData: Array<any>;
}
const PointsByTopicCard = ({ debateData }: PointsByTopicCardProps) => {
  const dispAv = ([s, c]: Array<number>) => (s / c || 0).toFixed(2);
  const stats = debateData.reduce((acc, debate) => {
    for (const category of debate["categories"]) {
      if (!acc[category]) {
        acc[category] = [0, 0];
      }
      const points = debate["points"];
      acc[category][0] += points;
      acc[category][1] += 1;
    }
    return acc;
  }, {});
  const pairs = Object.entries(stats);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Points by Topic</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-center">Average Points</TableHead>
              <TableHead className="text-center">Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pairs.map((pair: Array<any>) => (
              <TableRow>
                <TableCell className="font-medium">{pair[0]}</TableCell>
                <TableCell>{dispAv(pair[1])}</TableCell>
                <TableCell>{pair[1][1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PointsByTopicCard;
