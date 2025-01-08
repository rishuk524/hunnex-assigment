import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch contacts data
  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from local storage

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:5000/api/admin/get-all-contacts", {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });

      // Check if data is in the expected format
      if (Array.isArray(response.data.data)) {
        setContacts(response.data.data); // Set the contacts in state
      } else {
        setError("Contacts data is not in the expected format.");
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError(err.response ? err.response.data.message : "Failed to fetch contacts");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(); // Fetch contacts when the component mounts
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Details</h2>
        
        {/* Loading state */}
        {loading && <div className="text-center text-gray-600">Loading...</div>}

        {/* Error state */}
        {error && <div className="text-center text-red-600">{error}</div>}

        {/* Display contact data */}
        {!loading && !error && (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <tr key={contact._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.qualification}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{contact.message}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center px-6 py-4 text-sm text-gray-500">
                      No contacts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
