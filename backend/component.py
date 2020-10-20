from abc import ABC
import datetime

class Component(ABC):
    id: int
    name: str
    marks: int
    maxMarks: int
    weightage: float
    endDate: datetime.datetime
    createDate: datetime.datetime

    def __init__(self):
        pass

    def getId(self) -> id:
        pass

    def getName(self) -> str:
        pass

    def getMarks(self) -> int:
        pass

    def getMaxMarks(self) -> int:
        pass

    def getCreateDate(self) -> datetime.datetime:
        pass

    def getEndDate(self) -> datetime.datetime:
        pass

    def getWeightage(self) -> float:
        pass

    def setName(self, name: str) -> None:
        pass

    def setMarks(self, marks: int) -> None:
        pass

    def setMaxMarks(self, maxMarks: int) -> None:
        pass

    def setEndDate(self, endDate: datetime.datetime) -> None:
        pass

    def setWeightage(self, weightage: float) -> None:
        pass


class Assessment(Component):
    pass

class Subcomponent(Component):
    pass