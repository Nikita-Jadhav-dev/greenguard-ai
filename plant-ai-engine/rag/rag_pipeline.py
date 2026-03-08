from rag.web_retriever import fetch_internet_data
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

embedding = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

def retrieve_knowledge(disease):

    db = FAISS.load_local("vector_db", embedding)

    docs = db.similarity_search(disease, k=2)

    local_knowledge = ""

    for d in docs:
        local_knowledge += d.page_content

    # fetch internet information
    web_data = fetch_internet_data(disease)

    combined_data = local_knowledge + web_data

    return combined_data