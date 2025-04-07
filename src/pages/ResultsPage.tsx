
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ResultsChart from "@/components/results/ResultsChart";
import ScatterChart from "@/components/results/ScatterChart";
import RadarChart from "@/components/results/RadarChart";
import PieChart from "@/components/results/PieChart";
import ResultsTable from "@/components/results/ResultsTable";
import ResultsSharing from "@/components/results/ResultsSharing";
import DownloadOptions from "@/components/results/DownloadOptions";
import { ArrowLeft, BarChart, PieChartIcon, Activity, Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { DomainScore } from "../types";

// Mock data for results visualization
const domainScores = [
  { 
    name: "Business", 
    score: 2, 
    target: 3, 
    maxScore: 5,
    subdomains: [
      { name: "Business drivers", score: 2, target: 3 },
      { name: "Customers", score: 2, target: 3 },
      { name: "Charter", score: 2, target: 3 },
      { name: "Governance", score: 2, target: 3 },
      { name: "Strategy & policy", score: 2, target: 3 }
    ]
  },
  { 
    name: "People", 
    score: 2, 
    target: 3, 
    maxScore: 5,
    subdomains: [
      { name: "Employees", score: 2, target: 3 },
      { name: "Roles and Hierarchy", score: 2, target: 3 },
      { name: "People Management", score: 2, target: 3 },
      { name: "Knowledge Management", score: 2, target: 3 },
      { name: "Training & Education", score: 2, target: 3 }
    ]
  },
  { 
    name: "Process", 
    score: 2, 
    target: 3, 
    maxScore: 5,
    subdomains: [
      { name: "SOC Management", score: 2, target: 3 },
      { name: "Operations & Facilities", score: 2, target: 3 },
      { name: "Reporting & Communication", score: 2, target: 3 },
      { name: "Use Case Management", score: 2, target: 3 },
      { name: "Detection Engineering & Validation", score: 2, target: 3 }
    ]
  },
  { 
    name: "Technology", 
    score: 2, 
    target: 3, 
    capability: 0, 
    capabilityTarget: 3, 
    inScope: "Yes",
    maxScore: 5,
    subdomains: [
      { name: "SIEM / UEBA tooling", score: 2, target: 3, capability: 0, capabilityTarget: 3, inScope: "Yes" },
      { name: "EDR tooling", score: 2, target: 3, capability: 0, capabilityTarget: 3, inScope: "Yes" },
      { name: "SOAR tooling", score: 2, target: 3, capability: 0, capabilityTarget: 3, inScope: "Yes" },
      { name: "NDR tooling", score: 2, target: 3, capability: 0, capabilityTarget: 3, inScope: "Yes" }
    ]
  },
  { 
    name: "Services", 
    score: 2, 
    target: 3, 
    capability: 0, 
    capabilityTarget: 3, 
    inScope: "Yes",
    maxScore: 5,
    subdomains: [
      { name: "Security Monitoring", score: 2, target: 3, capability: 0, capabilityTarget: 3, inScope: "Yes" },
      { name: "Security Incident Management", score: 2, target: 3, capability: 0, capabilityTarget: 3, inScope: "Yes" },
      { name: "Security Analysis & Forensics", score: 2, target: 3, capability: 0, capabilityTarget: 3, inScope: "Yes" },
      { name: "Threat Intelligence", score: 2, target: 3, capability: 0, capabilityTarget: 3, inScope: "Yes" },
      { name: "Threat Hunting", score: 2, target: 3, capability: 0, capabilityTarget: 3, inScope: "Yes" },
      { name: "Vulnerability Management", score: 2, target: 3, capability: 0, capabilityTarget: 3, inScope: "Yes" },
      { name: "Log Management", score: 2, target: 3, capability: 0, capabilityTarget: 3, inScope: "Yes" }
    ]
  },
];

const subdomainScores = [
  // Business subdomains
  { name: "Business drivers", domain: "Business", x: 65, y: 78, z: 100 },
  { name: "Customers", domain: "Business", x: 70, y: 72, z: 100 },
  { name: "Charter", domain: "Business", x: 55, y: 80, z: 100 },
  { name: "Governance", domain: "Business", x: 60, y: 75, z: 100 },
  { name: "Strategy & policy", domain: "Business", x: 65, y: 70, z: 100 },
  
  // People subdomains
  { name: "Employees", domain: "People", x: 60, y: 65, z: 100 },
  { name: "Roles and Hierarchy", domain: "People", x: 40, y: 70, z: 100 },
  { name: "People Management", domain: "People", x: 75, y: 68, z: 100 },
  { name: "Knowledge Management", domain: "People", x: 60, y: 65, z: 100 },
  { name: "Training & Education", domain: "People", x: 65, y: 70, z: 100 },
  
  // Process subdomains
  { name: "SOC Management", domain: "Process", x: 80, y: 85, z: 100 },
  { name: "Operations & Facilities", domain: "Process", x: 70, y: 80, z: 100 },
  { name: "Reporting & Communication", domain: "Process", x: 85, y: 75, z: 100 },
  { name: "Use Case Management", domain: "Process", x: 75, y: 80, z: 100 },
  { name: "Detection Engineering & Validation", domain: "Process", x: 80, y: 75, z: 100 },
  
  // Technology subdomains
  { name: "SIEM / UEBA tooling", domain: "Technology", x: 60, y: 55, z: 100 },
  { name: "EDR tooling", domain: "Technology", x: 70, y: 60, z: 100 },
  { name: "SOAR tooling", domain: "Technology", x: 65, y: 65, z: 100 },
  { name: "NDR tooling", domain: "Technology", x: 60, y: 60, z: 100 },
  
  // Services subdomains
  { name: "Security Monitoring", domain: "Services", x: 75, y: 75, z: 100 },
  { name: "Security Incident Management", domain: "Services", x: 70, y: 70, z: 100 },
  { name: "Security Analysis & Forensics", domain: "Services", x: 65, y: 75, z: 100 },
  { name: "Threat Intelligence", domain: "Services", x: 70, y: 65, z: 100 },
  { name: "Threat Hunting", domain: "Services", x: 65, y: 70, z: 100 },
  { name: "Vulnerability Management", domain: "Services", x: 60, y: 65, z: 100 },
  { name: "Log Management", domain: "Services", x: 65, y: 60, z: 100 },
];

const ResultsPage = () => {
  const [activeTab, setActiveTab] = useState("results");
  const [activePage, setActivePage] = useState(1);
  const assessmentDate = new Date().toLocaleDateString();
  
  // Calculate overall score from domain scores
  const overallScore = Math.round(
    domainScores.reduce((sum, domain) => sum + (domain.score / domain.maxScore) * 100, 0) / domainScores.length
  );

  // Helper function to render the appropriate page content based on active page
  const renderPageContent = () => {
    if (activeTab === "results") {
      switch (activePage) {
        case 1:
          return (
            <div className="space-y-6">
              <ResultsTable data={domainScores} />
            </div>
          );
        case 2:
          return (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-assessment-blue-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Function</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Maturity Score</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Capability score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Organizational Context (OC-OC)</td>
                      <td className="border border-gray-300 px-4 py-2">Governance</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">N/A</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Risk Management Strategy (GO-RM)</td>
                      <td className="border border-gray-300 px-4 py-2">Governance</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">N/A</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Roles, Responsibilities, and Authorities (GO-RR)</td>
                      <td className="border border-gray-300 px-4 py-2">Governance</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">N/A</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Policy (PO-PO)</td>
                      <td className="border border-gray-300 px-4 py-2">Governance</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">N/A</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Compliance (CO-CO)</td>
                      <td className="border border-gray-300 px-4 py-2">Governance</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">N/A</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Asset Management (Asset Mgmt) (AM-AM)</td>
                      <td className="border border-gray-300 px-4 py-2">Identify</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        case 3:
          return (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-assessment-blue-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Function</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Maturity Score</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Capability score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Risk Assessment (ID-RA)</td>
                      <td className="border border-gray-300 px-4 py-2">Identify</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">N/A</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Business Environment (ID-BE)</td>
                      <td className="border border-gray-300 px-4 py-2">Identify</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">N/A</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Continuous Monitoring (DE-CM)</td>
                      <td className="border border-gray-300 px-4 py-2">Detect</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">N/A</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Technology Infrastructure Monitoring (DE-TM)</td>
                      <td className="border border-gray-300 px-4 py-2">Detect</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">N/A</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Platform Security (PR-PS)</td>
                      <td className="border border-gray-300 px-4 py-2">Protect</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">N/A</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Data Security (PR-DS)</td>
                      <td className="border border-gray-300 px-4 py-2">Protect</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        case 4:
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-center text-lg">Domain Balance Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <RadarChart data={domainScores} />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-center text-lg">Domain Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <div className="flex justify-center items-center h-full">
                        <div className="w-full max-w-md">
                          <ResultsChart data={domainScores} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        default:
          return null;
      }
    } else if (activeTab === "sharing") {
      return <ResultsSharing />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-assessment-blue-50">
      <div className="bg-assessment-blue-600 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white" asChild>
              <Link to="/dashboard">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Results</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="bg-white shadow-sm mb-4">
          <Tabs defaultValue="results" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full bg-assessment-blue-100 p-0 h-auto">
              <TabsTrigger 
                value="results" 
                className={`flex-1 py-3 rounded-none ${activeTab === 'results' ? 'bg-white' : ''}`}
              >
                1. Results
              </TabsTrigger>
              <TabsTrigger 
                value="sharing" 
                className={`flex-1 py-3 rounded-none ${activeTab === 'sharing' ? 'bg-white' : ''}`}
              >
                2. Results Sharing
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="results" className="p-0">
              <div className="bg-assessment-blue-100 p-2 flex justify-between items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setActivePage(prev => Math.max(prev - 1, 1))}
                  disabled={activePage === 1}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={activePage === 1 ? "secondary" : "ghost"} 
                    size="sm" 
                    onClick={() => setActivePage(1)}
                  >
                    Page 1
                  </Button>
                  <Button 
                    variant={activePage === 2 ? "secondary" : "ghost"} 
                    size="sm" 
                    onClick={() => setActivePage(2)}
                  >
                    Page 2
                  </Button>
                  <Button 
                    variant={activePage === 3 ? "secondary" : "ghost"} 
                    size="sm" 
                    onClick={() => setActivePage(3)}
                  >
                    Page 3
                  </Button>
                  <Button 
                    variant={activePage === 4 ? "secondary" : "ghost"} 
                    size="sm" 
                    onClick={() => setActivePage(4)}
                  >
                    Page 4
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setActivePage(prev => Math.min(prev + 1, 4))}
                  disabled={activePage === 4}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-4">
                {renderPageContent()}
              </div>
            </TabsContent>
            
            <TabsContent value="sharing" className="p-4">
              <ResultsSharing />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button className="mr-4" asChild>
            <Link to="/assessment">
              Start New Assessment
            </Link>
          </Button>
          <DownloadOptions 
            assessmentName="SOC Assessment" 
            assessmentDate={assessmentDate} 
            domainScores={domainScores} 
            overallScore={overallScore}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
