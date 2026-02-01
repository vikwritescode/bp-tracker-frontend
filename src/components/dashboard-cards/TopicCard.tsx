import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface TopicCardProps {
  debateData: Array<any>;
}
const TopicCard = ({ debateData }: TopicCardProps) => {
  const stats = debateData.reduce((acc, debate) => {
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
            {pairs.map((pair: Array<any>)  => (
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
