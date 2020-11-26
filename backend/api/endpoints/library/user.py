from abc import ABC
from .mapper import IMapper
from pydantic.main import BaseModel
from .database import *
import typing


class User(ABC, IMapper, BaseModel):

    """
    Fields
    """
    id: typing.Optional[str]
    password: str
    name: str
    email: str
    role: typing.Optional[str]

    def __init__(self, id: str, role: str):
        self.id = id
        self.role = role

    def to_dict(self) -> typing.Dict:
        return self.__dict__

    def save(self):
        return database.insert(self.to_dict(), "ict2x01_users")

    def find(self) -> bool:
        if (result := database.select({"id": self.id}, "ict2x01_users")):
            self.name = result["name"]
            self.email = result["email"]
            return True

        return False

    def delete(self):
        return database.delete(self.to_dict(), "ict2x01_users")


class Student(User):

    def __init__(self, id: str):
        super().__init__(id, "student")


class Professor(User):

    def __init__(self, id: str):
        super().__init__(id, "professor")


class UserFactory:

    @classmethod
    def create_user(_, id: str) -> User:

        # Typecast id into str if it is not
        if not isinstance(id, str):
            id = str(id).upper()

        # SIT staff IDs starts with A
        if id[0] == "A":
            return Professor(id)

        # Default everything else to student
        else:
            return Student(id)
