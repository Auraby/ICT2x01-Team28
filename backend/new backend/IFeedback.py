from abc import ABC, abstractmethod

class iFeedback(ABC):
    
    @abstractmethod
    def executeCeateFeedback(self) -> None:
        pass