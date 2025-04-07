
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { HelpCircle, Mail, MapPin, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ContactPage = () => {
  const faqs = [
    {
      question: "How long does the assessment take to complete?",
      answer: "The assessment typically takes 20-30 minutes to complete, depending on how much detail you provide in the text responses."
    },
    {
      question: "Can I save my progress and continue later?",
      answer: "Yes, your progress is automatically saved. You can log back in at any time to continue where you left off."
    },
    {
      question: "How are the assessment results calculated?",
      answer: "Results are calculated using a weighted scoring algorithm based on industry benchmarks and best practices across the five domains."
    },
    {
      question: "Can multiple people from my organization complete the assessment?",
      answer: "Yes, multiple users from the same organization can complete separate assessments, or collaborate on a single assessment."
    },
    {
      question: "How often should we retake the assessment?",
      answer: "We recommend retaking the assessment every 6-12 months to track progress and identify new improvement areas."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-assessment-blue-100 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-assessment-blue-700 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Have questions about our assessment platform? We're here to help.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-assessment-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">support@horizonassessment.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-assessment-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-assessment-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Office</h3>
                    <p className="text-gray-600">
                      123 Assessment Drive<br />
                      Suite 400<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-assessment-blue-600" />
                  Frequently Asked Questions
                </h2>
                
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
