import React, { useState, useEffect } from "react";
import ResourceCard from "./ResourceCard.jsx";

const ResourceList = () => {

    const [resources, setResources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResources = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:5002/resources');

                if (!response.ok) {
                    throw new Error(`HTTP-Fehler! Status: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                setResources(data);
            } catch(err) {
                console.error("Fehler beim Abrufen der Ressourcen: ", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResources();
    }, []);

    if (isLoading) {
        return <p className="text-center text-gray-600 py-16 text-lg">Ressourcen werden geladen...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600 py-16 text-lg"> Fehler beim Laden der Ressourcen: {error}</p>;
    }

    if (resources.length === 0) {
        return <p className="text-center text-gray-600 py-16 text-lg">Keine Ressourcen gefunden.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
            ))}
        </div>
    );
};

export default ResourceList;