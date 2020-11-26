from fastapi import APIRouter
from boto3.dynamodb.conditions import Key, Attr
from pydantic import BaseModel
import typing
import boto3
import time
import uuid
from .library.component import *

router = APIRouter()
