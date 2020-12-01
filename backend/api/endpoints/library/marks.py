from __future__ import annotations
from abc import ABC, abstractmethod
from pydantic.main import BaseModel
from .mapper import IMapper
from typing import *
from .database import *
import uuid


class Marks(IMapper, BaseModel):

    marks: Optional[int]
    user_id: Optional[str]
    component_id: Optional[str]

    def to_dict(self):
        return self.__dict__

    def save(self):
        return dynamodb_insert(self.to_dict(), "ict2x01_marks")

    def find(self):
        if (result := dynamodb_select({"component_id": self.component_id, "user_id": self.user_id}, "ict2x01_marks")):
            self.marks = result["marks"]
            return True

        return False

    def delete(self):
        pass
