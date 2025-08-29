import React, { useState } from "react";

// FeedbackForm-Komponente: Ermöglicht das Absenden von Feedback zu einer Ressource
const FeedbackForm = ( {resourceId} ) => {
    // State für das Textfeld
    const [feedbackText, setFeedbackText] = useState('');
    // State für Ladeanzeige während des Sendens
    const [isSubmitting, setIsSubmitting] = useState(false);
    // State für Fehlerausgabe
    const [errorPost, setErrorPost] = useState(null);

    // Wird beim Absenden des Formulars aufgerufen
    const handleSubmit = async (event) => {
        event.preventDefault(); // Verhindert Seitenreload
        setIsSubmitting(true); // Button/Textfeld deaktivieren
        setErrorPost(null);    // Vorherige Fehler zurücksetzen

        // Feedback-Objekt für das Backend
        const newFeedback = {
            resourceId: resourceId,           // ID der Ressource
            feedbackText: feedbackText,       // Inhalt des Feedbacks
            userId: 'anonymous',              // User (hier fest "anonymous")
            timestamp: new Date().toISOString() // Zeitpunkt
        };

        try {
            // Sende POST-Request an das Backend
            const response = await fetch(`http://localhost:5002/resources/${resourceId}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newFeedback)
            });

            // Fehlerbehandlung bei nicht erfolgreicher Antwort
            if (!response.ok) {
                throw new Error(`HTTP-Fehler! Status: ${response.status} - ${response.statusText}`);
            } 

            // Antwort auslesen (könnte für UI-Update genutzt werden)
            const createdFeedback = await response.json();
            console.log('Feedback erfolgreich gesendet', createdFeedback)

        } catch (err) {
            // Fehler im State speichern, damit sie angezeigt werden
            console.error("Fehler beim Abrufen der Ressourcen: ", err);
            setErrorPost(err.message);
        } finally {
            // Ladeanzeige zurücksetzen und Textfeld leeren
            setIsSubmitting(false);
            setFeedbackText('');
        }
    };

    // JSX für das Formular
    return ( 
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Textfeld für das Feedback */}
            <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-light focus:border-transparent resize-y text-gray-700 placeholder-gray-500"
                rows="4"
                placeholder="Teilen Sie Ihr Feedback zu dieser Ressource mit..."
                value={feedbackText}
                onChange={(event) => setFeedbackText(event.target.value)}
                disabled={isSubmitting}
            >
            </textarea>
            {/* Fehleranzeige */}
            {errorPost && (
              <div className="text-red-600 text-sm">{errorPost}</div>
            )}
            {/* Absende-Button */}
            <button 
                type="submit"
                disabled={isSubmitting || feedbackText.trim() === ''}
                className="bg-main-dark text-white py-2 px-6 rounded-lg hover:bg-main-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
                {isSubmitting ? 'Wird gesendet...' : 'Feedback senden'}
            </button>
        </form>
    );
};

export default FeedbackForm;