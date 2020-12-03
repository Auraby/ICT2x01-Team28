from __future__ import annotations
from pydantic.main import BaseModel
from .mapper import IMapper
from .marks import *
from .user import *
from .component import *
from typing import *
from .database import *
import uuid


class Achievement(IMapper, BaseModel):

    achievement_id: Optional[str]
    achievement_name: Optional[str]
    achievement_description: Optional[str]
    student_id: Optional[str]
    module_code: Optional[str]

    def to_dict(self) -> Dict:
        return self.__dict__

    def save(self):
        return dynamodb_insert(self.to_dict(), "ict2x01_achievements")

    def find(self):
        pass

    def delete(self):
        pass

    @classmethod
    def update(self, marks: Marks):
        user = UserFactory.create_user(marks.user_id)
        component = ComponentFactory.create_component(marks.component_id)

        if (isinstance(component, Subcomponent)):
            component = ComponentFactory.create_component(
                component.assessment_id)

            if (not component.find()):
                return
