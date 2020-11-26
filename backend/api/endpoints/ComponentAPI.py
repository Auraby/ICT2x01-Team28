from fastapi import APIRouter
from .library.component import *
from .library.utils import *

router = APIRouter()


@router.post("/component/assessment/new")
async def new_assessment(data: Assessment):
    assessment = ComponentFactory.new_assessment()
    if (not assessment.update(data)):
        return {"msg": "Something went wrong here"}

    assessment.save()
    return {"msg": "OK"}


@router.post("/component/subcomponent/new")
async def new_subcomponet(assessment_id: str, data: Subcomponent):
    subcomponent = ComponentFactory.new_subcomponent()
    target_assessment = ComponentFactory.create_component(assessment_id)

    if (not target_assessment.find()):
        return {"msg": "Invalid assessment id"}

    if (not subcomponent.update(data)):
        return {"msg": "Something went wrong here"}

    if (not target_assessment.add_subcomponent(subcomponent)):
        return {"msg": "Cannot add subcomponent to assessment"}

    target_assessment.save()
    subcomponent.save()
    return {"msg": "OK"}


@router.put("/component/update")
async def update_assessment(data: Component):
    if (not valid_assessment_id(data.id)):
        return {"msg": "Invalid assessment id"}

    assessment = ComponentFactory.create_component(data.id)

    if (not assessment.find()):
        return {"msg": "Invalid assessment id"}

    if (not assessment.update(data)):
        return {"msg": "Invalid assessment id"}

    return {"msg": "OK"}


@router.delete("/component/delete")
async def delete_component(component_id: str):
    if (not valid_component_id(component_id)):
        return {"msg": "Invalid component id"}

    component = ComponentFactory.create_component(component_id)
    component.delete()
    return {"msg": "OK"}


@router.get("/component/get")
async def get_component(component_id: str):
    if (not valid_component_id(component_id)):
        return {"msg": "Invalid component id"}

    component = ComponentFactory.create_component(component_id)
    if (not component.find()):
        return {"msg": "Invalid component id"}

    return {"msg": component}
