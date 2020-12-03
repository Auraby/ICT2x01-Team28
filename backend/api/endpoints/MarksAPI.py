from fastapi import APIRouter
from .library.component import *
from .library.feedback import *
from .library.module import *
from .library.utils import *
from .library.marks import *
from .library.user import *

router = APIRouter()


@router.get("/marks/get")
async def get_marks(component_id: str, user_id: str):
    component = ComponentFactory.create_component(component_id)
    user = UserFactory.create_user(user_id)

    if (not component.find()):
        return {"msg": "Invalid component id"}

    if (not user.find()):
        return {"msg": "Invalid user_id"}

    marks = Marks(user_id=user_id, component_id=component_id)

    if (not marks.find()):
        return {"msg": "No marks exists"}

    marks_dict = marks.to_dict()
    marks_dict["max_marks"] = component.max_marks

    return marks_dict


@router.post("/marks/set")
async def set_marks(data: Marks):
    component = ComponentFactory.create_component(data.component_id)
    user = UserFactory.create_user(data.user_id)

    if (not component.find()):
        return {"msg": "Invalid component id"}

    if (not user.find()):
        return {"msg": "Invalid user_id"}

    data.save()

    return {"msg": "OK"}
