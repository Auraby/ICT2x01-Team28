from typing import Optional
from fastapi import FastAPI
import componentManagement
import json

app = FastAPI()

"""
I want all the control class methods here, mapped to a REST API endpoint.
"""

# Example for get component
@app.get("/get/assessment/{assessment_id}")
def read_item(assessment_id: int):
    assessment = componentManagement.getAssessment(assessment_id)
    return json.dumps(assessment.__dict__)
