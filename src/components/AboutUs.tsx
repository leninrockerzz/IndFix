
import React from "react";
import { 
  Car, 
  Wrench, 
  Search, 
  MapPin, 
  FileText, 
  MessageCircle, 
  DollarSign, 
  Timer, 
  TrendingUp, 
  Save
} from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";

const AboutUs = () => {
  return (
    <section id="about-us" className="bg-white py-16 md:py-24">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-auto-blue">
            Welcome to <span className="text-auto-red">IND<span className="font-bold">FIX</span></span> – Your AI-Powered Vehicle Repair Assistant! 🚗🔧
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            INDFIX is your go-to platform for DIY vehicle repairs and automotive parts replacement. 
            Whether you're a car enthusiast or just need a quick fix, we make vehicle maintenance 
            simple and hassle-free.
          </p>
        </div>
        
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            What Our Website Can Do for You
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Car className="h-10 w-10 text-auto-red" />}
              title="Find the Right Parts"
              description="Enter your vehicle details and get compatible replacement parts instantly."
            />
            
            <FeatureCard 
              icon={<Wrench className="h-10 w-10 text-auto-red" />}
              title="Damage Identification"
              description="Not sure what's broken? Our AI assistant helps you diagnose issues and suggests solutions."
            />
            
            <FeatureCard 
              icon={<MapPin className="h-10 w-10 text-auto-red" />}
              title="Locate Nearby Parts"
              description="Get the best deals from trusted suppliers near you with real-time price comparisons."
            />
            
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-auto-red" />}
              title="DIY Repair Guides"
              description="Step-by-step instructions and video tutorials to help you replace parts on your own."
            />
            
            <FeatureCard 
              icon={<MessageCircle className="h-10 w-10 text-auto-red" />}
              title="AI-Powered Chatbot"
              description="Need help? Chat with our AI assistant for real-time support and expert recommendations."
            />
            
            <FeatureCard 
              icon={<Search className="h-10 w-10 text-auto-red" />}
              title="Interactive Vehicle Selection"
              description="Choose your vehicle type, make, and model with an easy-to-use interface."
            />
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center text-auto-blue">
            Why Choose <span className="text-auto-red">INDFIX</span>?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard 
              icon={<Save className="h-8 w-8 text-white" />}
              title="Save Money"
              description="Reduce your repair costs significantly by doing it yourself"
            />
            
            <BenefitCard 
              icon={<Timer className="h-8 w-8 text-white" />}
              title="Save Time"
              description="No more waiting at repair shops - fix it on your schedule"
            />
            
            <BenefitCard 
              icon={<TrendingUp className="h-8 w-8 text-white" />}
              title="Learn Skills"
              description="Build confidence and knowledge with our easy guides"
            />
            
            <BenefitCard 
              icon={<DollarSign className="h-8 w-8 text-white" />}
              title="Compare Prices"
              description="Find the best deals from multiple suppliers near you"
            />
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">
            🔧 Get Started Now!
          </h3>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Enter your vehicle details and let INDFIX help you fix it yourself!
          </p>
          <button 
            onClick={() => {
              const vehicleSelector = document.getElementById("vehicle-selector");
              if (vehicleSelector) {
                vehicleSelector.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="btn-primary text-lg px-8 py-3"
          >
            Start Fixing Now
          </button>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="card-hover border-gray-200">
      <CardHeader className="pb-2">
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-xl font-bold text-auto-blue">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard = ({ icon, title, description }: BenefitCardProps) => {
  return (
    <div className="bg-auto-blue rounded-xl p-6 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="bg-auto-red rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
        {icon}
      </div>
      <h4 className="text-xl font-semibold mb-2 text-center">{title}</h4>
      <p className="text-gray-100 text-center">{description}</p>
    </div>
  );
};

export default AboutUs;
