import component
import user
import typing

# Retrieve assessment details
def getAssessment(assessment_id: int) -> component.Assessment:
    pass

# Retrieve subcomponent details
def getSubcomponent(subcomponent_id: int) -> component.Subcomponent:
    pass

# Retrieve all subcomponents for assessment
def getSubcomponentsForAssessment(assessment_id: int) -> typing.List[component.Subcomponent]:
    pass

# Check subcomponent belong to which assessment
def getAssessmentForSubcomponent(subcomponent_id: int) -> component.Assessment:
    pass

# Insert new assessment into database
def createAssessment(assessment: component.Assessment) -> None:
    pass
# Insert new subcomponent into database
def createSubcomponent(subcomponent: component.subcomponent) -> None:
    pass

# Update assessment/subcomponent from database
def editSubComponent(subcomponent_id: id, new_subcomponent: component.Subcomponent) -> None:
    pass

def editAssessment(assessment_id: id, new_assessment: component.Assessment) -> None:
    pass

# Delete assessment/subcomponent from database
def deleteComponent(component_id: int) -> None:
    pass

# Get all Assessments under a module
def getComponents(module_code: str) -> typing.List[Assessment]:
    pass

# Get all students taking an assessment with the assessment_id
def getStudentsFor(assessment_id: int) -> typing.List[Student]:
    pass

# Get all professors associated with assessment
def getProfessorsFor(assessment_id: int) -> typing.List[Professor]:
    pass

# Assign a subcomponent to an assessment
def addSubcomponent(subcomponent_id: int, assessment_id: int) -> None:
    pass