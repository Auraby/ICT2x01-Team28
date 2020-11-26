from __future__ import annotations
from abc import ABCMeta, abstractmethod
import typing


class IMapper(metaclass=ABCMeta):

    """
        Converts the object into a dict suitable to be used with DynamoDB
    """
    @abstractmethod
    def to_dict() -> typing.Dict:
        pass

    """
        Saves the object into database. Should call the insert function
    """
    @abstractmethod
    def save() -> typing.Dict:
        pass

    """
        Finds if the object exists in database. Return true if it is found
    """
    @abstractmethod
    def find() -> bool:
        pass

    """
        Deletes the object from the databaes
    """
    @abstractmethod
    def delete() -> bool:
        pass
