import os
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from sentence_transformers import SentenceTransformer
from fastembed import TextEmbedding

# ...


load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COLLECTION_NAME = "icarus_lore"

def load_passages(path="data/icarus_lore.txt"):
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    passages = [p.strip() for p in text.split("\n\n") if p.strip()]
    return passages

def main():
    print("Loading embedding model...")
    model = TextEmbedding(model_name="BAAI/bge-small-en-v1.5")
    

    print("Loading passages...")
    passages = load_passages()
    print(f"Found {len(passages)} passages.")

    print("Generating embeddings...")
    embeddings = list(model.embed(passages))

    print("Connecting to Qdrant...")
    client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

    print(f"Creating collection '{COLLECTION_NAME}'...")
    client.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=embeddings.shape[1], distance=Distance.COSINE),
    )

    print("Uploading vectors...")
    points = [
        PointStruct(id=i, vector=embeddings[i].tolist(), payload={"text": passages[i]})
        for i in range(len(passages))
    ]
    client.upsert(collection_name=COLLECTION_NAME, points=points)

    print(f"Done. Uploaded {len(points)} passages to Qdrant.")

if __name__ == "__main__":
    main()
