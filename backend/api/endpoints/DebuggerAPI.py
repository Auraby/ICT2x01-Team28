from fastapi import APIRouter
from .library.component import *
from .library.feedback import *
from .library.module import *
from .library.utils import *
from .library.marks import *
from .library.user import *

router = APIRouter()

if (not dynamodb_select({"module_code": "ICT2103"}, "ict2x01_module")):
    ict2103 = Module(module_code="ICT2103",
                     module_name="Information Management")

    ict2103_quiz_1 = Assessment(
        name="Quiz 1", max_marks=100, weightage=20, end_date=0)
    ict2103_workshop = Assessment(
        name="NoSQL Workshop", max_marks=5, weightage=5, end_date=0)
    ict2103_project = Assessment(
        name="Project", max_marks=100, weightage=40, end_date=0)
    ict2103_project_nosql = Subcomponent(
        name="NoSQL Component", max_marks=30, weightage=12, end_date=0)
    ict2103_project_sql = Subcomponent(
        name="SQL Component", max_marks=30, weightage=12, end_date=0)
    ict2103_project_report = Subcomponent(
        name="Report", max_marks=10, weightage=4, end_date=0
    )
    ict2103_project_presentation = Subcomponent(
        name="Presentation", max_marks=10, weightage=12, end_date=0
    )

    ict2103.add_assessment(ict2103_project)
    ict2103.add_assessment(ict2103_workshop)
    ict2103.add_assessment(ict2103_quiz_1)

    ict2103.save()
    ict2103_project.save()
    ict2103_workshop.save()
    ict2103_quiz_1.save()

    ict2103_project.add_subcomponent(ict2103_project_nosql)
    ict2103_project.add_subcomponent(ict2103_project_sql)
    ict2103_project.add_subcomponent(ict2103_project_presentation)

    ict2103_project.save()
    ict2103_workshop.save()
    ict2103_quiz_1.save()

    ict2103_project_nosql.save()
    ict2103_project_sql.save()
    ict2103_project_presentation.save()


""" ict2102 = Module(module_code="ICT2102",
                 module_name="Human Computer Interaction")
ict2x01 = Module(module_code="ICT2X01",
                 module_name="Introduction to Software Engineering")
ict2901 = Module(module_code="ICT2901",
                 module_name="Professional and Career Development 1")
ict2104 = Module(module_code="ICT2104",
                 module_name="Embedded Systems Programming")
 """
