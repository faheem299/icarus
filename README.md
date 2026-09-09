# Icarus

A minimalist, cinematic personal website inspired by the myth of Icarus — ambition, flight, reaching the sun, and the fall — built as a learning project to practice modern full-stack development.

## Concept

The site explores the Icarus myth through atmosphere rather than literal decoration: near-black backgrounds, warm gold accents, large editorial typography, and a floating "Ask Icarus" chatbot that speaks in the myth's voice, grounded by a small retrieval-augmented lore base.

## Tech Stack

- **Frontend**: React + Vite, Tailwind CSS, React Router
- **Backend**: FastAPI (Python)
- **LLM**: Hugging Face Inference (router API)
- **Vector search**: Qdrant Cloud + sentence-transformers embeddings (RAG for chatbot grounding)
- **Deployment**: Vercel/Cloudflare Pages (frontend), Render (backend)

## Project Structure