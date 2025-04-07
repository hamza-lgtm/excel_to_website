
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-assessment-blue-600">Create your account</h1>
            <p className="mt-2 text-gray-600">
              Get started with your organizational assessment
            </p>
          </div>
          
          <RegisterForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegisterPage;
