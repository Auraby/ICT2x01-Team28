import typing
from .mapper import IMapper
from .database import *
from .component import *
from abc import ABC
from pydantic.main import BaseModel


class Module(ABC, IMapper, BaseModel):

    module_code: str
    module_name: str
    assessments: typing.Optional[typing.List[Assessment]]

    def __init__(self, module_code: str, module_name: str = None, assessments: typing.List[Assessment] = None):
        self.module_code = module_code
        self.module_name = module_name
        self.assessments = assessments

    def add_assessment(self, assessment: Assessment) -> bool:
        if (not isinstance(assessment, Assessment)):
            return False

        if assessment not in self.assessments:
            self.assessments.append(assessment)
            return True

        return False

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
