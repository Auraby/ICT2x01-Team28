import typing
import user

class Module:

    code: str
    name: str
    description: str
    professors: typing.List[user.Professor]
    students: typing.List[user.Students]

    def __init__(self):
        pass

    def getCode(self) -> id:
        pass

    def getName(self) -> str:
        pass

    def getDescription(self) -> int:
        pass

    def getProfessors(self) -> typing.List[user.Professor]:
        pass

    def getStudents(self) -> typing.List[user.Students]:
        pass