from fastapi import APIRouter
from .library.component import *
from .library.module import *
from .library.utils import *
from .library.feedback import *

router = APIRouter()


@router.put("/feedback/update")
async def update_feedback(feedback_id: str, new_feedback: Feedback):
    old_feedback = FeedbackFactory.create_feedback(feedback_id)

    if (not old_feedback.find()):
        return {"msg": "Invalid feedback id"}

    old_feedback.comments = new_feedback.comments
    old_feedback.save()

    return {"msg": "OK"}


@router.delete("/feedback/delete")
async def delete_feedback_from_component(feedback_id: str):
    feedback = FeedbackFactory.create_feedback(feedback_id)

    if (not feedback.find()):
        return {"msg": "Invalid feedback id"}

    feedback.delete()
    return {"msg": "OK"}


@router.post("/feedback/add")
async def add_feedback_to_component(component_id: str, feedback: Feedback):
    component = ComponentFactory.create_component(component_id)

    if (not component.find()):
        return {"msg": "Invalid component id"}

    Feedback.new(component_id)
    Feedback.save()
    return {"msg": "OK"}


@router.get("/feedback/get")
async def get_feedback_for_component(component_id: str):
    component = ComponentFactory.create_component(component_id)

    if (not component.find()):
        return {"msg": "Invalid component id"}
