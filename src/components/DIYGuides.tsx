import React, { useState, useEffect } from "react";
import { Play, FileText, Video, Image, Settings, ChevronDown, ChevronUp, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

interface Guide {
  id: string;
  title: string;
  type: "video" | "article";
  thumbnail: string;
  description: string;
  duration: string;
  difficulty: "Easy" | "Intermediate" | "Advanced";
  partTypes: string[];
  vehicleTypes: string[];
  steps: {
    title: string;
    description: string;
    image?: string;
  }[];
}

interface DIYGuidesProps {
  selectedPart?: string;
  vehicleType?: string;
}

const DIYGuides = ({ selectedPart, vehicleType }: DIYGuidesProps) => {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>([]);
  const { toast } = useToast();

  const allGuides: Guide[] = [
    {
      id: "1",
      title: "How to Replace Your Front Bumper",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      description: "Step-by-step guide to safely remove your damaged bumper and install a new one.",
      duration: "12 min",
      difficulty: "Intermediate",
      partTypes: ["bumper", "front bumper", "exterior"],
      vehicleTypes: ["car", "truck"],
      steps: [
        {
          title: "Gather necessary tools",
          description: "You'll need a socket set, screwdrivers, trim removal tools, and jack stands.",
          image: "https://images.unsplash.com/photo-1580745224598-20811415cb70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          title: "Secure the vehicle",
          description: "Park on a level surface, engage the parking brake, and use wheel chocks for safety.",
          image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          title: "Remove damaged bumper",
          description: "Carefully disconnect any electrical connections, remove fasteners, and gently pull the bumper away from the vehicle.",
          image: "https://images.unsplash.com/photo-1537358133566-cf3f11d3e1cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          title: "Install new bumper",
          description: "Align the new bumper with mounting points, reconnect electrical components, and secure with fasteners.",
          image: "https://images.unsplash.com/photo-1593115057322-e94b77572f20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: "2",
      title: "Replacing Headlight Assembly",
      type: "article",
      thumbnail: "https://images.unsplash.com/photo-1596638787647-904d822d751e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      description: "Learn how to safely replace your vehicle's headlight assembly without professional help.",
      duration: "8 min",
      difficulty: "Easy",
      partTypes: ["headlight", "lights", "exterior"],
      vehicleTypes: ["car", "truck", "motorcycle"],
      steps: [
        {
          title: "Prepare necessary tools",
          description: "Gather a screwdriver set, protective gloves, and the new headlight assembly.",
          image: "https://images.unsplash.com/photo-1580745224598-20811415cb70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          title: "Access the headlight",
          description: "Open the hood and locate the headlight assembly mounting points.",
          image: "https://images.unsplash.com/photo-1584351583369-6baf055b51dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          title: "Remove the old assembly",
          description: "Disconnect the electrical connector and remove mounting screws or clips securing the headlight.",
          image: "https://images.unsplash.com/photo-1597809259188-a50e335241a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          title: "Install new headlight",
          description: "Place the new headlight in position, secure with mounting hardware, and reconnect electrical connectors.",
          image: "https://images.unsplash.com/photo-1636608361740-f96b31c6a333?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: "3",
      title: "DIY Brake Pad Replacement",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1621066656524-d06634619861?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      description: "Complete guide to replacing your vehicle's brake pads at home.",
      duration: "25 min",
      difficulty: "Advanced",
      partTypes: ["brakes", "brake pads", "mechanical"],
      vehicleTypes: ["car", "truck"],
      steps: [
        {
          title: "Gather tools and materials",
          description: "You'll need jack stands, wheel chocks, lug wrench, C-clamp, brake grease, and new brake pads.",
          image: "https://images.unsplash.com/photo-1580745224598-20811415cb70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          title: "Lift and secure the vehicle",
          description: "Loosen lug nuts, jack up the vehicle, and secure with jack stands for safety.",
          image: "https://images.unsplash.com/photo-1631538051103-94427e8b75a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          title: "Remove wheels and access brakes",
          description: "Take off the wheels to expose the brake calipers and pads.",
          image: "https://images.unsplash.com/photo-1621066656530-1638693b601b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          title: "Replace brake pads",
          description: "Remove the caliper, take out old pads, compress the caliper piston, and install new pads with proper lubrication.",
          image: "https://images.unsplash.com/photo-1621066656554-a77fccc16290?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: "4",
      title: "Motorcycle Chain Maintenance",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      description: "Learn how to properly clean, lubricate and adjust your motorcycle chain for optimal performance.",
      duration: "15 min",
      difficulty: "Intermediate",
      partTypes: ["chain", "drive", "mechanical"],
      vehicleTypes: ["motorcycle"],
      steps: [
        {
          title: "Prepare your motorcycle",
          description: "Place your motorcycle on a stand to elevate the rear wheel and allow free rotation of the chain.",
          image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          title: "Clean the chain",
          description: "Use a chain cleaner or kerosene with a brush to remove dirt, debris and old lubricant from the chain.",
          image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          title: "Check chain tension",
          description: "Measure chain slack at the middle point of the lower run. Adjust according to your motorcycle's specifications.",
          image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          title: "Apply lubricant",
          description: "Apply chain lubricant specifically designed for motorcycle chains while slowly rotating the wheel.",
          image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: "5",
      title: "Replacing Motorcycle Fairings",
      type: "article",
      thumbnail: "https://images.unsplash.com/photo-1549027032-1977c17cc1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      description: "Complete guide to safely removing and replacing damaged motorcycle fairings.",
      duration: "20 min",
      difficulty: "Intermediate",
      partTypes: ["fairings", "body panels", "exterior"],
      vehicleTypes: ["motorcycle"],
      steps: [
        {
          title: "Gather necessary tools",
          description: "You'll need screwdrivers, socket set, and plastic trim removal tools.",
          image: "https://images.unsplash.com/photo-1580745224598-20811415cb70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          title: "Remove damaged fairings",
          description: "Locate and remove all fasteners, being careful to note their positions for reassembly.",
          image: "https://images.unsplash.com/photo-1549027032-1977c17cc1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          title: "Transfer mounting hardware",
          description: "Transfer any brackets, grommets or clips from the old fairings to the new ones.",
          image: "https://images.unsplash.com/photo-1549027032-1977c17cc1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          title: "Install new fairings",
          description: "Carefully align and secure the new fairings, working in the reverse order of removal.",
          image: "https://images.unsplash.com/photo-1549027032-1977c17cc1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        }
      ]
    }
  ];

  useEffect(() => {
    let filtered = [...allGuides];
    
    if (selectedPart) {
      filtered = filtered.filter(guide => 
        guide.partTypes.some(part => 
          part.toLowerCase().includes(selectedPart.toLowerCase()) || 
          selectedPart.toLowerCase().includes(part.toLowerCase())
        )
      );
    }
    
    if (vehicleType) {
      filtered = filtered.filter(guide => 
        guide.vehicleTypes.includes(vehicleType)
      );
    }
    
    setFilteredGuides(filtered);
    setSelectedGuide(null);
  }, [selectedPart, vehicleType]);

  const handleGuideSelect = (guide: Guide) => {
    setSelectedGuide(guide);
    toast({
      title: "Guide selected",
      description: `You've selected the guide: ${guide.title}`,
    });
  };

  const handleChatbotHelp = () => {
    toast({
      title: "AI Assistant",
      description: "Opening chatbot for personalized assistance",
    });
    
    const chatbot = document.getElementById("chatbot");
    if (chatbot) {
      chatbot.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="diy-guides" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-auto-blue mb-4">DIY Repair Guides</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {selectedPart 
              ? `Follow our detailed instructions to repair or replace your ${selectedPart}.` 
              : "Follow our detailed instructions to successfully replace your vehicle part."}
          </p>
        </div>

        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {filteredGuides.map((guide) => (
              <div key={guide.id} className="animate-fade-in">
                <div 
                  className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
                    selectedGuide?.id === guide.id ? 'ring-2 ring-auto-red' : ''
                  }`}
                  onClick={() => handleGuideSelect(guide)}
                >
                  <div className="relative">
                    <img 
                      src={guide.thumbnail} 
                      alt={guide.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <div className="flex items-center mb-1">
                          {guide.type === 'video' ? (
                            <Video className="h-4 w-4 mr-1" />
                          ) : (
                            <FileText className="h-4 w-4 mr-1" />
                          )}
                          <span className="text-sm">{guide.type === 'video' ? 'Video' : 'Article'} • {guide.duration}</span>
                        </div>
                        <h3 className="font-semibold text-white">{guide.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        guide.difficulty === 'Easy' 
                          ? 'bg-green-100 text-green-800' 
                          : guide.difficulty === 'Intermediate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {guide.difficulty}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGuideSelect(guide);
                        }}
                        className="text-auto-blue hover:text-auto-red transition-colors"
                      >
                        <span className="text-sm underline">View Guide</span>
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {guide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-8 text-center rounded-lg mb-10">
            <p className="text-lg text-gray-700 mb-4">No specific guides found for {selectedPart || "this part"} on {vehicleType || "your vehicle type"}.</p>
            <p className="text-gray-600">Please select a different part or contact our support for assistance.</p>
          </div>
        )}

        {selectedGuide && (
          <div className="bg-gray-50 rounded-lg p-6 shadow-md animate-scale-in mt-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-auto-blue mb-2">{selectedGuide.title}</h3>
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                    {selectedGuide.type === 'video' ? (
                      <Video className="h-4 w-4 mr-1" />
                    ) : (
                      <FileText className="h-4 w-4 mr-1" />
                    )}
                    <span>{selectedGuide.type === 'video' ? 'Video Guide' : 'Article'}</span>
                  </div>
                  <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{selectedGuide.duration}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm flex items-center ${
                    selectedGuide.difficulty === 'Easy' 
                      ? 'bg-green-100 text-green-800' 
                      : selectedGuide.difficulty === 'Intermediate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    <Settings className="h-4 w-4 mr-1" />
                    <span>{selectedGuide.difficulty} Difficulty</span>
                  </div>
                </div>
                <p className="text-gray-600">{selectedGuide.description}</p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                {selectedGuide.type === 'video' ? (
                  <button className="relative w-full h-40 md:h-auto md:w-48 bg-auto-blue rounded-lg overflow-hidden group">
                    <img 
                      src={selectedGuide.thumbnail} 
                      alt={selectedGuide.title} 
                      className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white bg-opacity-90 rounded-full p-3 group-hover:bg-auto-red group-hover:text-white transition-colors">
                        <Play className="h-6 w-6" />
                      </div>
                    </div>
                  </button>
                ) : (
                  <div className="w-full h-40 md:h-auto md:w-48 bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <img 
                      src={selectedGuide.thumbnail} 
                      alt={selectedGuide.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-auto-blue mb-4">Step-by-Step Instructions</h4>
              <Accordion type="single" collapsible className="w-full">
                {selectedGuide.steps.map((step, index) => (
                  <AccordionItem key={index} value={`step-${index}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center">
                        <div className="bg-auto-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                          {index + 1}
                        </div>
                        <h5 className="font-medium text-left">{step.title}</h5>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col md:flex-row gap-4 pt-2">
                        <div className="md:w-1/3">
                          {step.image && (
                            <img 
                              src={step.image} 
                              alt={step.title} 
                              className="w-full h-40 object-cover rounded-md"
                            />
                          )}
                        </div>
                        <div className="md:w-2/3">
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-auto-blue" />
                </div>
                <div>
                  <h5 className="font-medium text-auto-blue">Pro Tips</h5>
                  <ul className="mt-2 space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-auto-blue rounded-full mt-1.5 mr-2"></span>
                      <span>Take photos before disassembly to reference during reassembly.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-auto-blue rounded-full mt-1.5 mr-2"></span>
                      <span>Organize screws and small parts in labeled containers.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-auto-blue rounded-full mt-1.5 mr-2"></span>
                      <span>Wear appropriate safety gear including gloves and eye protection.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleChatbotHelp} className="btn-primary">
                Get Personalized Help from AI Assistant
              </Button>
            </div>
          </div>
        )}

        {!selectedGuide && filteredGuides.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
            <p className="text-auto-blue text-center">
              <span className="font-semibold">Pro Tip:</span> Select a guide above to view detailed step-by-step instructions for your repair.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DIYGuides;
