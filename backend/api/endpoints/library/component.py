from __future__ import annotations
from abc import ABC
from pydantic.main import BaseModel
from .mapper import IMapper
from typing import *
from .database import *
import time
import uuid
from decimal import Decimal


class Component(ABC, BaseModel, IMapper):

    component_id: Optional[str]
    name: Optional[str]
    end_date: Optional[int]
    max_marks: Optional[int]
    weightage: Optional[float]
    create_date: int = int(time.time())

    def to_dict(self):
        return {
            "name": str(self.name),
            "max_marks": int(self.max_marks),
            "create_date": int(self.create_date),
            "end_date": int(self.end_date),
            "weightage": Decimal(self.weightage),
        }

    def save(self):
        pass

    def find(self):
        pass

    def delete(self):
        pass


class Subcomponent(Component):

    subcomponent_id: Optional[str]
    assessment_id: Optional[str]

    def __eq__(self, other: Subcomponent):
        if not isinstance(other, Subcomponent):
            return False

        return (self.subcomponent_id == other.subcomponent_id) or (self.name == other.name)

    def to_dict(self) -> Dict:
        subcomponent_dict = super().to_dict()
        subcomponent_dict["component_id"] = self.subcomponent_id
        subcomponent_dict["subcomponent_id"] = self.subcomponent_id
        subcomponent_dict["assessment_id"] = self.assessment_id
        return subcomponent_dict

    def find(self) -> bool:
        if (result := dynamodb_select({"subcomponent_id": self.subcomponent_id}, "ict2x01_subcomponents")):
            self.name = str(result["name"])
            self.end_date = int(result["end_date"])
            self.max_marks = int(result["max_marks"])
            self.weightage = float(result["weightage"])
            self.create_date = int(result["create_date"])
            self.subcomponent_id = str(result["subcomponent_id"])
            self.assessment_id = str(result["assessment_id"])
            return True

        return False

    def new_id(self) -> str:
        self.subcomponent_id = "S" + str(uuid.uuid4()).upper()

    def save(self):
        return dynamodb_insert(self.to_dict(), "ict2x01_subcomponents")

    def delete(self):
        print(self.subcomponent_id)

        dynamodb_delete({"subcomponent_id": self.subcomponent_id},
                        "ict2x01_subcomponents")

        assessment = ComponentFactory.create_component(self.assessment_id)

        if (assessment.find()):
            assessment.remove_subcomponent(self)
            assessment.save()


class Assessment(Component):

    assessment_id: Optional[str]
    module_code: Optional[str]
    subcomponents: List[Subcomponent] = []

    def __eq__(self, other: Assessment):
        if not isinstance(other, Assessment):
            return False

        return (self.assessment_id == other.assessment_id) or (self.name == other.name)

    def add_subcomponent(self, subcomponent: Subcomponent) -> bool:
        if (not isinstance(subcomponent, Subcomponent)):
            return False

        if (subcomponent in self.subcomponents):
            return False

        subcomponent.new_id()
        subcomponent.assessment_id = self.assessment_id

        self.subcomponents.append(subcomponent)
        return True

    def remove_subcomponent(self, subcomponent: Subcomponent):
        if (not isinstance(subcomponent, Subcomponent)):
            return False

        if (not subcomponent in self.subcomponents):
            return False

        self.subcomponents.remove(subcomponent)
        return True

    def to_dict(self) -> Dict:
        assessment_dict = super().to_dict()
        assessment_dict["component_id"] = self.assessment_id
        assessment_dict["module_code"] = self.module_code
        assessment_dict["assessment_id"] = self.assessment_id
        assessment_dict["subcomponents"] = [
            s.subcomponent_id for s in self.subcomponents]
        return assessment_dict

    def find(self) -> bool:
        if (result := dynamodb_select({"assessment_id": self.assessment_id}, "ict2x01_assessments")):
            self.name = str(result["name"])
            self.end_date = int(result["end_date"])
            self.max_marks = int(result["max_marks"])
            self.weightage = float(result["weightage"])
            self.create_date = int(result["create_date"])
            self.assessment_id = str(result["assessment_id"])
            self.module_code = str(result["module_code"])
            self.subcomponents = []

            if result["subcomponents"]:
                self.weightage = 0
                self.max_marks = 0

                for subcomponent_id in result["subcomponents"]:
                    subcomponent = ComponentFactory.create_component(
                        subcomponent_id)

                    if (subcomponent.find()):
                        self.subcomponents.append(subcomponent)
                        self.max_marks += subcomponent.max_marks
                        self.weightage += subcomponent.weightage

            return True

        return False

    def delete(self):
        subcomponents = dynamodb_query(
            {"assessment_id": self.assessment_id},
            table_name="ict2x01_subcomponents",
            index_name="assessment_id-index"
        )

        for subcomponent in subcomponents:
            subcomponent = ComponentFactory.create_component(
                subcomponent["subcomponent_id"])
            subcomponent.find()
            subcomponent.delete()

        dynamodb_delete({"assessment_id": self.assessment_id},
                        "ict2x01_assessments")

    def new_id(self) -> str:
        self.assessment_id = "A" + str(uuid.uuid4()).upper()

    def to_tree(self) -> Dict:
        tree = self.to_dict()
        tree["type"] = "Assessment"
        tree.pop("subcomponents")

        if self.subcomponents:
            tree["children"] = []
            for s in self.subcomponents:
                child_dict = s.to_dict()
                child_dict["type"] = "Subcomponent"
                child_dict["module_code"] = self.module_code
                tree["children"].append(child_dict)

        return tree

    def save(self):
        return dynamodb_insert(self.to_dict(), "ict2x01_assessments")


class ComponentFactory:

    @classmethod
    def create_component(_, component_id: str) -> Component:

        # Typecast id into str if it is not
        component_id = str(component_id).upper()

        # Assessments starts with A
        if component_id[0] == "A":
            return Assessment(assessment_id=component_id)

        # Subcomponents ID will start with S
        else:
            return Subcomponent(subcomponent_id=component_id)
