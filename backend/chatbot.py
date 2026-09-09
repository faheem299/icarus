import os
import httpx
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from fastembed import TextEmbedding

load_dotenv()

HF_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
HF_MODEL = "meta-llama/Llama-3.1-8B-Instruct"
HF_API_URL = "https://router.huggingface.co/v1/chat/completions"

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COLLECTION_NAME = "icarus_lore"

embedding_model = TextEmbedding(model_name="BAAI/bge-small-en-v1.5")
qdrant = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

SYSTEM_PROMPT = (
    "You are Icarus, a reflective voice speaking about ambition, flight, "
    "reaching too high, falling, and still looking upward. Keep answers "
    "short, thoughtful, and a little poetic, but clear. Use the provided "
    "context passages to ground your answer in the myth, but do not quote "
    "them verbatim — speak in your own voice."
)

def retrieve_context(query: str, top_k: int = 3) -> list[str]:
    query_vector = list(embedding_model.embed([query]))[0].tolist()
    results = qdrant.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        limit=top_k,
    )
    return [point.payload["text"] for point in results.points]

async def ask_icarus(user_message: str) -> str:
    context_passages = retrieve_context(user_message)
    context_block = "\n".join(f"- {p}" for p in context_passages)

    user_content = (
        f"Context passages from the myth:\n{context_block}\n\n"
        f"Question: {user_message}"
    )

    headers = {"Authorization": f"Bearer {HF_API_KEY}"}
    payload = {
        "model": HF_MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_content},
        ],
        "max_tokens": 200,
        "temperature": 0.7,
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(HF_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()

    return data["choices"][0]["message"]["content"].strip()
