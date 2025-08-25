import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-white">
            Resource Catalog UI
          </h1>
          <nav>{/* Hier Kommt die Navigation */}  </nav>
        </div>
      </header>

      <main className="container mx-auto p-4 mt-4">
        <p className="text-gray-700 text-lg">Willkommen im Resource Catalog UI! Hier finden Sie eine Übersicht über alle verfügbaren Ressourcen.</p>


      </main>

    </div>
  )
}

export default App
