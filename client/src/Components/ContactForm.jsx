import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // New state to track submission status
  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone Number must be 10 digits.";
    }
    if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required.";

    return newErrors;
  };

  // Handle change for form fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  // Handle form submission and send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Set submission status to true
    setSubmitted(true);

    try {
      // Send form data to the backend using axios
      const response = await axios.post("http://localhost:5000/api/contact/create", formData);

      // Handle success (Redirect after successful submission)
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/admin/login", { state: { formData } });
        }, ); // Redirect after 2 seconds
      }
    } catch (error) {
      // Handle error if any
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        {!submitted ? (
          <>
            <h1 className="text-3xl font-bold text-green-600 text-center mb-4">Let's Connect</h1>
            <p className="text-center text-gray-900 mb-4">
              Let's align our constellations! Reach out and let the magic of collaboration illuminate our skies.
            </p>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block text-green-600 font-bold mb-1">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border border-gray-300 rounded p-2"
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-green-600 font-bold mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded p-2"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-green-600 font-bold mb-1">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 rounded p-2"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="qualification" className="block text-green-600 font-bold mb-1">
                  Qualification *
                </label>
                <select
                  id="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="">Select Qualification</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="Ph.D.">Ph.D.</option>
                </select>
                {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-green-600 font-bold mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows="4"
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600 w-full"
              >
              Get Free Career Evaluation →
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">Thanks for your response!</h2>
            <p className="text-gray-600">We will contact you soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
