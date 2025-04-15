
import React, { useState } from "react";
import { Car, Truck, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const vehicles = {
  car: {
    makes: ["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes-Benz", "Audi", "Nissan"],
    models: {
      Toyota: ["Corolla", "Camry", "RAV4", "Highlander"],
      Honda: ["Accord", "Civic", "CR-V", "Pilot"],
      Ford: ["F-150", "Escape", "Explorer", "Mustang"],
      Chevrolet: ["Silverado", "Tahoe", "Equinox", "Malibu"],
      BMW: ["3 Series", "5 Series", "X3", "X5"],
      "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE"],
      Audi: ["A4", "A6", "Q5", "Q7"],
      Nissan: ["Altima", "Rogue", "Pathfinder", "Sentra"]
    },
    years: ["2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010"]
  },
  truck: {
    makes: ["Ford", "Chevrolet", "RAM", "Toyota", "GMC", "Nissan"],
    models: {
      Ford: ["F-150", "F-250", "F-350", "Ranger"],
      Chevrolet: ["Silverado 1500", "Silverado 2500", "Colorado"],
      RAM: ["1500", "2500", "3500"],
      Toyota: ["Tacoma", "Tundra"],
      GMC: ["Sierra 1500", "Sierra 2500", "Canyon"],
      Nissan: ["Titan", "Frontier"]
    },
    years: ["2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010"]
  },
  motorcycle: {
    makes: ["Honda", "Yamaha", "Harley-Davidson", "Kawasaki", "Suzuki", "Ducati"],
    models: {
      Honda: ["CBR600RR", "Gold Wing", "Rebel", "Africa Twin"],
      Yamaha: ["MT-09", "YZF-R6", "Bolt", "MT-07"],
      "Harley-Davidson": ["Sportster", "Street Glide", "Road Glide", "Fat Boy"],
      Kawasaki: ["Ninja 650", "Z900", "Vulcan", "Versys"],
      Suzuki: ["GSX-R750", "Boulevard", "V-Strom", "Hayabusa"],
      Ducati: ["Panigale", "Monster", "Multistrada", "Scrambler"]
    },
    years: ["2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010"]
  }
};

type VehicleType = "car" | "truck" | "motorcycle";

interface VehicleSelectorProps {
  onVehicleTypeSelect?: (type: VehicleType) => void;
}

const VehicleSelector = ({ onVehicleTypeSelect }: VehicleSelectorProps) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType | null>(null);
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const { toast } = useToast();

  const handleVehicleTypeSelect = (type: VehicleType) => {
    setSelectedVehicleType(type);
    setSelectedMake("");
    setSelectedModel("");
    setSelectedYear("");
    
    // Call the parent callback if provided
    if (onVehicleTypeSelect) {
      onVehicleTypeSelect(type);
    }
  };

  const handleSubmit = () => {
    if (!selectedVehicleType || !selectedMake || !selectedModel || !selectedYear) {
      toast({
        title: "Missing information",
        description: "Please complete all vehicle details",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Vehicle selected",
      description: `You've selected a ${selectedYear} ${selectedMake} ${selectedModel}`,
    });

    const damageAssessment = document.getElementById("damage-assessment");
    if (damageAssessment) {
      damageAssessment.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMakeChange = (value: string) => {
    setSelectedMake(value);
    setSelectedModel("");
  };

  const vehicleCards = [
    {
      type: "car" as VehicleType,
      title: "Car",
      description: "Sedans, Hatchbacks, SUVs",
      icon: Car
    },
    {
      type: "truck" as VehicleType,
      title: "Truck",
      description: "Pickup Trucks, Commercial",
      icon: Truck
    },
    {
      type: "motorcycle" as VehicleType,
      title: "Motorcycle",
      description: "Sport Bikes, Cruisers, Touring",
      icon: Bike
    }
  ];

  // Type guard to check if a make exists in the vehicle type's models
  const getMakeModels = (type: VehicleType, make: string) => {
    if (!type || !make) return [];
    
    // First check if make exists in the models
    if (make in vehicles[type].models) {
      // TypeScript needs help to understand the structure
      const makeKey = make as keyof typeof vehicles[typeof type]['models'];
      return vehicles[type].models[makeKey] || [];
    }
    return [];
  };

  return (
    <section id="vehicle-selector" className="section-padding bg-auto-gray">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-auto-blue mb-4">Select Your Vehicle</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Let's identify your vehicle to find the perfect parts for your repair needs. Start by selecting your vehicle type below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {vehicleCards.map((vehicle) => (
            <div key={vehicle.type} className="animate-fade-in">
              <Card 
                className={`card-hover cursor-pointer ${selectedVehicleType === vehicle.type ? 'ring-2 ring-auto-red shadow-lg' : ''}`}
                onClick={() => handleVehicleTypeSelect(vehicle.type)}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl font-bold">{vehicle.title}</CardTitle>
                  <vehicle.icon className={`h-8 w-8 ${selectedVehicleType === vehicle.type ? 'text-auto-red' : 'text-auto-blue'}`} />
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-500 min-h-[40px]">
                    {vehicle.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {selectedVehicleType && (
          <div className="bg-white rounded-lg shadow-md p-6 animate-scale-in">
            <h3 className="text-xl font-semibold mb-4 text-auto-blue">Vehicle Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                <Select value={selectedMake} onValueChange={handleMakeChange}>
                  <SelectTrigger className="select-field">
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles[selectedVehicleType].makes.map((make) => (
                      <SelectItem key={make} value={make}>
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <Select 
                  value={selectedModel} 
                  onValueChange={setSelectedModel}
                  disabled={!selectedMake}
                >
                  <SelectTrigger className="select-field">
                    <SelectValue placeholder={selectedMake ? "Select model" : "Select make first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedMake && 
                      getMakeModels(selectedVehicleType, selectedMake).map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <Select 
                  value={selectedYear} 
                  onValueChange={setSelectedYear}
                  disabled={!selectedModel}
                >
                  <SelectTrigger className="select-field">
                    <SelectValue placeholder={selectedModel ? "Select year" : "Select model first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles[selectedVehicleType].years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleSubmit}
                className="btn-primary w-full md:w-auto"
                disabled={!selectedVehicleType || !selectedMake || !selectedModel || !selectedYear}
              >
                Continue to Damage Assessment
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VehicleSelector;
