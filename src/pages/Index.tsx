
import React, { useState } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import VehicleSelector from "@/components/VehicleSelector";
import DamageAssessment from "@/components/DamageAssessment";
import PartLocator from "@/components/PartLocator";
import DIYGuides from "@/components/DIYGuides";
import Chatbot from "@/components/Chatbot";
import AboutUs from "@/components/AboutUs";

const Index = () => {
  const [selectedVehicleType, setSelectedVehicleType] = useState<"car" | "truck" | "motorcycle" | null>(null);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const handleVehicleTypeSelect = (type: "car" | "truck" | "motorcycle") => {
    setSelectedVehicleType(type);
  };

  const handlePartSelect = (part: string) => {
    setSelectedPart(part);
    
    // Scroll to part locator when a part is selected
    const partLocator = document.getElementById("part-locator");
    if (partLocator) {
      partLocator.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Layout>
      <Hero />
      <VehicleSelector 
        onVehicleTypeSelect={handleVehicleTypeSelect} 
        id="vehicle-selector"
      />
      <DamageAssessment 
        vehicleType={selectedVehicleType} 
        onPartSelect={handlePartSelect}
      />
      <PartLocator id="part-locator" />
      <DIYGuides 
        selectedPart={selectedPart || undefined}
        vehicleType={selectedVehicleType || undefined}
      />
      <AboutUs />
      <Chatbot />
    </Layout>
  );
};

export default Index;
