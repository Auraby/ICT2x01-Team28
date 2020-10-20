import mongodb
import typing
import user
import module
import component

def getModules() -> typing.List[module.Module]:
    pass

def getStudents(moduleCode: str) -> typing.List[user.Student]:
    pass

def getProfessors(moduleCode: str) -> typing.List[user.Professor]:
    pass

def getAssessments(moduleCode: str) -> typing.List[component.Assessment]:
    pass