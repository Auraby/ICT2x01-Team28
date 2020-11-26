from fastapi import APIRouter
from boto3.dynamodb.conditions import Key, Attr
from pydantic import BaseModel
import typing
import boto3
import time
import uuid
from .library.component import *

router = APIRouter()


@router.get("/user/login")
async def login(email: str, password: str):
    pass


@router.post("/user/register")
async def register(email: str, password: str, cfm_passwrd: str):
    pass


@router.get("/user/modules")
async def user_modules(email: str):
    pass
