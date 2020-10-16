import typing
import feedback

class IUser:

    def getModuleProfessors(self) -> typing.List:
        pass

    def getModuleStudents(self) -> typing.List:
        pass


class IModule:

    def getComponentsForModule(self) -> typing.List:
        pass

class IComponent:

    def addFeedback(self) -> None:
        pass

    def getFeedback(self) -> feedback.Feedback:
        pass

    def setFeedback(self) -> None:
        pass

class IFeedback:

    def getFeedback(self) -> feedback.Feedback:
        pass