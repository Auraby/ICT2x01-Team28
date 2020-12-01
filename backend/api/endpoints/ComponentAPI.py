from fastapi import APIRouter
from .library.component import *
from .library.module import *
from .library.utils import *

router = APIRouter()


@router.post("/component/subcomponent/add", description="Adds a subcomponent to an assessment", summary="Adds a subcomponent to an assessment")
async def add_subcomponent_to_assessment(assessment_id: str, subcomponent: Subcomponent):
    target_assessment = ComponentFactory.create_component(assessment_id)

    if (not target_assessment.find()):
        return {"msg": "Invalid assessment id or module code"}

    if (not target_assessment.add_subcomponent(subcomponent)):
        return {"msg": "Something went wrong here"}

    target_assessment.save()
    subcomponent.save()

    return {"MSG": "OK"}


@router.delete("/component/delete")
async def delete_component(component_id: str):
    component = ComponentFactory.create_component(component_id)

    if (not component.find()):
        return {"msg": "Component does not exist"}

    if (isinstance(component, Assessment)):
        module = Module(module_code=component.module_code)
        module.remove_assessment(component)
        module.save()

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


@router.patch("/component/update")
async def update_component(data: Component):
    old_component = ComponentFactory.create_component(data.component_id)

    if (not old_component.find()):
        return {"msg": "Invalid component"}

    old_component.name = data.name
    old_component.max_marks = data.max_marks
    old_component.weightage = data.weightage
    old_component.save()

    return {"msg": "OK"}
