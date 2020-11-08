import json 
from collections import namedtuple
from abc import ABC

class Feedback(ABC):

    id: int
    comments: str
    type: str

    def __init__(self, feedbackDict:dict):
        
        FeedbackTuple = json.loads(feedbackDict, object_hook =
               lambda d : namedtuple('x', d.keys()) (*d.values())) 
    
        self.id = FeedbackTuple.id  
        self.comments = FeedbackTuple.comments
        self.type = FeedbackTuple.type

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