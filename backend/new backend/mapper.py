from abc import ABC, abstractmethod


class Mapper(ABC):

    @abstractmethod
    def select(self):
        pass

    @abstractmethod
    def insert(self):
        pass

    @abstractmethod
    def update(self):
        pass

    @abstractmethod
    def delete(self):
        pass
