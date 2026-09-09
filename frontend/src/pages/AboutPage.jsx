function AboutPage() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-24">
      <h2 className="text-2xl md:text-3xl font-display mb-6 tracking-tight">
        ABOUT
      </h2>
      <p className="max-w-xs sm:max-w-lg md:max-w-xl text-sm md:text-base text-icarus-fg/70 leading-relaxed mb-8">
        This is an experimental learning project inspired by the myth of
        Icarus.
        with React, Tailwind CSS, FastAPI, and a Hugging Face-powered
        chatbot, as a space to practice modern frontend and backend
        development. Just so that I dont lose my touch.
      </p>
      <p className="text-xs md:text-sm text-icarus-accent tracking-widest">
        FAHEEM FAYAZ
      </p>
    </section>
  );
}

export default AboutPage;