import json 
from collections import namedtuple
from typing import List
import user

class Module:

    code: str
    name: str
    description: str
    professors: List[user.Professor]
    students: List[user.Student]
    moduleDict: dict
    children: list

    def __init__(self, moduleDict:dict):
        
        moduleTuple = json.loads(moduleDict, object_hook =
               lambda d : namedtuple('x', d.keys()) 
               (*d.values()))  
        
        self.code = moduleTuple.code
        self.name = moduleTuple.name
        self.description = moduleTuple.description
        self.professors = moduleTuple.professors
        self.students = moduleTuple.students

    def getCode(self) -> id:
        return self.code

    def getName(self) -> str:
        return self.name

    def getDescription(self) -> int:
        return self.description

    def getProfessors(self) -> List[user.Professor]:
        return self.professors

    # def getStudents(self) -> List[user.Students]:
    #     return self.students