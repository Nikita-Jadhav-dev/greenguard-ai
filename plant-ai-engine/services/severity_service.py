def calculate_severity(confidence):

 if confidence > 0.9:
     return "High"

 if confidence > 0.7:
     return "Moderate"

 return "Low"