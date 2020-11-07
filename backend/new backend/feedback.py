from abc import ABC

class Feedback(ABC):

    id: int
    comments: str
    type: str

    def __init__(self, id: int, comments: str, type: str):
        self.id = id
        self.comments = comments
        self.type = type

#     def getId(self) -> id:
#         pass

#     def getComments(self) -> str:
#         pass

#     def getMarks(self) -> int:
#         pass

#     def setComments(self, comments: str) -> None:
#         pass

#     def setMarks(self, marks: int) -> None:
#         pass

#     def setType(self, type: str) -> None:
#         pass

# class Summative(Feedback):
#     pass

# class Formative(Feedback):
#     pass