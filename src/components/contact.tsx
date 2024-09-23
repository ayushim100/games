import React from "react";

const Contact: React.FC = () => {

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#081221] to-[#03080f]">
      <div className="bg-[#0e1a2b] p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h4 className="text-white font-montserrat font-medium text-left text-2xl mb-4">
          GET IN TOUCH
        </h4>
        <p className="text-[#c1d1e8] font-mulish text-left mb-2">
          We’d love to hear from you! If you have any questions, suggestions, or just want to reach out, fill in the form below and we’ll get back to you as soon as possible.
          Our team is available for any queries you may have. We aim to respond within 24 hours.
        </p>
        <p className="text-[#c1d1e8] font-mulish text-left mb-4">
          Contact us today and let’s start a conversation!
        </p>
        
        <p className="text-white font-semibold mb-2 text-left">
          Contact Form
        </p>

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[#c1d1e8] font-mulish text-left flex ">Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 bg-[#182c47] text-[#c1d1e8] rounded"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="text-[#c1d1e8] font-mulish text-left flex">Email</label>
              <input
                type="email"
                required
                className="mt-1 block w-full p-2 bg-[#182c47] text-[#c1d1e8] rounded"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-[#c1d1e8] font-mulish flex">Message</label>
            <textarea
              required
              className="mt-1 block w-full p-2 bg-[#182c47] text-[#c1d1e8] rounded"
              rows={4}
              placeholder="Your message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-4 w-full p-2 bg-[#5692e8] text-white font-montserrat font-semibold rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
