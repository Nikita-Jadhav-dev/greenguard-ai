import json
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings

embedding = HuggingFaceEmbeddings(
 model_name="sentence-transformers/all-MiniLM-L6-v2"
)

with open("dataset/plant_knowledge.json") as f:
 data = json.load(f)

docs = []

for d in data:

 text = f"""
 Disease: {d['disease']}
 Symptoms: {d['symptoms']}
 Treatment: {d['treatment']}
 Prevention: {d['prevention']}
 """

 docs.append(text)

db = FAISS.from_texts(docs, embedding)

db.save_local("vector_db")