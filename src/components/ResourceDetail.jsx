// React und benötigte Komponenten importieren
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner.jsx"; // Zeigt einen Ladeindikator
import BackButton from "./BackButton.jsx";         // Zurück-Button
import ErrorMessage from "./ErrorMessage.jsx";     // Fehleranzeige
import FeedbackForm from "./FeedbackForm.jsx";     // Formular für Nutzerfeedback
import FeedbackItem from "./FeedbackItem.jsx";
import { formatDate } from "../utils/formatDate.js"; // Hilfsfunktion für Datumsformatierung

// Komponente für die Detailansicht einer Ressource
const ResourceDetail = ({ resourceId, onBack }) => {
    // State für die Ressourcendaten
    const [detailResource, setDetailResource] = useState(null);
    // State für Ladeanzeige
    const [isLoadingDetail, setIsLoadingDetail] = useState(true);
    // State für Fehlerbehandlung
    const [errorDetail, setErrorDetail] = useState(null);
    // State, falls Ressource nicht gefunden wurde
    const [notFound, setNotFound] = useState(false);

    // Lädt die Ressourcendetails, wenn sich die resourceId ändert
    useEffect(() => {
        const fetchResourceDetails = async () => {
            // Simuliert eine kurze Wartezeit für bessere UX
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsLoadingDetail(true);
            setErrorDetail(null);
            setNotFound(false);

            try {
                // Holt die Ressourcendaten vom Backend
                const response = await fetch(`http://localhost:5002/resources/${resourceId}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        // Ressource nicht gefunden
                        setNotFound(true);
                        setDetailResource(null);
                        setIsLoadingDetail(false);
                        return;
                    }
                    // Sonstiger Fehler
                    setErrorDetail({code: response.status, message: response.statusText});
                    setDetailResource(null);
                    setIsLoadingDetail(false);
                    return;
                }

                // Antwort erfolgreich, Daten übernehmen
                const data = await response.json();
                setDetailResource(data);
            } catch (err) {
                // Netzwerk- oder Serverfehler
                console.error("Fehler beim Abrufen der Daten:", err);
                setErrorDetail(err.message);
            } finally {
                setIsLoadingDetail(false);
            }
        };
        if (resourceId) {
            fetchResourceDetails();
        }
    }, [resourceId]);

    // Destrukturiert die wichtigsten Felder aus den geladenen Daten
    const { 
        id, 
        title, 
        type, 
        description, 
        authorId, 
        createdAt, 
        averageRating, 
        feedback 
    } = detailResource || {};

    // Formatiert das Erstellungsdatum für die Anzeige
    const formattedDate = formatDate(createdAt, 'de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Anzahl der Feedback-Einträge
    const feedbackCount = feedback?.length || 0;

    // Callback, um nach Feedback-Abgabe die Daten zu aktualisieren
    const handleFeedbackSubmitted = (updatedResource) => {
        setDetailResource(updatedResource);
    };

    // Zeigt einen Ladeindikator, solange die Daten geladen werden
    if (isLoadingDetail) {
        return (
            <LoadingSpinner label="Ressourcendetails werden geladen..." />
        );
    }

    // Zeigt eine Fehlermeldung, falls ein Fehler aufgetreten ist
    if (errorDetail) {
        return (
            <ErrorMessage
                variant="error"
                title="Ooooops!..."
                message={`Fehler beim Laden der Ressourcendetails: ${errorDetail}`}
                hint="Bitte prüfen, ob das Backend unter http://localhost:5002 läuft, oder später erneut versuchen."
            >
                <BackButton onBack={onBack} label="Zurück zu allen Ressourcen"/>
            </ErrorMessage>
        );
    }

    // Zeigt eine Info, falls die Ressource nicht existiert
    if (notFound) {
        return (
            <ErrorMessage
                variant="info"
                title="Ressource nicht gefunden"
                message={`Die Ressource mit ID ${resourceId} konnte nicht gefunden werden.`}
            >
                <BackButton onBack={onBack} label="Zurück zu allen Ressourcen"/>
            </ErrorMessage>
        );
    }

    // Haupt-UI für die Detailansicht
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            {/* Zurück-Button zur Ressourcenliste */}
            <BackButton onBack={onBack} label="Zurück zu allen Ressourcen"/>

            {/* Titel der Ressource */}
            <h2 className="text-4xl font-extrabold text-main-dark mb-4">{title}</h2>

            {/* Typ der Ressource */}
            <div className="flex items-center space-x-4 mb-6">
                {type && (
                    <span className="text-sm font-medium text-highlight-light bg-highlight-light/10 px-3 py-1 rounded-full">
                        {type}
                    </span>
                )}
            </div>

            {/* Beschreibungstext */}
            {description && 
                <p className="text-gray-700 text-lg leading-relaxed mb-8">{description}</p>
            }

            {/* Metadaten zur Ressource */}
            <div className="border-t border-gray-200 pt-8 mt-8 text-gray-600 text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                {authorId && (
                    <p className="flex items-center">
                        <strong className="mr-2">Author-ID:</strong>
                        <span className="font-medium text-gray-700">{authorId}</span>
                    </p>
                )}
                {createdAt && (
                    <p className="flex items-center">
                        <strong className="mr-2">Erstellt am:</strong>
                        <span className="font-medium text-gray-700">{formattedDate}</span>
                    </p>
                )}
                {averageRating && (
                    <p className="flex items-center">
                        <strong className="mr-2">Durchschnittliche Bewertung:</strong>
                        <span className="font-medium text-gray-700">{averageRating.toFixed(1)} / 5</span>
                    </p>
                )}
                {feedbackCount !== undefined && (
                    <p className="flex items-center">
                        <strong className="mr-2">Feedback:</strong>
                        <span className="font-medium text-gray-700">{feedbackCount}</span>
                    </p>
                )}
            </div>
            
            {/* Feedback-Einträge anzeigen */}
            {feedback && feedback.length > 0 && (
                <div className="border-t border-gray-200 pt-8 mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Feedback</h3>
                    <div className="space-y-6">
                        {feedback.slice().reverse().map((item) => (
                            <FeedbackItem key={item.id} feedback={item}/>
                        ))}
                    </div>
                </div>
            )}

            {/* Feedback-Formular für neue Rückmeldungen */}
            <div className="border-t border-gray-200 pt-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Ihr Feedback teilen</h3>
                <FeedbackForm resourceId={id} onFeedbackSubmitted={handleFeedbackSubmitted}/>
            </div>
        </div>
    );
};

export default ResourceDetail;