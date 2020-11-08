from abc import ABC, abstractmethod

class iFeedback(ABC):
    
    @abstractmethod
    def executeCreateFeedback(self) -> None:
        pass