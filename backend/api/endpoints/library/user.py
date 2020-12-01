from __future__ import annotations
from abc import ABC
from .mapper import IMapper
from pydantic.main import BaseModel
from .database import *
from .module import *
from typing import *


class User(ABC, IMapper, BaseModel):

    user_id: str
    role: str
    name: Optional[str]
    email: Optional[str]
    password: Optional[str]
    modules: List = []

    def add_module(self, module_code: str):
        if module_code in self.modules:
            return False

        self.modules.append(module_code)
        return True

    def to_dict(self) -> Dict:
        return self.__dict__

    def save(self):
        return dynamodb_insert(self.dict(), "ict2x01_users")

    def find(self) -> bool:
        if (result := dynamodb_select({"user_id": self.user_id}, "ict2x01_users")):
            self.name = result["name"]
            self.email = result["email"]
            self.password = result["password"]
            self.modules = result["modules"]
            return True

        return False

    def delete(self):
        return dynamodb_delete(self.to_dict(), "ict2x01_users")

    def to_tree(self):
        tree = {
            "name": self.email,
            "toggled": True,
            "children": []
        }

        for module_code in self.modules:
            module = Module(module_code=module_code)
            module.find()
            tree["children"].append(module.to_tree())

        return tree


class Student(User):
    pass


class Professor(User):
    pass


class UserFactory:

    @classmethod
    def create_user(_, email: str) -> User:

        if "@" in email:
            user_id = email[0:email.index("@")]

        else:
            user_id = email

        if user_id == "A":
            return Professor(user_id=user_id, email=email, role="professor")

        else:
            return Student(user_id=user_id, email=email, role="student")
