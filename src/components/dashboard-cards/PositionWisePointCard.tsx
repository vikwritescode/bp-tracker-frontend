import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface PositionWidePointCardProps {
  debateData: Array<any>;
}
const PositionWisePointCard = ({ debateData }: PositionWidePointCardProps) => {
  const dispAv = ([s, c]: Array<number>) => (s / c || 0).toFixed(2);
  const stats = debateData.reduce(
    (acc, debate) => {
      const position = debate["position"].toLowerCase();
      const points = debate["points"];

      acc[position][0] += points;
      acc[position][1] += 1;
      return acc;
    },
    {
      og: [0, 0],
      oo: [0, 0],
      cg: [0, 0],
      co: [0, 0],
    }
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Points by Position</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Position</TableHead>
              <TableHead className="text-center">Average Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">OG</TableCell>
              <TableCell>
                {dispAv(stats["og"])}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">OO</TableCell>
              <TableCell>
                {dispAv(stats["oo"])}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">CG</TableCell>
              <TableCell>
                {dispAv(stats["cg"])}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">CO</TableCell>
              <TableCell>
                {dispAv(stats["co"])}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PositionWisePointCard;
