import React, { useState, useEffect } from "react";
import { Search, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface PartSupplier {
  id: string;
  name: string;
  distance: string;
  price: number;
  rating: number;
  availability: string;
  address: string;
  phone: string;
  image: string;
}

const PartLocator = () => {
  const [pinCode, setPinCode] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [suppliers, setSuppliers] = useState<PartSupplier[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=5e83f1b533c846d29851f3b84f9d439a&countrycode=in`
            );
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
              const postcode = data.results[0].components.postcode;
              if (postcode) {
                setPinCode(postcode);
                toast({
                  title: "Location detected",
                  description: `Found your PIN code: ${postcode}`,
                });
              } else {
                toast({
                  title: "Location found",
                  description: "PIN code not detected. Please enter manually.",
                  variant: "destructive"
                });
              }
            }
          } catch (error) {
            console.error("Error fetching location:", error);
            toast({
              title: "Location error",
              description: "Could not determine your location. Please enter PIN code manually.",
              variant: "destructive"
            });
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLoading(false);
          toast({
            title: "Location access denied",
            description: "Please enter your PIN code manually.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation. Please enter PIN code manually.",
        variant: "destructive"
      });
    }
  };

  const fetchSuppliers = async (pin: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let foundSuppliers = indianSuppliers[pin] || [];
      
      if (foundSuppliers.length === 0 && pin.length >= 3) {
        const regionPrefix = pin.substring(0, 3);
        
        Object.keys(indianSuppliers).forEach(storedPin => {
          if (storedPin.startsWith(regionPrefix) && storedPin !== "default") {
            foundSuppliers = [...foundSuppliers, ...indianSuppliers[storedPin]];
          }
        });
      }
      
      if (foundSuppliers.length === 0) {
        foundSuppliers = indianSuppliers["default"];
      }
      
      setSuppliers(foundSuppliers);
      setSearchClicked(true);
      
      toast({
        title: "Suppliers found",
        description: `Found ${foundSuppliers.length} suppliers near PIN code ${pin}`,
      });
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      toast({
        title: "Error",
        description: "Failed to fetch suppliers. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!pinCode || pinCode.length !== 6 || !/^\d+$/.test(pinCode)) {
      toast({
        title: "Invalid PIN code",
        description: "Please enter a valid 6-digit Indian PIN code",
        variant: "destructive"
      });
      return;
    }
    
    fetchSuppliers(pinCode);
  };

  const handleSupplierSelect = (supplier: PartSupplier) => {
    toast({
      title: "Supplier selected",
      description: `You've selected ${supplier.name} for your part`,
    });

    const diyGuides = document.getElementById("diy-guides");
    if (diyGuides) {
      diyGuides.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sortedByPrice = [...suppliers].sort((a, b) => a.price - b.price);
  const sortedByDistance = [...suppliers].sort((a, b) => {
    if (a.distance === "Online") return 1;
    if (b.distance === "Online") return -1;
    
    return parseFloat(a.distance.split(" ")[0]) - parseFloat(b.distance.split(" ")[0]);
  });
  const sortedByAvailability = [...suppliers].filter(s => s.availability === "In Stock");

  return (
    <section id="part-locator" className="section-padding bg-auto-gray">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-auto-blue mb-4">Find the Best Parts Near You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We'll help you locate the nearest and most cost-effective parts for your vehicle repair in India.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-1">
                Enter your PIN code to find parts nearby
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="pinCode"
                  type="text"
                  placeholder="Enter 6-digit PIN code"
                  className="pl-10 input-field"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  maxLength={6}
                />
              </div>
            </div>
            <div className="flex items-end space-x-2">
              <Button 
                onClick={getUserLocation}
                variant="outline" 
                className="w-full md:w-auto flex items-center"
                disabled={loading}
              >
                <MapPin className="mr-2 h-4 w-4" />
                {loading ? "Detecting..." : "Detect Location"}
              </Button>
              <Button 
                onClick={handleSearch}
                className="btn-primary w-full md:w-auto flex items-center"
                disabled={loading}
              >
                <Search className="mr-2 h-4 w-4" />
                {loading ? "Searching..." : "Find Parts"}
              </Button>
            </div>
          </div>
        </div>

        {searchClicked && suppliers.length > 0 && (
          <div className="animate-fade-in">
            <Tabs defaultValue="price" className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList>
                  <TabsTrigger value="price" className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    Lowest Price
                  </TabsTrigger>
                  <TabsTrigger value="distance" className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Closest
                  </TabsTrigger>
                  <TabsTrigger value="availability" className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Available Now
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="price" className="animate-fade-in">
                <div className="space-y-4">
                  {sortedByPrice.map((supplier) => (
                    <SupplierCard 
                      key={supplier.id} 
                      supplier={supplier} 
                      onSelect={() => handleSupplierSelect(supplier)} 
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="distance" className="animate-fade-in">
                <div className="space-y-4">
                  {sortedByDistance.map((supplier) => (
                    <SupplierCard 
                      key={supplier.id} 
                      supplier={supplier} 
                      onSelect={() => handleSupplierSelect(supplier)} 
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="availability" className="animate-fade-in">
                <div className="space-y-4">
                  {sortedByAvailability.length > 0 ? 
                    sortedByAvailability.map((supplier) => (
                      <SupplierCard 
                        key={supplier.id} 
                        supplier={supplier} 
                        onSelect={() => handleSupplierSelect(supplier)} 
                      />
                    )) : 
                    <div className="text-center py-6 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No suppliers with in-stock parts found in this area.</p>
                    </div>
                  }
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-auto-blue text-center">
                <span className="font-semibold">Pro Tip:</span> Compare prices and availability across different suppliers to find the best deal for auto parts in your area.
              </p>
            </div>
          </div>
        )}

        {searchClicked && suppliers.length === 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mt-6 text-center">
            <p className="text-lg text-gray-700">No suppliers found for PIN code {pinCode}.</p>
            <p className="text-sm text-gray-500 mt-2">Try another PIN code or contact our customer service for assistance.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const indianSuppliers: Record<string, PartSupplier[]> = {
  "110001": [
    {
      id: "1",
      name: "Bharat Auto Parts",
      distance: "1.5 km",
      price: 3499,
      rating: 4.5,
      availability: "In Stock",
      address: "2134 Chandni Chowk, New Delhi, 110001",
      phone: "(011) 2345-6789",
      image: "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
    },
    {
      id: "2",
      name: "Sharma Automotive",
      distance: "2.7 km",
      price: 3299,
      rating: 4.2,
      availability: "In Stock",
      address: "42 Connaught Place, New Delhi, 110001",
      phone: "(011) 4567-8901",
      image: "https://images.unsplash.com/photo-1635424710928-0544e8512eae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
    }
  ],
  "400001": [
    {
      id: "3",
      name: "Mumbai Motors",
      distance: "1.2 km",
      price: 3199,
      rating: 4.7,
      availability: "In Stock",
      address: "123 Fort Area, Mumbai, 400001",
      phone: "(022) 2234-5678",
      image: "https://images.unsplash.com/photo-1565043589184-75fbb2ee4c30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
    },
    {
      id: "4",
      name: "Patel Auto Parts",
      distance: "3.5 km",
      price: 2899,
      rating: 4.3,
      availability: "In Stock",
      address: "456 Marine Drive, Mumbai, 400001",
      phone: "(022) 6789-0123",
      image: "https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
    }
  ],
  "560001": [
    {
      id: "5",
      name: "Bengaluru Auto Zone",
      distance: "2.1 km",
      price: 3599,
      rating: 4.6,
      availability: "In Stock",
      address: "789 MG Road, Bengaluru, 560001",
      phone: "(080) 3456-7890",
      image: "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
    },
    {
      id: "6",
      name: "Tech Auto Spares",
      distance: "4.3 km",
      price: 3099,
      rating: 4.4,
      availability: "Ships in 2 days",
      address: "101 Indiranagar, Bengaluru, 560001",
      phone: "(080) 7890-1234",
      image: "https://images.unsplash.com/photo-1635424710928-0544e8512eae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
    }
  ],
  "600001": [
    {
      id: "7",
      name: "Chennai Parts Depot",
      distance: "1.7 km",
      price: 2999,
      rating: 4.3,
      availability: "In Stock",
      address: "234 Anna Salai, Chennai, 600001",
      phone: "(044) 4567-8901",
      image: "https://images.unsplash.com/photo-1565043589184-75fbb2ee4c30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
    },
    {
      id: "8",
      name: "Madras Motors",
      distance: "3.2 km",
      price: 2799,
      rating: 4.1,
      availability: "Ships in 2 days",
      address: "567 Mount Road, Chennai, 600001",
      phone: "(044) 8901-2345",
      image: "https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
    }
  ],
  "700001": [
    {
      id: "9",
      name: "Kolkata Car Parts",
      distance: "2.4 km",
      price: 2899,
      rating: 4.2,
      availability: "In Stock",
      address: "890 Park Street, Kolkata, 700001",
      phone: "(033) 5678-9012",
      image: "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
    },
    {
      id: "10",
      name: "Bengal Auto Solution",
      distance: "5.1 km",
      price: 2599,
      rating: 4.0,
      availability: "In Stock",
      address: "321 New Market, Kolkata, 700001",
      phone: "(033) 9012-3456",
      image: "https://images.unsplash.com/photo-1635424710928-0544e8512eae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
    }
  ],
  "500001": [
    {
      id: "13",
      name: "Hyderabad Auto Zone",
      distance: "1.9 km",
      price: 3099,
      rating: 4.3,
      availability: "In Stock",
      address: "25 Nampally, Hyderabad, 500001",
      phone: "(040) 2345-6789",
      image: "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
    }
  ],
  "226001": [
    {
      id: "14",
      name: "Lucknow Auto Parts",
      distance: "2.1 km",
      price: 2899,
      rating: 4.2,
      availability: "In Stock",
      address: "56 Hazratganj, Lucknow, 226001",
      phone: "(0522) 3456-7890",
      image: "https://images.unsplash.com/photo-1635424710928-0544e8512eae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
    }
  ],
  "380001": [
    {
      id: "15",
      name: "Gujarat Auto Center",
      distance: "1.5 km",
      price: 2999,
      rating: 4.4,
      availability: "In Stock",
      address: "78 Lal Darwaja, Ahmedabad, 380001",
      phone: "(079) 4567-8901",
      image: "https://images.unsplash.com/photo-1565043589184-75fbb2ee4c30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
    }
  ],
  "default": [
    {
      id: "11",
      name: "All India Auto Parts",
      distance: "Online",
      price: 3299,
      rating: 4.4,
      availability: "Ships in 3 days",
      address: "Online Store - PAN India Delivery",
      phone: "1800-123-4567",
      image: "https://images.unsplash.com/photo-1565043589184-75fbb2ee4c30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
    },
    {
      id: "12",
      name: "Bharat Parts Express",
      distance: "Online",
      price: 3099,
      rating: 4.1,
      availability: "Ships in 4 days",
      address: "Online Store - PAN India Delivery",
      phone: "1800-987-6543",
      image: "https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
    }
  ]
};

interface SupplierCardProps {
  supplier: PartSupplier;
  onSelect: () => void;
}

const SupplierCard = ({ supplier, onSelect }: SupplierCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-4 flex flex-col md:flex-row gap-4">
        <img 
          src={supplier.image} 
          alt={supplier.name} 
          className="w-16 h-16 object-cover rounded-full mx-auto md:mx-0"
        />
        
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <h3 className="text-lg font-semibold text-auto-blue">{supplier.name}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1 md:mt-0">
              <MapPin className="h-4 w-4 mr-1 text-auto-red" />
              <span>{supplier.distance}</span>
            </div>
          </div>
          
          <div className="mt-2 flex flex-col md:flex-row md:items-center gap-y-2 md:gap-x-4">
            <div className="flex items-center">
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                {supplier.availability}
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-sm text-gray-600">{supplier.rating}/5</span>
            </div>
            
            <div className="text-gray-600 text-sm">
              <span className="font-medium">₹{supplier.price.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-2 text-sm text-gray-500">
            <p>{supplier.address}</p>
            <p className="mt-1">{supplier.phone}</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 justify-center">
          <Button onClick={onSelect} className="btn-primary whitespace-nowrap">
            Select Part
          </Button>
          <Button variant="outline" className="whitespace-nowrap">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PartLocator;
