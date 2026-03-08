from fastapi import APIRouter,UploadFile,File
import shutil

from services.disease_service import analyze_plant

router = APIRouter()

@router.post("/analyze")

async def analyze(file:UploadFile = File(...)):

 path=f"temp/{file.filename}"

 with open(path,"wb") as buffer:
     shutil.copyfileobj(file.file,buffer)

 result = analyze_plant(path)

 return result