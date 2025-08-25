import React from "react";

const ResourceCard = ({ resource }) => {
    if (!resource) {
        return null;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{resource.title}</h2>
            <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
        </div>
    );
};

export default ResourceCard;