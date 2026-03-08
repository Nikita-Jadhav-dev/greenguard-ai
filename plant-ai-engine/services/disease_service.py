import tensorflow as tf
import numpy as np

from utils.image_processes import preprocess_image
from utils.class_names import class_names
from rag.rag_pipeline import retrieve_knowledge
from services.severity_service import calculate_severity

model = tf.keras.models.load_model("model/plant_disease_model.h5")

def analyze_plant(image_path):

 img = preprocess_image(image_path)

 prediction = model.predict(img)

 index = np.argmax(prediction)

 confidence = float(np.max(prediction))

 disease = class_names[index]

 knowledge = retrieve_knowledge(disease)

 severity = calculate_severity(confidence)

 return {
   "disease":disease,
   "confidence":confidence,
   "severity":severity,
   "report":knowledge
 }