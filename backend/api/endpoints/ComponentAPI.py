from backend.api.endpoints.library.utils import valid_assessment_id
from fastapi import APIRouter
import boto3
import uuid
import time
from .library.component import *

router = APIRouter()


@router.post("/assessment/new")
async def new_assessment(data: Assessment):
    assessment = ComponentFactory.new_component(True)
    if (not assessment.update(data)):
        return {"msg": "Invalid assessment id"}

    assessment.save()
    return {"msg": "OK"}


@router.put("/assessment/update")
async def update_assessment(data: Assessment):
    if (not valid_assessment_id(data.id)):
        return {"msg": "Invalid assessment id"}

    assessment = ComponentFactory.create_component(data.id)

    if (not assessment.find()):
        return {"msg": "Invalid assessment id"}

    if (not assessment.update(data)):
        return {"msg": "Invalid assessment id"}

    return {"msg": "OK"}


@router.delete("/assessment/delete")
async def delete_assessment(assessment_id: str):
    if (not valid_assessment_id(assessment_id)):
        return {"msg": "Invalid assessment id"}

    assessment = ComponentFactory.create_component(assessment_id)
    assessment.delete()
