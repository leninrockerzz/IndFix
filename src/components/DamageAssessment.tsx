
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PartCategory {
  id: string;
  name: string;
  parts: Part[];
}

interface Part {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface DamageAssessmentProps {
  vehicleType?: "car" | "truck" | "motorcycle" | null;
}

const DamageAssessment = ({ vehicleType }: DamageAssessmentProps = {}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const { toast } = useToast();

  // Reset selected category and part when vehicle type changes
  useEffect(() => {
    setSelectedCategory(null);
    setSelectedPart(null);
  }, [vehicleType]);

  const carAndTruckCategories: PartCategory[] = [
    {
      id: "exterior",
      name: "Exterior",
      parts: [
        {
          id: "bumper",
          name: "Bumper",
          description: "Front or rear protective shield for the vehicle's body",
          image: "public/bumper.jpg"
        },
        {
          id: "headlight",
          name: "Headlight",
          description: "Illumination system for night driving and visibility",
          image: "public/headlight.jpg"
        },
        {
          id: "hood",
          name: "Hood",
          description: "Hinged cover over the engine compartment",
          image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: "door",
          name: "Door",
          description: "Side entry point for the vehicle",
          image: "public/car door.jpg"
        }
      ]
    },
    {
      id: "engine",
      name: "Engine & Mechanical",
      parts: [
        {
          id: "engine",
          name: "Engine",
          description: "The main power unit that drives the vehicle",
          image: "public/carengine.jpg"
        },
        {
          id: "transmission",
          name: "Transmission",
          description: "System that transfers engine power to the wheels",
          image: "public/Automatic_transmission_cut.jpg"
        },
        {
          id: "radiator",
          name: "Radiator",
          description: "Cooling system component for the engine",
          image: "public/radiator car.jpg"
        },
        {
          id: "alternator",
          name: "Alternator",
          description: "Generates electricity to power vehicle electronics",
          image: "public/alternator-update3-1.jpg"
        }
      ]
    },
    {
      id: "suspension",
      name: "Suspension & Brakes",
      parts: [
        {
          id: "shocks",
          name: "Shock Absorbers",
          description: "Dampens oscillations and provides stability",
          image: "public/Shock-absorbers.jpg"
        },
        {
          id: "brakes",
          name: "Brake System",
          description: "Slows and stops the vehicle when engaged",
          image: "public/brake car.png"
        },
        {
          id: "struts",
          name: "Struts",
          description: "Structural component that supports and stabilizes the vehicle",
          image: "public/struct.jpg"
        },
        {
          id: "tire",
          name: "Tires & Wheels",
          description: "Provide traction and support the vehicle's weight",
          image: "public/carwheel.jpg"
        }
      ]
    },
    {
      id: "electrical",
      name: "Electrical",
      parts: [
        {
          id: "battery",
          name: "Battery",
          description: "Stores electrical energy to start the engine",
          image: "public/carbattery.jpg"
        },
        {
          id: "starter",
          name: "Starter Motor",
          description: "Initiates engine operation",
          image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: "wiring",
          name: "Wiring Harness",
          description: "Network of wires that connect electrical components",
          image: "public/wiringcar.jpg"
        },
        {
          id: "sensors",
          name: "Sensors",
          description: "Electronic components that monitor vehicle systems",
          image: "public/carsensors.jpg"
        }
      ]
    }
  ];

  const motorcycleCategories: PartCategory[] = [
    {
      id: "motorcycle-body",
      name: "Body & Fairings",
      parts: [
        {
          id: "fairing",
          name: "Fairings",
          description: "Aerodynamic shell covering parts of the motorcycle",
          image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: "fuel-tank",
          name: "Fuel Tank",
          description: "Container that holds the motorcycle's fuel",
          image: "public/bike fuel.jpg"
        },
        {
          id: "seat",
          name: "Seat",
          description: "Rider and passenger seating area",
          image: "public/seat bike.jpg"
        },
        {
          id: "windshield",
          name: "Windshield",
          description: "Protective screen that blocks wind and debris",
          image: "https://images.unsplash.com/photo-1619771914272-e3c1ba17ba4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
        }
      ]
    },
    {
      id: "motorcycle-engine",
      name: "Engine & Drivetrain",
      parts: [
        {
          id: "m-engine",
          name: "Engine",
          description: "The main power unit of the motorcycle",
          image: "public/carengine.jpg"
        },
        {
          id: "chain",
          name: "Chain & Sprockets",
          description: "Transfers power from the engine to the rear wheel",
          image: "public/chain.jpg"
        },
        {
          id: "clutch",
          name: "Clutch",
          description: "Engages and disengages engine power to the transmission",
          image: "public/clutch.jpg"
        },
        {
          id: "exhaust",
          name: "Exhaust System",
          description: "Carries exhaust gases away from the engine",
          image: "public/exhaust.jpg"
        }
      ]
    },
    {
      id: "motorcycle-suspension",
      name: "Suspension & Brakes",
      parts: [
        {
          id: "front-fork",
          name: "Front Fork",
          description: "Front suspension system that absorbs road shocks",
          image: "public/shock-absorbers.jpg"
        },
        {
          id: "rear-shock",
          name: "Rear Shock Absorber",
          description: "Rear suspension system for a smoother ride",
          image: "public/struct.jpg"
        },
        {
          id: "m-brakes",
          name: "Brake System",
          description: "Slows and stops the motorcycle when engaged",
          image: "public/brakesbike.jpg"
        },
        {
          id: "m-tire",
          name: "Tires & Wheels",
          description: "Provide traction and support the motorcycle's weight",
          image: "public/carwheel.jpg"
        }
      ]
    },
    {
      id: "motorcycle-electrical",
      name: "Electrical & Controls",
      parts: [
        {
          id: "m-battery",
          name: "Battery",
          description: "Provides electrical power to the motorcycle",
          image: "public/carbattery.jpg"
        },
        {
          id: "handlebars",
          name: "Handlebars & Controls",
          description: "Steering and control interface for the rider",
          image: "https://images.unsplash.com/photo-1619771914272-e3c1ba17ba4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: "m-lights",
          name: "Lighting System",
          description: "Headlights, tail lights, and signals for visibility",
          image: "public/bikelights.jpg"
        },
        {
          id: "m-wiring",
          name: "Wiring & Electronics",
          description: "Electrical components that control motorcycle functions",
          image: "https://images.unsplash.com/photo-1611389504481-f22506ef89cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
        }
      ]
    }
  ];

  // Choose the appropriate parts categories based on vehicle type
  const partCategories = vehicleType === "motorcycle" 
    ? motorcycleCategories 
    : carAndTruckCategories;

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedPart(null);
  };

  const handlePartSelect = (partId: string) => {
    setSelectedPart(partId);
  };

  const handleContinue = () => {
    if (!selectedPart) {
      toast({
        title: "Missing information",
        description: "Please select a damaged part",
        variant: "destructive"
      });
      return;
    }

    const category = partCategories.find(cat => cat.id === selectedCategory);
    const part = category?.parts.find(p => p.id === selectedPart);

    toast({
      title: "Part selected",
      description: `You've selected the ${part?.name} for replacement`,
    });

    // Scroll to part locator
    const partLocator = document.getElementById("part-locator");
    if (partLocator) {
      partLocator.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="damage-assessment" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-auto-blue mb-4">Identify the Damaged Part</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the part of your {vehicleType || "vehicle"} that needs to be replaced. This will help us find the right replacement options for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {partCategories.map((category) => (
            <button
              key={category.id}
              className={`py-4 px-6 rounded-lg transition-all duration-300 text-left ${
                selectedCategory === category.id 
                  ? 'bg-auto-blue text-white shadow-md' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <p className="text-sm mt-1 opacity-80">
                {category.parts.length} parts
              </p>
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div className="animate-fade-in">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-xl font-semibold mb-4 text-auto-blue">
                Select the specific part
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {partCategories
                  .find(cat => cat.id === selectedCategory)
                  ?.parts.map((part) => (
                    <div 
                      key={part.id}
                      className={`bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer transition-all duration-200 ${
                        selectedPart === part.id 
                          ? 'ring-2 ring-auto-red scale-105' 
                          : 'hover:shadow-md hover:-translate-y-1'
                      }`}
                      onClick={() => handlePartSelect(part.id)}
                    >
                      <img 
                        src={part.image} 
                        alt={part.name} 
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900">{part.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{part.description}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleContinue}
                className="btn-primary"
                disabled={!selectedPart}
              >
                Continue to Find Parts
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DamageAssessment;
