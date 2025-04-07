
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, BarChart4, CheckCircle, Clock } from "lucide-react";

const HomePage = () => {
  const features = [
    {
      title: "Comprehensive Assessment",
      description: "Evaluate your organization across 5 key domains: Business, People, Process, Technology, and Services.",
      icon: BarChart4
    },
    {
      title: "Visual Insights",
      description: "Get clear, visual representations of your organization's strengths and improvement areas.",
      icon: CheckCircle
    },
    {
      title: "Quick & Easy",
      description: "Complete the assessment in under 30 minutes with our streamlined question format.",
      icon: Clock
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-assessment-blue-100 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-assessment-blue-600 mb-6">
                Evaluate Your Organization's Capabilities
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Our assessment platform helps you identify strengths, uncover opportunities, 
                and create a roadmap for strategic improvement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-assessment-blue-600 hover:bg-assessment-blue-700">
                  <Link to="/register">
                    Start Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/methodology">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Use Our Assessment Platform?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                  <div className="bg-assessment-blue-100 p-3 rounded-full mb-4">
                    <feature.icon className="h-6 w-6 text-assessment-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-assessment-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Gain Insights Into Your Organization?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of organizations that have used our assessment to drive strategic improvement.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/register">
                Create Free Account
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
