import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Chatbot from "./components/Chatbot";
import AboutPage from "./pages/AboutPage";

function Home({ onAskIcarus }) {
  return <Hero onAskIcarus={onAskIcarus} />;
}

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home onAskIcarus={() => setIsChatOpen(true)} />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </BrowserRouter>
  );
}

export default App;