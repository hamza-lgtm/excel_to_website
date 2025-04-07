import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface DomainScore {
  name: string;
  score: number;
  target?: number;
  capability?: number;
  capabilityTarget?: number;
  inScope?: string;
  subdomains?: SubdomainScore[];
}

interface SubdomainScore {
  name: string;
  score: number;
  target?: number;
  capability?: number;
  capabilityTarget?: number;
  inScope?: string;
}

interface ResultsTableProps {
  data: DomainScore[];
}

const ResultsTable = ({ data }: ResultsTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-assessment-blue-50">
            <TableRow>
              <TableHead className="w-[250px]">Domain</TableHead>
              <TableHead className="text-center">Maturity Score</TableHead>
              <TableHead className="text-center">Maturity Target</TableHead>
              <TableHead className="text-center">Capability score</TableHead>
              <TableHead className="text-center">Capability target</TableHead>
              <TableHead className="text-center">In scope?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((domain, index) => (
              <React.Fragment key={domain.name}>
                <TableRow className={index % 2 === 0 ? "bg-white" : "bg-assessment-blue-50/30"}>
                  <TableCell className="font-medium">{domain.name}</TableCell>
                  <TableCell className="text-center">{domain.score}</TableCell>
                  <TableCell className="text-center">{domain.target || "N/A"}</TableCell>
                  <TableCell className="text-center">{domain.capability || "N/A"}</TableCell>
                  <TableCell className="text-center">{domain.capabilityTarget || "N/A"}</TableCell>
                  <TableCell className="text-center">{domain.inScope || "Yes"}</TableCell>
                </TableRow>
                
                {/* Render subdomains if they exist */}
                {domain.subdomains && domain.subdomains.map((subdomain, subIndex) => (
                  <TableRow key={`${domain.name}-${subdomain.name}`} className={index % 2 === 0 ? "bg-white" : "bg-assessment-blue-50/30"}>
                    <TableCell className="pl-8 text-sm">
                      {`${subIndex + 1}. ${subdomain.name}`}
                    </TableCell>
                    <TableCell className="text-center">{subdomain.score}</TableCell>
                    <TableCell className="text-center">{subdomain.target || "N/A"}</TableCell>
                    <TableCell className="text-center">{subdomain.capability || "N/A"}</TableCell>
                    <TableCell className="text-center">{subdomain.capabilityTarget || "N/A"}</TableCell>
                    <TableCell className="text-center">{subdomain.inScope || "Yes"}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ResultsTable;
