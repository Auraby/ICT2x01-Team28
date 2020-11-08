from abc import ABC
import json 
from collections import namedtuple
from datetime import datetime

class Component(ABC):
    id: int
    name: str
    marks: int
    maxMarks: int
    weightage: float
    endDate: datetime
    createDate: datetime
    componentDict: dict

    def __init__(self, componentDict: dict):

        componentTuple = json.loads(componentDict, object_hook =
               lambda d : namedtuple('x', d.keys()) 
               (*d.values()))  
        
        self.id = componentTuple.id
        self.name = componentTuple.name
        self.marks = componentTuple.marks
        self.maxMarks = componentTuple.maxMarks
        self.weightage = componentTuple.weightage
        self.endDate = componentTuple.endDate
        self.createDate = componentTuple.createDate

    def getName(self) -> str:
        return self.name

    def getMarks(self) -> int:
        return self.marks

    def getMaxMarks(self) -> int:
        return self.getMaxMarks

    def getCreateDate(self) -> datetime:
        return self.getCreateDate

    def getEndDate(self) -> datetime:
        return self.getEndDate

    def getWeightage(self) -> float:
        return self.getWeightage

    # def setName(self, name: str) -> None:
    #     pass

    # def setMarks(self, marks: int) -> None:
    #     pass

    # def setMaxMarks(self, maxMarks: int) -> None:
    #     pass

    # def setEndDate(self, endDate: datetime.datetime) -> None:
    #     pass

    # def setWeightage(self, weightage: float) -> None:
    #     pass