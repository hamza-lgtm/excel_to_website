import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileText, FileDown, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { DomainScore, DetailedFunction } from "../../../src/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface DownloadOptionsProps {
  assessmentName?: string;
  assessmentDate?: string;
  domainScores?: DomainScore[];
  overallScore?: number;
}

const DownloadOptions = ({ 
  assessmentName = "Assessment", 
  assessmentDate = new Date().toLocaleDateString(),
  domainScores,
  overallScore = 72
}: DownloadOptionsProps) => {
  const [downloading, setDownloading] = useState(false);

  // Data for the report
  const reportData: {
    name: string;
    date: string;
    domains: DomainScore[];
    overallScore: number;
    detailedFunctions: DetailedFunction[];
    strengths: string[];
    improvements: string[];
    recommendations: string[];
  } = {
    name: assessmentName,
    date: assessmentDate,
    domains: domainScores || [
      { name: "Business", score: 76, maxScore: 100 },
      { name: "People", score: 68, maxScore: 100 },
      { name: "Process", score: 82, maxScore: 100 },
      { name: "Technology", score: 59, maxScore: 100 },
      { name: "Services", score: 73, maxScore: 100 },
    ],
    overallScore: overallScore,
    detailedFunctions: [
      { function: "Organizational Context (OC-OC)", category: "Governance", maturityScore: 2, capabilityScore: "N/A" },
      { function: "Risk Management Strategy (GO-RM)", category: "Governance", maturityScore: 2, capabilityScore: "N/A" },
      { function: "Roles, Responsibilities, and Authorities (GO-RR)", category: "Governance", maturityScore: 2, capabilityScore: "N/A" },
      { function: "Policy (PO-PO)", category: "Governance", maturityScore: 2, capabilityScore: "N/A" },
      { function: "Compliance (CO-CO)", category: "Governance", maturityScore: 2, capabilityScore: "N/A" },
      { function: "Asset Management (Asset Mgmt) (AM-AM)", category: "Identify", maturityScore: 2, capabilityScore: "N/A" },
      { function: "Risk Assessment (ID-RA)", category: "Identify", maturityScore: 2, capabilityScore: "N/A" },
      { function: "Business Environment (ID-BE)", category: "Identify", maturityScore: 2, capabilityScore: "N/A" },
      { function: "Continuous Monitoring (DE-CM)", category: "Detect", maturityScore: 2, capabilityScore: "N/A" },
      { function: "Technology Infrastructure Monitoring (DE-TM)", category: "Detect", maturityScore: 2, capabilityScore: "N/A" },
      { function: "Platform Security (PR-PS)", category: "Protect", maturityScore: 2, capabilityScore: "N/A" },
      { function: "Data Security (PR-DS)", category: "Protect", maturityScore: 2, capabilityScore: "N/A" },
    ],
    strengths: [
      "Strong process management with established operations and quality systems",
      "Well-defined business strategy with clear financial controls",
      "Solid service delivery with good customer support mechanisms",
    ],
    improvements: [
      "Technology infrastructure requires modernization",
      "People capabilities need more strategic development",
      "Innovation processes could be more systematic and embedded",
    ],
    recommendations: [
      "Develop a technology roadmap aligned with business strategy",
      "Implement a structured capability development framework",
      "Establish innovation metrics and governance",
      "Enhance data management practices and analytics capabilities",
    ],
  };

  // Function to generate chart SVG strings for embedding in HTML
  const generateBarChartSVG = () => {
    const chartData = reportData.domains.map(domain => ({
      name: domain.name,
      score: Math.round((domain.score / domain.maxScore) * 100)
    }));
    
    const svgWidth = 500;
    const svgHeight = 300;
    const barWidth = (svgWidth - 100) / chartData.length;
    
    let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;
    
    // Add title
    svg += `<text x="${svgWidth/2}" y="20" text-anchor="middle" font-weight="bold">Domain Scores</text>`;
    
    // Draw axes
    svg += `<line x1="50" y1="${svgHeight-50}" x2="${svgWidth-50}" y2="${svgHeight-50}" stroke="black" stroke-width="2"/>`;
    svg += `<line x1="50" y1="50" x2="50" y2="${svgHeight-50}" stroke="black" stroke-width="2"/>`;
    
    // Y-axis labels
    for (let i = 0; i <= 100; i += 20) {
      const y = svgHeight - 50 - (i * (svgHeight - 100) / 100);
      svg += `<text x="45" y="${y}" text-anchor="end" font-size="12">${i}%</text>`;
      svg += `<line x1="48" y1="${y}" x2="${svgWidth-50}" y2="${y}" stroke="#eee" stroke-width="1"/>`;
    }
    
    // Draw bars
    chartData.forEach((item, index) => {
      const barHeight = (item.score * (svgHeight - 100)) / 100;
      const x = 50 + (index * barWidth) + (barWidth * 0.1);
      const y = svgHeight - 50 - barHeight;
      
      svg += `<rect x="${x}" y="${y}" width="${barWidth * 0.8}" height="${barHeight}" fill="#1E40AF" opacity="0.8"/>`;
      svg += `<text x="${x + barWidth * 0.4}" y="${svgHeight - 35}" text-anchor="middle" font-size="12" transform="rotate(-45, ${x + barWidth * 0.4}, ${svgHeight - 35})">${item.name}</text>`;
      svg += `<text x="${x + barWidth * 0.4}" y="${y - 5}" text-anchor="middle" font-size="12">${item.score}%</text>`;
    });
    
    svg += '</svg>';
    return svg;
  };
  
  const generateRadarChartSVG = () => {
    const chartData = reportData.domains.map(domain => ({
      name: domain.name,
      score: Math.round((domain.score / domain.maxScore) * 100)
    }));
    
    const svgWidth = 500;
    const svgHeight = 400;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;
    const radius = Math.min(centerX, centerY) - 50;
    
    let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;
    
    // Add title
    svg += `<text x="${centerX}" y="20" text-anchor="middle" font-weight="bold">Domain Balance Analysis</text>`;
    
    // Draw radar circles
    for (let i = 20; i <= 100; i += 20) {
      const circleRadius = (radius * i) / 100;
      svg += `<circle cx="${centerX}" cy="${centerY}" r="${circleRadius}" fill="none" stroke="#eee" stroke-width="1"/>`;
      svg += `<text x="${centerX}" y="${centerY - circleRadius - 5}" text-anchor="middle" font-size="10">${i}%</text>`;
    }
    
    // Draw axes for each domain
    const angleStep = (2 * Math.PI) / chartData.length;
    const axes = chartData.map((item, index) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { name: item.name, angle, x, y };
    });
    
    axes.forEach(axis => {
      svg += `<line x1="${centerX}" y1="${centerY}" x2="${axis.x}" y2="${axis.y}" stroke="#ddd" stroke-width="1"/>`;
      const labelX = centerX + (radius + 20) * Math.cos(axis.angle);
      const labelY = centerY + (radius + 20) * Math.sin(axis.angle);
      svg += `<text x="${labelX}" y="${labelY}" text-anchor="middle" dominant-baseline="middle" font-size="12">${axis.name}</text>`;
    });
    
    // Draw data polygon
    const points = chartData.map((item, index) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top
      const distance = (item.score * radius) / 100;
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);
      return { x, y };
    });
    
    let pointsStr = '';
    points.forEach(point => {
      pointsStr += `${point.x},${point.y} `;
    });
    
    svg += `<polygon points="${pointsStr}" fill="#1E40AF" fill-opacity="0.6" stroke="#1E40AF" stroke-width="2"/>`;
    
    // Add data points
    points.forEach((point, index) => {
      svg += `<circle cx="${point.x}" cy="${point.y}" r="4" fill="#1E40AF"/>`;
      svg += `<text x="${point.x}" y="${point.y - 10}" text-anchor="middle" font-size="10">${chartData[index].score}%</text>`;
    });
    
    svg += '</svg>';
    return svg;
  };

  const handleDownload = async (format: "pdf" | "docx") => {
    setDownloading(true);
    try {
      if (format === "pdf") {
        // Generate chart SVGs
        const barChartSVG = generateBarChartSVG();
        const radarChartSVG = generateRadarChartSVG();
        
        // Create HTML report with embedded SVG charts
        const reportContent = generateReportHTML(reportData, barChartSVG, radarChartSVG);
        
        // Create a Blob from the HTML content
        const blob = new Blob([reportContent], { type: 'text/html' });
        
        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);
        
        // Open the URL in a new window for printing to PDF
        const printWindow = window.open(url, '_blank');
        if (printWindow) {
          printWindow.onload = () => {
            printWindow.print();
            URL.revokeObjectURL(url);
          };
        }
      } else if (format === "docx") {
        // For Word document, we'll create a simple text file with the report content
        const textContent = generateReportText(reportData);
        
        // Create a Blob from the text content
        const blob = new Blob([textContent], { type: 'text/plain' });
        
        // Create a download link for the Blob
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${assessmentName.replace(/\s+/g, '_')}_Report.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      
      toast.success(`${assessmentName} results downloaded as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error(`Failed to download ${format.toUpperCase()} report. Please try again.`);
      console.error("Download error:", error);
    } finally {
      setDownloading(false);
    }
  };
  
  // Function to generate HTML report content
  const generateReportHTML = (data: any, barChartSVG: string, radarChartSVG: string) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${data.name} Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1, h2, h3 { color: #1E40AF; }
          .score { font-size: 24px; font-weight: bold; color: #1E40AF; }
          table { border-collapse: collapse; width: 100%; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .section { margin-bottom: 30px; }
          .header { text-align: center; margin-bottom: 40px; }
          .logo { max-width: 200px; margin-bottom: 20px; }
          .chart-container { margin: 20px 0; text-align: center; }
          .page-break { page-break-before: always; }
          .text-center { text-align: center; }
          .subtitle { color: #666; font-size: 16px; margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${data.name} Report</h1>
          <p class="subtitle">Completed on: ${data.date}</p>
        </div>
        
        <div class="section">
          <h2>Executive Summary</h2>
          <p>This report presents the results of the ${data.name} assessment, which evaluates organizational maturity across multiple domains. The assessment was completed on ${data.date}.</p>
          <p class="score">Overall Maturity Score: ${data.overallScore}%</p>
        </div>
        
        <div class="section">
          <h2>Domain Scores</h2>
          <table>
            <tr>
              <th>Domain</th>
              <th>Maturity Score</th>
              <th>Maximum Score</th>
              <th>Percentage</th>
            </tr>
            ${data.domains.map((domain: any) => `
              <tr>
                <td>${domain.name}</td>
                <td>${domain.score}</td>
                <td>${domain.maxScore || 100}</td>
                <td>${Math.round((domain.score / (domain.maxScore || 100)) * 100)}%</td>
              </tr>
            `).join('')}
          </table>
          <div class="chart-container">
            ${barChartSVG}
          </div>
        </div>
        
        <div class="page-break"></div>
        
        <div class="section">
          <h2>Detailed Function Analysis</h2>
          <table>
            <tr>
              <th>Function</th>
              <th>Category</th>
              <th>Maturity Score</th>
              <th>Capability Score</th>
            </tr>
            ${data.detailedFunctions.map((func: any) => `
              <tr>
                <td>${func.function}</td>
                <td>${func.category}</td>
                <td>${func.maturityScore}</td>
                <td>${func.capabilityScore}</td>
              </tr>
            `).join('')}
          </table>
        </div>
        
        <div class="page-break"></div>
        
        <div class="section">
          <h2>Domain Balance Analysis</h2>
          <div class="chart-container">
            ${radarChartSVG}
          </div>
          <p>This analysis shows the balance of maturity across different domains, highlighting areas of strength and potential improvement.</p>
        </div>
        
        <div class="section">
          <h2>Key Insights</h2>
          
          <h3>Strengths</h3>
          <ul>
            ${data.strengths.map((item: string) => `<li>${item}</li>`).join('')}
          </ul>
          
          <h3>Improvement Areas</h3>
          <ul>
            ${data.improvements.map((item: string) => `<li>${item}</li>`).join('')}
          </ul>
          
          <h3>Recommendations</h3>
          <ol>
            ${data.recommendations.map((item: string) => `<li>${item}</li>`).join('')}
          </ol>
        </div>
      </body>
      </html>
    `;
  };
  
  // Function to generate plain text report content
  const generateReportText = (data: any) => {
    return `
${data.name.toUpperCase()} REPORT
${'='.repeat(data.name.length + 7)}

Completed on: ${data.date}

EXECUTIVE SUMMARY
${'-'.repeat(16)}
This report presents the results of the ${data.name} assessment, which evaluates organizational maturity across multiple domains.

OVERALL MATURITY SCORE: ${data.overallScore}%

DOMAIN SCORES
${'-'.repeat(12)}
${data.domains.map((domain: any) => `${domain.name}: ${domain.score} / ${domain.maxScore || 100} (${Math.round((domain.score / (domain.maxScore || 100)) * 100)}%)`).join('\n')}

DETAILED FUNCTION ANALYSIS
${'-'.repeat(25)}
${data.detailedFunctions.map((func: any) => `${func.function} (${func.category}): Maturity Score: ${func.maturityScore}, Capability Score: ${func.capabilityScore}`).join('\n')}

KEY INSIGHTS
${'-'.repeat(12)}

Strengths:
${data.strengths.map((item: string) => `* ${item}`).join('\n')}

Improvement Areas:
${data.improvements.map((item: string) => `* ${item}`).join('\n')}

Recommendations:
${data.recommendations.map((item: string, index: number) => `${index + 1}. ${item}`).join('\n')}
    `;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" disabled={downloading}>
          <Download className="mr-2 h-4 w-4" />
          {downloading ? "Downloading..." : "Download Results"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleDownload("pdf")} disabled={downloading}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Download as PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDownload("docx")} disabled={downloading}>
          <FileDown className="mr-2 h-4 w-4" />
          <span>Download as Word Document</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DownloadOptions;
