from __future__ import annotations
from abc import ABC
from pydantic.main import BaseModel
from .mapper import IMapper
import typing
from .database import *
import datetime
import time
import uuid


class Component(ABC, BaseModel, IMapper):

    id: typing.Optional[str] = None
    name: str
    max_marks: int
    create_date: int = int(time.time())
    end_date: int
    weightage: float

    def __init__(self, name: str = None, max_marks: int = None, end_date: datetime.datetime = None, weightage: float = None):
        self.name = name
        self.max_marks = max_marks
        self.end_date = end_date
        self.create_date = int(time.time())
        self.weightage = weightage

    def __eq__(self, other: Component):
        if (not isinstance(other, Component)):
            return False
        return self.id == other.id

    def to_dict(self) -> typing.Dict:
        return self.__dict__

    def save(self):
        return dynamodb_insert(self.to_dict(), "ict2x01_module")

    def find(self) -> bool:
        if (result := dynamodb_select({"module_code": self.module_code}, "ict2x01_module")):
            self.module_code = result["module_code"]
            self.module_name = result["module_name"]
            return True

        return False

    def delete(self):
        return dynamodb_delete(self.to_dict(), "ict2x01_module")

    def update(self, other: Component) -> bool:
        if not type(self) is type(other):
            return False

        self.name = other.name
        self.max_marks = other.max_marks
        self.end_date = other.end_date
        self.weightage = other.weightage
        return True


"""
    Subcomponent will be our leaf class
"""


class Subcomponent(Component):

    def __init__(self, id: str = None, name: str = None, max_marks: int = None, end_date: datetime.datetime = None, weightage: float = None):
        super().__init__(name, max_marks, end_date, weightage)

        if not id:
            self.id = "S" + str(uuid.uuid1()).upper()

        else:
            self.id = id.upper()


"""
    Assessment will be our branch
"""


class Assessment(Component):

    def __init__(self,
                 id: str = None,
                 name: str = None,
                 max_marks: int = None,
                 end_date: datetime.datetime = None,
                 weightage: float = None,
                 subcomponents: typing.List = []):
        super().__init__(name, max_marks, end_date, weightage)
        self.subcomponents = subcomponents
        if not id:
            self.id = "A" + str(uuid.uuid1()).upper()

        else:
            self.id = id.upper()

    def add_subcomponent(self, subcomponent: Subcomponent) -> bool:
        if not isinstance(subcomponent, Subcomponent):
            return False

        self.subcomponents.append(subcomponent)
        return True

    def remove_subcomponent(self, subcomponent: Subcomponent):
        if subcomponent in self.subcomponents:
            self.subcomponents.remove(subcomponent)

    def get_weightage(self) -> float:
        return sum(sc.weightage for sc in self.subcomponents)

    def get_max_marks(self) -> int:
        return sum(sc.max_marks for sc in self.subcomponents)

    def get_remaining_weightage(self) -> float:
        return self.weightage - self.get_weightage()

    def get_remaining_max_marks(self) -> int:
        return self.max_marks - self.get_max_marks()


class ComponentFactory:

    @classmethod
    def create_component(_, component_id: str) -> Component:

        # Typecast id into str if it is not
        if not isinstance(id, str):
            id = str(id).upper()

        # Assessments starts with A
        if id[0] == "A":
            return Assessment(component_id)

        # Subcomponents ID will start with S
        elif id[0] == "S":
            return Subcomponent(component_id)

    @classmethod
    def new_component(_, is_assessment) -> Component:

        if is_assessment:
            return Assessment()

        return Subcomponent()
