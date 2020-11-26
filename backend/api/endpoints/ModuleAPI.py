from fastapi import APIRouter
from .library.utils import *
from .library.module import *
from .library.component import *

router = APIRouter()


@router.get("/module/new")
async def new_module(module_code: str, module_name: str):
    if (not valid_module_code(module_code) or not module_name):
        return {"msg": "Invalid module code and/or module name"}

    new_module = Module(module_code=module_code, module_name=module_name)

    if new_module.find():
        return {"msg": "Module with this module code already exists"}

    new_module.save()
    return {"msg": "OK"}


@router.get("/module/assessment/new")
async def new_assesment_for_module(module_code: str):
    if (not valid_module_code(module_code)):
        return {"msg": "Invalid module_code"}

    new_assessment = ComponentFactory.new_assessment()
    target_module = Module(module_code=module_code)

    if not target_module.find():
        return {"msg": "Invalid module_code"}

    target_module.add_assessment(new_assessment)
    target_module.save()
    return {"msg": "OK"}


@router.get("/module/assessment/add")
async def add_assessment_to_module(module_code: str, assessment_id: str):
    if (not valid_module_code(module_code) or not valid_assessment_id(assessment_id)):
        return {"msg": "Invalid module_code and/or assessment_id"}

    if (not assessment_id.upper()[0] == "A"):
        return {"msg": "Invalid assessment_id"}

    target_module = Module(module_code=module_code)
    target_assessment = ComponentFactory.create_component(assessment_id)

    if not target_module.find() or not target_assessment.find():
        return {"msg": "Invalid module_code and/or assessment_id"}

    if target_module.add_assessment(target_assessment):
        target_module.save()
        return {"msg": "OK"}

    return {"msg": "Assessment already exists under module"}


@router.get("/module")
async def get_module(module_code: str):
    if (not valid_module_code(module_code)):
        return {"msg": "Invalid module code"}

    target_module = Module(module_code=module_code)

    if not target_module.find():
        return {"msg": f"Module with module code {module_code} does not exists"}

    return {"msg": target_module}


@router.get("/module/assessments")
async def get_assessments_for_module(module_code: str):
    if (not valid_module_code(module_code)):
        return {"msg": "Invalid module code"}

    target_module = Module(module_code=module_code)

    if not target_module.find():
        return {"msg": f"Module with module code {module_code} does not exists"}

    return {"msg": target_module.assessments}
