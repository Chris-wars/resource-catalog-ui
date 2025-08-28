import React, { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage.jsx";

const FeedbackForm = ({ resourceId, onFeedbackSubmitted }) => {
    const [feedbackText, setFeedbackText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorPost, setErrorPost] = useState(null);
    const [submitTrigger, setSubmitTrigger] = useState(0);

    const newFeedback = {
        resourceId: resourceId,
        feedbackText: feedbackText,
        userId: "web-user",
        timestamp: new Date().toISOString()
    };
        
 

  useEffect(() => {
    if (submitTrigger === 0) return;
    let isActive = true;
    const submitFeedback = async () => {
      setIsSubmitting(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:5002/resources/${resourceId}/feedback`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newFeedback }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP-Fehler! Status: ${response.status} - ${response.statusText}`);
        }
        const updatedResource = await response.json();
        if (isActive) {
          onFeedbackSubmitted(updatedResource);
          setFeedbackText("");
        }
      } catch (errorPost) {
        if (isActive) setErrorPost(err.message);
      } finally {
        if (isActive) setIsSubmitting(false);
      }
    };
    submitFeedback();
    return () => { isActive = false; };

  }, [submitTrigger]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!feedbackText.trim()) {
      setError("Feedback darf nicht leer sein.");
      return;
    }
    setPendingFeedbackText(feedbackText);
    setSubmitTrigger(t => t + 1);
  };

  return (
    <div className="border-t border-gray-200 pt-8 mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Dein Feedback</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-light focus:border-transparent transition"
          rows="4"
          placeholder="Was denkst du über diese Ressource?"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          disabled={isSubmitting}
        />
        {error && (
          <div className="mt-2">
            <ErrorMessage message={error} />
          </div>
        )}
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-main-dark text-white font-semibold rounded-lg hover:bg-accent-light transition-colors disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sende..." : "Feedback absenden"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;