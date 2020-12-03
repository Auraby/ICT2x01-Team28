from __future__ import annotations
from abc import ABC, abstractmethod
from pydantic.main import BaseModel
from .mapper import IMapper
from typing import *
from .database import *
from .component import *
import uuid


class Marks(IMapper, BaseModel):

    marks: Optional[int]
    grade: Optional[str]
    user_id: Optional[str]
    component_id: Optional[str]

    def to_dict(self):

        component = ComponentFactory.create_component(self.component_id)
        component.find()
        max_marks = component.max_marks
        ratio = self.marks / max_marks

        if (ratio >= 0.9):
            self.grade = "A+"
        elif (ratio >= 0.85):
            self.grade = "A"
        elif (ratio >= 0.75):
            self.grade = "A-"
        elif (ratio >= 0.7):
            self.grade = "B+"
        elif (ratio >= 0.65):
            self.grade = "B"
        elif (ratio >= 0.6):
            self.grade = "B-"
        else:
            self.grade = "C"

        marks_dict = {
            "marks": self.marks,
            "user_id": self.user_id,
            "component_id": self.component_id,
            "grade": self.grade
        }

        return marks_dict

    def save(self):
        return dynamodb_insert(self.to_dict(), "ict2x01_marks")

    def find(self):
        if (result := dynamodb_select({"component_id": self.component_id, "user_id": self.user_id}, "ict2x01_marks")):
            self.marks = result["marks"]
            return True

        return False

    def delete(self):
        pass
