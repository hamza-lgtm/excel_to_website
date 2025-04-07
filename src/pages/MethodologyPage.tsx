
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const MethodologyPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-assessment-blue-100 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-assessment-blue-700 mb-4">Our Assessment Methodology</h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Learn about the research-backed approach we use to evaluate organizational capabilities.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Assessment Framework</h2>
              <p className="mb-4">
                Our comprehensive assessment is built on a five-domain framework that provides a holistic view of your 
                organization's capabilities. Each domain is evaluated through a series of targeted questions designed 
                to measure maturity across key dimensions.
              </p>
              <p>
                The assessment follows industry-standard maturity models, allowing for benchmarking against peers 
                and best practices. Questions are weighted according to their strategic importance, ensuring results 
                reflect true organizational priorities.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">The Five Domains</h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-assessment-blue-600 mb-2">Business</h3>
                  <p>
                    Evaluates strategic planning, governance frameworks, financial management, and overall 
                    business model effectiveness. This domain examines how well your organization aligns resources 
                    with strategic objectives.
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-assessment-blue-600 mb-2">People</h3>
                  <p>
                    Assesses workforce capabilities, organizational culture, talent management practices, and 
                    leadership effectiveness. This domain explores how your organization builds and maintains 
                    the human capital required for success.
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-assessment-blue-600 mb-2">Process</h3>
                  <p>
                    Analyzes operational efficiency, quality management, innovation processes, and continuous 
                    improvement methodologies. This domain evaluates how effectively your organization designs 
                    and executes core business processes.
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-assessment-blue-600 mb-2">Technology</h3>
                  <p>
                    Examines IT infrastructure, application portfolios, data management practices, and technology 
                    governance. This domain assesses how well your organization leverages technology to enable 
                    business objectives.
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-assessment-blue-600 mb-2">Services</h3>
                  <p>
                    Evaluates service offerings, delivery models, customer support, and service management practices. 
                    This domain explores how effectively your organization designs and delivers services to meet 
                    customer needs.
                  </p>
                </div>
              </div>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Assessment Process</h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li className="pl-2">
                  <span className="font-medium">Registration & Setup</span> - Create an account and provide basic organizational information.
                </li>
                <li className="pl-2">
                  <span className="font-medium">Question Responses</span> - Answer questions across the five domains using dropdown options and text fields.
                </li>
                <li className="pl-2">
                  <span className="font-medium">Real-time Progress Tracking</span> - Monitor your completion progress as you work through the assessment.
                </li>
                <li className="pl-2">
                  <span className="font-medium">Results Generation</span> - Upon completion, our system analyzes your responses and generates insights.
                </li>
                <li className="pl-2">
                  <span className="font-medium">Report Access</span> - Receive a comprehensive report with visualizations and improvement recommendations.
                </li>
              </ol>
            </section>
            
            <div className="mt-12 flex justify-center">
              <Button asChild className="bg-assessment-blue-600 hover:bg-assessment-blue-700">
                <Link to="/register">
                  Start Your Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MethodologyPage;
