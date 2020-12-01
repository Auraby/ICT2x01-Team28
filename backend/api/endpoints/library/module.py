from __future__ import annotations
from typing import *
from .mapper import IMapper
from .database import *
from .component import *
from abc import ABC
from pydantic.main import BaseModel


class Module(ABC, IMapper, BaseModel):

    module_code: str
    module_name: Optional[str]
    assessments: List[Assessment] = []

    def __eq__(self, other: Module):
        if not isinstance(other, Module):
            return False

        return self.module_code == other.module_code

    def add_assessment(self, assessment: Assessment) -> bool:
        if (not isinstance(assessment, Assessment)):
            return False

        if assessment in self.assessments:
            return False

        assessment.new_id()
        assessment.module_code = self.module_code

        self.assessments.append(assessment)
        return True

    def remove_assessment(self, assessment: Assessment) -> bool:

        if (assessment not in self.assessments):
            return False

        self.assessments.remove(assessment)
        return True

    def to_dict(self) -> Dict:
        this_dict = self.__dict__
        this_dict["assessments"] = [a.assessment_id for a in self.assessments]
        return this_dict

    def save(self):
        return dynamodb_insert(self.to_dict(), "ict2x01_module")

    def find(self) -> bool:
        if (result := dynamodb_select({"module_code": self.module_code.upper()}, "ict2x01_module")):
            self.module_code = result["module_code"].upper()
            self.module_name = result["module_name"]
            self.assessments = []

            for assessment_id in result["assessments"]:

                assessment = ComponentFactory.create_component(assessment_id)

                if (assessment.find()):
                    self.assessments.append(assessment)

            return True

        return False

    def delete(_):
        pass

    def to_tree(self) -> Dict:
        tree = {
            "name": self.module_code.upper(),
            "module_name": self.module_name,
            "type": "Module"
        }

        if self.assessments:
            tree["children"] = [a.to_tree() for a in self.assessments]

        return tree

    def validate_weightage(self):
        sum_weightage = 0.0

        for assessment in self.assessments:
            for subcomponent in assessment:
                if subcomponent.weightage == 0:
                    continue

                else:
                    sum_weightage += subcomponent.weightage

        if sum_weightage > 1.0:
            return False

        elif sum_weightage < 0:
            return False

        else:
            return True
