import { config } from "../config";

function Hero({ onAskIcarus }) {
  return (
    <section
      id="hero"
      className="h-screen flex flex-col justify-center items-center text-center px-4 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${config.heroBackground})` }}
    >
      <div className="absolute inset-0 bg-icarus-bg/70" />

      <div className="relative z-10">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-display tracking-tight mb-4 md:mb-6 animate-fade-in-up opacity-0">
          ICARUS
        </h1>
        <p
          className="text-sm md:text-base text-icarus-fg/70 max-w-xs md:max-w-md mb-8 md:mb-10 mx-auto animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.2s" }}
        >
          Ambition. Flight. The reach toward the sun — and what comes after.
        </p>
        <button
          onClick={onAskIcarus}
          className="border border-icarus-accent text-icarus-accent px-5 md:px-6 py-2.5 md:py-3 tracking-widest text-xs md:text-sm transition-all duration-300 hover:bg-icarus-accent hover:text-icarus-bg hover:-translate-y-0.5 animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.4s" }}
        >
          ASK ICARUS
        </button>
      </div>
    </section>
  );
}

export default Hero;