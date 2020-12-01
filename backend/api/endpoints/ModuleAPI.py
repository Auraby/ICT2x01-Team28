from fastapi import APIRouter
from .library.utils import *
from .library.module import *
from .library.component import *

router = APIRouter()


@router.get("/module/get", description="Get module information", summary="Get module information")
async def get_module(module_code: str):
    if (not valid_module_code(module_code)):
        return {"msg": "Invalid module code"}

    target_module = Module(module_code=module_code)

    if (not target_module.find()):
        return {"msg": f"Module with module code {module_code} does not exists"}

    return target_module.to_tree()


@router.post("/module/add", description="Create a new module", summary="Create a new module")
async def new_module(data: Module):
    if (not data.module_name):
        return {"msg": "Invalid module name"}

    if (data.find()):
        return {"msg": f"Module with {data.module_code} already exists"}

    data.save()
    return {"msg": "OK"}


@router.get("/module/assessments/get")
async def get_assessments_for_module(module_code: str):
    if (not valid_module_code(module_code)):
        return {"msg": "Invalid module code"}

    target_module = Module(module_code=module_code)

    if not target_module.find():
        return {"msg": f"Module with module code {module_code} does not exists"}

    return {"msg": target_module.assessments}


@router.post("/module/assessment/add", description="Adds an assessment to a module", summary="Adds an assessment to a module")
async def add_assessment_to_module(module_code: str, assessment: Assessment):
    module = Module(module_code=module_code)
    if (not module.find()):
        return {"msg": "Module does not exist"}

    if (not module.add_assessment(assessment)):
        return {"msg": "Something went wrong here"}

    module.save()
    assessment.save()

    return {"msg": "OK"}


@router.delete("/module/assessment/delete", description="Removes an assessment from a module", summary="Removes an assessment from a module")
async def delete_assessment_from_module(module_code: str, assessment_id: str):
    module = Module(module_code=module_code)
    assessment = Assessment(assessment_id=assessment_id)

    if (not module.find()):
        return {"msg": "Invalid module code"}

    if (not assessment.find()):
        return {"msg": "Invalid assessment id"}

    if (not module.remove_assessment(assessment)):
        return {"msg": "Assessment not under this module"}

    module.save()
    assessment.delete()

    return {"OK"}


@router.get("/module/users/get")
async def get_users_for_module(module_code: str, role: str):

    users = dynamodb_scan({"role": role}, "ict2x01_users")
    module_users = []

    for user in users:
        if module_code.upper() in user["modules"]:
            module_users.append(user)

    return module_users
