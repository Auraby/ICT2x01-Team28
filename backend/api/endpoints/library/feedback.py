from __future__ import annotations
from abc import ABC, abstractmethod
from pydantic.main import BaseModel
from .mapper import IMapper
from typing import *
from .database import *
import uuid


class Feedback(ABC, IMapper, BaseModel):

    feedback_id: Optional[str]
    comments: Optional[str]
    component_id: Optional[str]

    def __eq__(self, other: Feedback):
        if (not isinstance(other, Feedback)):
            return False

        return self.feedback_id == other.feedback_id

    def to_dict(self):
        return vars(self)

    def save(self):
        return dynamodb_insert(self.to_dict(), "ict2x01_feedbacks")

    def find(self):
        if (result := dynamodb_select({"feedback_id": self.feedback_id})):
            self.comments = result["comments"]
            self.component_id = result["component_id"]
            return True

        return False

    def delete(self):
        pass


class Formative(Feedback):
    pass


class Summative(Feedback):
    def save(self):
        for feedback in dynamodb_scan({"component_id": self.component_id}, "ict2x01_feedbacks"):
            if feedback["feedback_id"][0:3] == "SUM":
                self.feedback_id = feedback["feedback_id"]

        super().save()


class FeedbackFactory:

    @classmethod
    def create_feedback(_, component_id: str, comments: str, summative=False):

        if summative:
            return Summative(feedback_id="SUM" + str(uuid.uuid4()).upper(), component_id=component_id, comments=comments)

        return Formative(feedback_id="FOR" + str(uuid.uuid4()).upper(), component_id=component_id, comments=comments)
