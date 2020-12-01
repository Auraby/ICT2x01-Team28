from fastapi import APIRouter
from .library.user import *
from .library.utils import *
from .library.module import *

router = APIRouter()


@router.get("/user/login")
async def login(email: str, password: str):
    user = UserFactory.create_user(email)

    if (not user.find()):
        return {"msg": "Invalid email"}

    if (user.email != email):
        return {"msg": "Invalid email"}

    if (not password == user.password):
        return {"msg": "Invalid password"}

    user.password = ""

    return {"msg": "OK", "user": user.dict()}


@router.post("/user/register")
async def register(data: User):
    user = UserFactory.create_user(data.email)

    if (user.find()):
        return {"msg": "Email already in use"}

    user.name = data.name
    user.password = data.password
    user.modules = []
    user.save()

    return {"msg": "OK"}


@router.get("/user/modules/add")
async def add_module_to_user(email: str, module_code: str):
    user = UserFactory.create_user(email)
    module = Module(module_code=module_code)

    if (not user.find()):
        return {"msg": "Invalid email"}

    if (not module.find()):
        return {"msg": "Invalid module code"}

    user.add_module(module.module_code)
    user.save()

    return {"msg": "OK"}


@router.get("/user/modules/get")
async def get_modules_for_user(email: str):
    user = UserFactory.create_user(email)

    if (not user.find()):
        return {"msg": "Invalid email"}

    return user.to_tree()
