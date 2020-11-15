import typing
from mongodb import MongoDB
from mapper import Mapper
from abc import ABC


class Feedback(ABC):

    id: int
    type: str
    comments: str

    def __init__(self, id: int, comments: str, type: str, feedback_dict: typing.Dict = None):
        if feedback_dict:
            self.id = feedback_dict["id"]
            self.type = feedback_dict["type"]
            self.comments = feedback_dict["comments"]

        else:
            self.id = id
            self.type = type
            self.comments = comments

    def to_dict(self):
        return {"_id": self.id, "type": self.type, "comments": self.comments}


class Summative(Feedback, Mapper):

    def select(self):
        pass

    def insert(self):
        pass

    def update(self):
        pass

    def delete(self):
        pass


class Formative(Feedback, Mapper):

    def select(self):
        pass

    def insert(self):
        pass

    def update(self):
        pass

    def delete(self):
        pass
