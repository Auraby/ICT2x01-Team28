from fastapi import APIRouter
from .library.component import *
from .library.module import *
from .library.utils import *
from .library.feedback import *
from .library.database import *

router = APIRouter()


@router.patch("/feedback/update")
async def update_feedback(new_feedback: Feedback):
    new_feedback.save()

    return {"msg": "OK"}


@router.delete("/feedback/delete")
async def delete_feedback_from_component(feedback_id: str):
    feedback = FeedbackFactory.create_feedback(feedback_id)

    if (not feedback.find()):
        return {"msg": "Invalid feedback id"}

    feedback.delete()
    return {"msg": "OK"}


@router.post("/feedback/add")
async def add_feedback_to_component(component_id: str, comments: str, isSummative: bool):
    component = ComponentFactory.create_component(component_id)

    if (not component.find()):
        return {"msg": "Invalid component id"}

    feedback = FeedbackFactory.create_feedback(
        component_id, comments, isSummative)

    feedback.save()
    return {"msg": "OK"}


@router.get("/feedback/get")
async def get_feedback_for_component(component_id: str):
    component = ComponentFactory.create_component(component_id)

    if (not component.find()):
        return {"msg": "Invalid component id"}

    result = {}

    for feedback in dynamodb_query({"component_id": component_id}, "ict2x01_feedbacks", "component_id-index"):
        if feedback["feedback_id"][0:3] == "SUM":
            result["summative"] = feedback

        else:
            if not "formative" in result:
                result["formative"] = []

            result["formative"].append(feedback)

    return result
