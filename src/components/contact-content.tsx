"use client";

import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "emailjs-com";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import TextReveal from "./fancy/text-reveal";
import { ContactInfo } from "@/types/content";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().optional(),
});

export default function ContactContent({ contact }: { contact: ContactInfo }) {
  const contactInfo = [
    contact.email && {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    contact.phone && {
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, "")}`,
    },
    contact.location && {
      icon: MapPin,
      label: "Location",
      value: contact.location,
      href: "#",
    },
  ].filter(Boolean) as {
    icon: typeof Mail;
    label: string;
    value: string;
    href: string;
  }[];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // EmailJS configuration
      const templateParams = {
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message || "",
      };

      const response = await emailjs.send(
        "portfolio", // EmailJS service ID
        "template_qtrgfft", // EmailJS template ID
        templateParams,
        "ar7m2B4_1vn5GTQUN", // EmailJS user ID
      );
      console.log("EmailJS response:", response);
      if (response.status === 200) {
        toast.success("Message sent successfully! 🎉");
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to send message. Please try again! ❌");
    }
  }
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full py-12 sm:py-16"
      id="contact"
    >
      <div className="px-4 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <TextReveal
            as="p"
            className="text-sm font-medium text-muted-foreground uppercase tracking-wider"
          >
            Get In Touch
          </TextReveal>
          <Separator className="mt-2 w-12 mb-8" />
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <TextReveal as="h2" className="text-3xl font-bold">
                {contact.heading}
              </TextReveal>
              <TextReveal as="p" className="text-muted-foreground text-lg">
                {contact.subheading}
              </TextReveal>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200 group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <TextReveal as="p" className="font-medium">
                        {item.label}
                      </TextReveal>
                      <TextReveal as="p" className="text-muted-foreground">
                        {item.value}
                      </TextReveal>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Card>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="What's this about?"
                              {...field}
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
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message..."
                              rows={6}
                              className="min-h-24"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full group"
                      disabled={form.formState.isSubmitting}
                    >
                      <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      {form.formState.isSubmitting
                        ? "Sending..."
                        : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
