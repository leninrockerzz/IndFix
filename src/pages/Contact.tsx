
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Phone, Mail, MapPin, Clock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Form schema validation with Zod
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // Function to simulate database submission
  const submitToDatabase = async (data: ContactFormValues): Promise<boolean> => {
    // Simulate API call delay
    return new Promise((resolve) => {
      console.log("Submitting to database:", data);
      // Simulate a network request
      setTimeout(() => {
        // In a real application, this would be an API call to your backend
        resolve(true);
      }, 1500);
    });
  };

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Send data to database
      const success = await submitToDatabase(data);
      
      if (success) {
        toast({
          title: "Message Sent",
          description: "Thank you for contacting INDFIX. We'll get back to you soon!",
        });
        form.reset();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container-custom py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-auto-blue mb-4">Contact <span className="text-auto-red">INDFIX</span></h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to help with all your vehicle repair and parts needs. Reach out to our team for personalized assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-auto-blue">Send Us a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-auto-red"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="johndoe@example.com" 
                            {...field} 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-auto-red"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+91 XXXXX XXXXX" 
                          {...field} 
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-auto-red"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="How can we help you?" 
                          {...field} 
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-auto-red"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please describe your query in detail..." 
                          {...field} 
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-auto-red"
                          rows={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-auto-red hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col space-y-8">
            <Card className="overflow-hidden border-none shadow-lg">
              <div className="bg-auto-blue py-4 px-6">
                <h3 className="text-xl font-bold text-white">Chennai Office</h3>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-auto-red rounded-full p-3 text-white">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">
                      123 Anna Nagar Main Road<br />
                      Anna Nagar West<br />
                      Chennai, Tamil Nadu 600040<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-auto-red rounded-full p-3 text-white">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+91 99447 25531</p>
                    <p className="text-gray-600">Toll Free: 1800-123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-auto-red rounded-full p-3 text-white">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">support@indfix.in</p>
                    <p className="text-gray-600">info@indfix.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-auto-red rounded-full p-3 text-white">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Business Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gray-100 rounded-xl p-6 shadow-inner">
              <h3 className="text-xl font-bold mb-4 text-auto-blue">Need Immediate Help?</h3>
              <p className="text-gray-700 mb-4">
                Our support team is available during business hours to assist you with any urgent issues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-auto-blue hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2"
                  onClick={() => {
                    window.location.href = "tel:+919944725531";
                  }}
                >
                  <Phone className="h-4 w-4" />
                  Call Support
                </Button>
                <Button 
                  variant="outline"
                  className="border-auto-blue text-auto-blue hover:bg-auto-blue hover:text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2"
                  onClick={() => {
                    window.location.href = "mailto:support@indfix.in";
                  }}
                >
                  <Mail className="h-4 w-4" />
                  Email Us
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-auto-blue text-center">Find Us on the Map</h2>
          <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62210.78920392159!2d80.18493304863284!3d13.083754800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266ea218fc7e1%3A0x35e80068938c615b!2sAnna%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1686063745512!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="INDFIX Chennai Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
