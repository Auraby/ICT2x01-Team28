from __future__ import annotations
from abc import ABC, abstractmethod
from datetime import date
from mapper import IMapper
import typing
import database
import datetime


class Component(ABC):

    id: str
    name: str
    max_marks: int
    create_date: datetime.datetime
    end_date: datetime.datetime
    weightage: float

    def __init__(self, id: str, name: str = None, max_marks: int = None, end_date: datetime.datetime = None, weightage: float = None):
        self.id = id
        self.name = name
        self.max_marks = max_marks
        self.end_date = end_date
        self.create_date = datetime.datetime.now()
        self.weightage = weightage

    def __eq__(self, other: Component):
        return self.id == other.id


"""
    Subcomponent will be our leaf class
"""


class Subcomponent(Component):

    def __init__(self, id: str, name: str = None, max_marks: int = None, end_date: datetime.datetime = None, weightage: float = None):
        super().__init__(id, name, max_marks, end_date, weightage)


"""
    Assessment will be our branch
"""


class Assessment(Component):

    def __init__(self,
                 id: str,
                 name: str = None,
                 max_marks: int = None,
                 end_date: datetime.datetime = None,
                 weightage: float = None,
                 subcomponents: typing.List = []):
        super().__init__(id, name, max_marks, end_date, weightage)
        self.subcomponents = subcomponents

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
