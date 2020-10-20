from abc import ABC
import typing

class User(ABC):

    id: int
    name: str
    email: str
    role: str
    modules: typing.List

    def __init__(self):
        pass

    def getId(self) -> id:
        pass

    def getName(self) -> str:
        pass

    def getEmail(self) -> str:
        pass

    def getRole(self) -> str:
        pass

    def getModules(self) -> typing.List:
        pass

class Student(User):
    """
        Help me implement this according to the class diagram. Inherit from the User abstract class
    """
    pass

class Professor(User):
    """
        Help me implement this according to the class diagram. Inherit from the User abstract class
    """
    pass