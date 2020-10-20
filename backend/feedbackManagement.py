import typing
import feedback
import component

def getSummative(component_id: int) -> feedback.Summative:
    pass

def getFormative(component_id: int) -> typing.List[feedback.Formative]:
    pass

def hasFeedback(component_id: int) -> bool:
    pass

def addSummative(component_id: int, feedback: feedback.Summative) -> None:
    pass

def addFormative(component_id: int, feedback: feedback.Formative) -> None:
    pass

def hasMarks(component_id: int) -> bool:
    pass

def addMarks(component_id: int) -> None:
    pass

def editMarks(component_id: int, new_marks: int) -> None:
    pass

def editComments(feedback_id: int, new_comments: str) -> bool:
    pass