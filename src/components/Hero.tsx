
import React from "react";
import { Car, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToVehicleSelector = () => {
    const vehicleSelector = document.getElementById("vehicle-selector");
    if (vehicleSelector) {
      vehicleSelector.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-auto-blue text-white overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(30deg,#4E80EE_12%,transparent_12.5%,transparent_87%,#4E80EE_87.5%,#4E80EE),linear-gradient(150deg,#4E80EE_12%,transparent_12.5%,transparent_87%,#4E80EE_87.5%,#4E80EE),linear-gradient(30deg,#4E80EE_12%,transparent_12.5%,transparent_87%,#4E80EE_87.5%,#4E80EE),linear-gradient(150deg,#4E80EE_12%,transparent_12.5%,transparent_87%,#4E80EE_87.5%,#4E80EE),linear-gradient(60deg,#99a9be_25%,transparent_25.5%,transparent_75%,#99a9be_75%,#99a9be)]" style={{ backgroundSize: "80px 140px", backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px, 0 0" }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center py-16 md:py-20 lg:py-24">
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 animate-fade-in">
            <div className="flex items-center justify-center lg:justify-start">
              <div className="bg-auto-red rounded-full p-2 mr-3">
                <Car className="h-6 w-6" />
              </div>
              <span className="text-auto-lightblue font-semibold">YOUR AUTOMOTIVE SOLUTION</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 leading-tight">
              Find the Right Parts for Your Vehicle Repair
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl mx-auto lg:mx-0">
              Get instant access to parts, DIY guides, and expert assistance for all your vehicle repair needs.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                onClick={scrollToVehicleSelector}
                className="btn-primary text-lg px-6 py-3"
              >
                Get Started
              </Button>
              
              <Button 
                variant="outline"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-auto-blue text-white font-medium py-2 px-6 rounded-md transition-all duration-300 text-lg"
              >
                How It Works
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center lg:justify-end animate-slide-up">
            <div className="relative">
              <div className="w-full h-full absolute -top-3 -left-3 bg-auto-red rounded-lg transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1041&q=80" 
                alt="Car mechanic repairing vehicle" 
                className="relative z-10 w-full max-w-md rounded-lg shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-center pb-8">
          <button 
            onClick={scrollToVehicleSelector}
            className="text-white opacity-80 hover:opacity-100 animate-bounce-light transition-opacity duration-300"
          >
            <span className="sr-only">Scroll down</span>
            <ArrowDown className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
