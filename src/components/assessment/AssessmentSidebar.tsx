import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Circle, 
  BarChart4, 
  Users, 
  Settings, 
  Database,
  Layers,
  ChevronRight,
  FileText,
  BookOpen,
  Shield
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Define the assessment domains to match Excel sheet structure
const domains = [
  {
    id: "business",
    name: "Business",
    icon: BarChart4,
    subdomains: [
      { id: "drivers", name: "Business Drivers" },
      { id: "customers", name: "Customers" },
      { id: "charter", name: "Charter" },
      { id: "governance", name: "Governance" },
      { id: "privacy_policy", name: "Privacy & Policy" }
    ]
  },
  {
    id: "people",
    name: "People",
    icon: Users,
    subdomains: [
      { id: "employees", name: "Employees" },
      { id: "roles", name: "Roles and Hierarchy" },
      { id: "management", name: "People Management" },
      { id: "knowledge", name: "Knowledge Management" },
      { id: "training", name: "Training & Education" }
    ]
  },
  {
    id: "process",
    name: "Process",
    icon: Layers,
    subdomains: [
      { id: "management", name: "SOC Management" },
      { id: "operations", name: "Operations & Facilities" },
      { id: "reporting", name: "Reporting & Communication" },
      { id: "usecase", name: "Use Case Management" },
      { id: "detection", name: "Detection Engineering & Validation" }
    ]
  },
  {
    id: "technology",
    name: "Technology",
    icon: Settings,
    subdomains: [
      { id: "siem_tooling", name: "SIEM Tooling" },
      { id: "idps_tooling", name: "IDPS Tooling" },
      { id: "security_analytics_tooling", name: "Security Analytics Tooling" },
      { id: "automation_orchestration_tooling", name: "Automation & Orchestration Tooling" }
    ]
  },
  {
    id: "services",
    name: "Services",
    icon: Database,
    subdomains: [
      { id: "security_monitoring", name: "Security Monitoring" },
      { id: "security_incident_management", name: "Security Incident Management" },
      { id: "security_analysis_forensics", name: "Security Analysis & Forensics" },
      { id: "threat_intelligence", name: "Threat Intelligence" },
      { id: "threat_hunting", name: "Threat Hunting" },
      { id: "vulnerability_management", name: "Vulnerability Management" },
      { id: "log_management", name: "Log Management" }
    ]
  }
];

interface AssessmentSidebarProps {
  progress?: Record<string, Record<string, boolean>>;
}

const AssessmentSidebar = ({ progress = {} }: AssessmentSidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isPathActive = (path: string) => {
    return currentPath.includes(path);
  };

  const isSubdomainComplete = (domain: string, subdomain: string) => {
    return progress?.[domain]?.[subdomain] || false;
  };

  // Calculate completion percentage for each domain
  const getDomainCompletion = (domainId: string) => {
    const domainObj = domains.find(d => d.id === domainId);
    if (!domainObj) return 0;
    
    const totalSubdomains = domainObj.subdomains.length;
    const completedSubdomains = domainObj.subdomains.filter(s => 
      isSubdomainComplete(domainId, s.id)
    ).length;
    
    return totalSubdomains > 0 ? Math.round((completedSubdomains / totalSubdomains) * 100) : 0;
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r h-screen overflow-y-auto">
      <div className="p-4 border-b bg-blue-600 text-white">
        <h2 className="font-semibold text-lg">Assessment Tool</h2>
      </div>
      
      <div className="p-4 bg-blue-50 border-b">
        <div className="flex justify-between items-center">
          <Button asChild variant="outline" size="sm" className="text-blue-600 border-blue-300">
            <Link to="/dashboard">
              <FileText className="h-4 w-4 mr-1" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="text-blue-600 border-blue-300">
            <Link to="/methodology">
              <BookOpen className="h-4 w-4 mr-1" />
              Guide
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="py-2">
        {domains.map((domain) => {
          const domainCompletion = getDomainCompletion(domain.id);
          const isActive = isPathActive(`/assessment/${domain.id}`);
          
          return (
            <div key={domain.id} className="mb-1">
              <div className={`flex items-center px-4 py-2 ${isActive ? 'bg-blue-50' : ''} border-l-4 ${isActive ? 'border-blue-600' : 'border-transparent'}`}>
                <domain.icon className="h-5 w-5 mr-2 text-blue-600" />
                <span className="font-medium flex-1">{domain.name}</span>
                {domainCompletion > 0 && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {domainCompletion}%
                  </span>
                )}
              </div>
              
              <div className="pl-10 space-y-1 mt-0.5">
                {domain.subdomains.map((subdomain) => {
                  const isComplete = isSubdomainComplete(domain.id, subdomain.id);
                  const isActive = isPathActive(`/assessment/${domain.id}/${subdomain.id}`);
                  
                  return (
                    <Link 
                      key={subdomain.id}
                      to={`/assessment/${domain.id}/${subdomain.id}`}
                      className={`
                        flex items-center py-1.5 px-2 text-sm rounded-md
                        ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}
                      `}
                    >
                      {isComplete ? (
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <Circle className="h-4 w-4 mr-2 text-gray-400" />
                      )}
                      <span className="flex-1">{subdomain.name}</span>
                      <ChevronRight className="h-3 w-3 text-gray-400" />
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t flex justify-between">
        <Button asChild variant="outline" className="w-full bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100">
          <Link to="/results">
            <BarChart4 className="h-4 w-4 mr-2" />
            View Results
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AssessmentSidebar;
