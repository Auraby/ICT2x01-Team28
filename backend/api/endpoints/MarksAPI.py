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

    return marks.to_dict()
