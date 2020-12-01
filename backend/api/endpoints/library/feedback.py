from __future__ import annotations
from abc import ABC, abstractmethod
from pydantic.main import BaseModel
from .mapper import IMapper
from typing import *
from .database import *
import uuid


class Feedback(ABC, IMapper, BaseModel):

    feedback_id: Optional[str]
    commments: Optional[str]
    component_id: Optional[str]

    @abstractmethod
    def new(self):
        pass

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


class Formative(ABC):
    def new(self, component_id: str):
        self.feedback_id = "SUM" + str(uuid.uuid4())
        self.component_id = component_id


class Summative(ABC):
    def new(self, component_id: str):
        self.feedback_id = "FOR" + str(uuid.uuid4())
        self.component_id = component_id


class FeedbackFactory:

    @classmethod
    def create_feedback(_, feedback_id: str = None, comments: str = None) -> Feedback:

        # Summative feedback ID will start with S
        if feedback_id[0:3] == "SUM":
            return Summative(feedback_id, comments)

        # Formative feedback ID will start with F
        elif feedback_id[0:3] == "FOR":
            return Formative(feedback_id, comments)
