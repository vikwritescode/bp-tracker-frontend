import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const Help = () => {
    return (
      <div className="w-full px-4 py-6 overflow-x-hidden">
        <div>
          <Card className="mx-auto max-w-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">Help</CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <p>
                The <Link to="/" className="underline">Dashboard</Link> provides a visual summary of your debating history, 
                including your average speaks and team points by past competition, by position, and by motion category.
              </p>
              <br />
              <p>
                <Link to="/debates" className="underline">Debates</Link> displays all of your past records in a table, sortable
                by date, tournament, position, and result.
              </p>
              <br />
              <p>
                <Link to="/add-debates" className="underline">Add Debates</Link> lets you enter the information for an individual
                debate by hand, including whether or not it is part of a tournament.
              </p>
              <br />
              <p>
                <Link to="/add-tournaments" className="underline">Add Tournaments</Link> allows you to manually create a record
                of a tournament to attach debates to.
              </p>
              <br />
              <p>
                <Link to="/import" className="underline">Import Tab</Link>, provided a TabbyCat URL or the prefix of a CalicoTab
                URL, automaticalyl obtains all of your results from that competition. 
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
}

export default Help;