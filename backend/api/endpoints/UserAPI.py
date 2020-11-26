from fastapi import APIRouter
from .library.user import *
from .library.utils import *

router = APIRouter()


@router.get("/user/login")
async def login(email: str, password: str):
    user = UserFactory.create_user(email)
    if (not user.find()):
        return {"msg": "Invalid email"}

    if (not password == user.password):
        return {"msg": "Invalid password"}

    return {"msg": "OK"}


@router.post("/user/register")
async def register(data: User):
    user = UserFactory.create_user(data.email)

    if (user.find()):
        return {"msg": "Email already in use"}

    user.name = data.name
    user.passowrd = data.password
    user.save()

    return {"msg": "OK"}


@router.get("/user/modules")
async def get_user_modules(email: str):
    pass
