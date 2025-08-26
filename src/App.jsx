import './App.css'
import ResourceCard from './components/ResourceCard.jsx'

function App() {

  const dummyResource = {
    id: '1',
    title: 'Einführung in React Hooks',
    type: 'Online-Kurs',
    description: 'Ein umfassender Leitfaden zu useState, useEffect und useContext, der die Grundlagen und fortgeschrittenen Konzepte abdeckt.',
    authorId: 'dev_guide_team',
    createdAt: '2022-05-10T08:00:00Z',
  };

  return (
      <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <header className="bg-main-dark py-6 shadow-xl">
        <div className="container mx-auto px-6 max-w-screen-xl flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Ressourcen-Katalog</h1>
          <nav>
            {/* Hier kommt später das Menü. */}
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800"> Test Resource</h2>
        <div className="max-w-xl">
          <ResourceCard resource={dummyResource} />
        </div>
      </main>
    </div>
  )
}

export default App
