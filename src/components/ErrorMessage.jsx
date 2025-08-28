import React from "react";

const ErrorMessage = ({ title, message, hint, variant = "error", children  }) => {
    const isError = variant === "error";
const base = 
        isError
            ? "bg-red-50 border-l-4 border-red-400 text-red-800"
            : "bg-main-dark/10 border-l-4 border-accent-light text-main-dark";

    return (
        <div className={`${base} p-6 rounded-r-xl relative text-center`} role="alert">
            {title && <strong className="font-bold text-xl block mb-2">{title}</strong>}
            {message && <span className="block text-lg">{message}</span>}
            {hint && (
                  <p className={`block text-sm ${isError ? "mt-3 text-red-700" : ""}`}>{hint}</p>
            )}
            {children}
        </div>
    );
};



export default ErrorMessage;
