import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContentProvider, useContent } from './context/ContentContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Works from './components/Works';
import Footer from './components/Footer';
import AdminDashboard from './pages/Admin/Dashboard';

const Home = () => {
  const { loading, error } = useContent();

  if (loading) return <div className="h-screen bg-black text-white flex items-center justify-center">Loading site content...</div>;

  if (error) {
    return (
      <div className="h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-500">Error Loading Content</h1>
        <p className="mb-4 text-zinc-400 max-w-lg">{typeof error === 'object' ? JSON.stringify(error) : error}</p>
        <p className="text-sm text-zinc-600 mb-8">
          Make sure the backend is running.<br />
          Run: <code>npm run server</code> or <code>npm run start:dev</code>
        </p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-white text-black rounded hover:bg-gray-200 uppercase font-bold tracking-wider">Retry Connection</button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />

        {/* Parallax Section Placeholder */}
        <section className="relative h-[80vh] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-[url('https://newroad.com.tr/storage/website_parallax_image_new-20250221161908.webp')] bg-cover bg-center bg-fixed opacity-60" />
          </div>
          <div className="relative z-10 text-center">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
              A New Road to<br />Creative Vision
            </h2>
          </div>
        </section>

        <Works />
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <ContentProvider>
      <Router>
        <div className="min-h-screen bg-bg-darker text-white font-sans selection:bg-primary selection:text-black">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </ContentProvider>
  );
}

export default App;
