"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub, faLinkedin, faUpwork } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/app/components/ui/use_toast";  // shadcn/ui's toast
import emailjs from "emailjs-com";
import { motion, useAnimation } from "framer-motion";
import { useForm } from "react-hook-form";
function Contact() {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        project: ''
    });
    const {
        register, handleSubmit, formState: { errors, isSubmitting }, reset
    } = useForm()

    const controls = useAnimation();
    const contactRef = useRef(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async (data, e) => {
        e.preventDefault();

        try {
            const response = await emailjs.sendForm(
                "portfolio",       // EmailJS service ID
                "template_qtrgfft",      // EmailJS template ID
                e.target,                // The form element
                "ar7m2B4_1vn5GTQUN"           // EmailJS user ID
            );
            if (response.status === 200) {
                showToast({
                    title: "Success 🎉",
                    description: "Message sent successfully!",
                });
                reset();
            } else {
                showToast({
                    title: "Error ❌",
                    description: "Failed to send message. Please try again!",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            showToast({
                title: "Something went wrong 😕",
                description: "Try again later.",
                variant: "destructive",
            });
        }
    };

    // Animation trigger when element is 40% from the bottom
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
                }
            },
            { threshold: 0.4 }
        );
        if (contactRef.current) {
            observer.observe(contactRef.current);
        }
        return () => observer.disconnect();
    }, [controls]);

    return (
        <div className="h-auto mx-4 py-8" id="contact" ref={contactRef}>
            <h1 className="text-2xl text-center mb-8">CONTACT</h1>
            <div className="flex flex-col lg:flex-row justify-between items-center lg:space-x-8">
                {/* Left Section: Social Links and Hire Me */}
                <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
                    <h2 className="text-xl font-bold">Got a new project?</h2>
                    <h5 className="text-gray-500 py-4">Let's talk!</h5>
                    <div className="flex justify-center lg:justify-start space-x-4 my-8">
                        <a href="https://www.facebook.com/bibek.timilsina.568" target="_blank" className="text-blue-800">
                            <FontAwesomeIcon icon={faFacebook} size="xl" />
                        </a>
                        <a href="https://www.linkedin.com/in/bibek-timilsina-6a5477253/" target="_blank" className="text-blue-600">
                            <FontAwesomeIcon icon={faLinkedin} size="xl" />
                        </a>
                        <a href="https://github.com/bibektimilsina0" target="_blank" className="text-gray-300">
                            <FontAwesomeIcon icon={faGithub} size="xl" />
                        </a>
                    </div>
                    <h2 className="text-xl font-bold mt-12">Any new contracts on the horizon that I can assist with?</h2>
                    <div className="p-4">
                        <span className="px-2">Hire me</span>
                        <a href="https://www.upwork.com/freelancers/~01bc53426d63dc0f1b" target="_blank">
                            <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
                            <FontAwesomeIcon icon={faUpwork} size="2xl" className="text-green-600" />
                        </a>
                    </div>
                </div>

                {/* Right Section: Contact Form */}
                <motion.div
                    className="w-full lg:w-1/2"
                    animate={controls}
                    initial={{ opacity: 0, y: 50 }}
                >
                    <h2 className="text-xl font-bold mb-4">Estimate your project?</h2>
                    <h5 className="text-gray-500 mb-6">Let me know here!</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-amber-400">What's your email?</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="abc@gmail.com"
                                className="mt-1 p-2 border rounded-lg w-full text-gray-800"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-amber-400">What's your Name?</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Bibek Timilsina"
                                className="mt-1 p-2 border rounded-lg w-full text-gray-800"
                                {...register("name",{
                                    required: "Name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Name must be at least 2 characters",
                                    },
                                }
                                )}
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="project" className="block text-sm font-medium text-amber-400">Tell me about your Project.</label>
                            <textarea
                                id="project"
                                name="project"
                                placeholder="I have a project ........."
                                className="mt-1 p-2 border rounded-lg w-full h-24 text-gray-800"
                                {...register("project", {
                                    required: "Project description is required",
                                    minLength: {
                                        value: 10,
                                        message: "Project description must be at least 10 characters",
                                    },
                                })}
                            />
                            {errors.project && <p className="text-red-500 text-xs">{errors.project.message}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-lg font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700 active:bg-blue-800"
                        >
                            <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

export default Contact;
