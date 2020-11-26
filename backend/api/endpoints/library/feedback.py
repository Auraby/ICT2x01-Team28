from abc import ABC, abstractmethod
from mapper import IMapper
import typing
import database


class Feedback(ABC, IMapper):

    id: str
    commments: str

    def __init__(self, id: str, comments: str = None):
        self.id = id
        self.commments = comments

    def to_dict(self) -> typing.Dict:
        return self.__dict__

    def save(self):
        return database.insert(self.to_dict(), "ict2x01_feedback")

    def find(self) -> bool:
        if (result := database.select({"id": self.id}, "ict2x01_feedback")):
            self.name = result["name"]
            self.email = result["email"]
            return True

        return False

    def delete(self):
        return database.delete(self.to_dict(), "ict2x01_feedback")


class Formative(ABC):

    def __init__(self, id: str, comments: str = None):
        super().__init__(id, comments)


class Summative(ABC):

    def __init__(self, id: str, comments: str = None):
        super().__init__(id, comments)


class FeedbackFactory:

    @classmethod
    def create_feedback(_, id: str, comments: str = None) -> Feedback:

        # Typecast id into str if it is not
        if not isinstance(id, str):
            id = str(id).upper()

        # Summative feedback ID will start with S
        if id[0] == "S":
            return Summative(id, comments)

        # Formative feedback ID will start with F
        elif id[0] == "F":
            return Formative(id, comments)
