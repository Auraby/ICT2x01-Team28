from abc import ABC

class Feedback(ABC):

    id: int
    comments: str
    type: str

    def __init__(self):
        pass

    def getId(self) -> id:
        pass

    def getComments(self) -> str:
        pass

    def getMarks(self) -> int:
        pass

    def setComments(self, comments: str) -> None:
        self.comments = comments

    def setMarks(self, marks: int) -> None:
        self.marks = marks

    def setType(self, type: str) -> None:
        self.type = type