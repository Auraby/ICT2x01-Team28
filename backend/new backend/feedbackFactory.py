from abc import ABC
import createFeedback
class FeedbackFactory:

    def __init__(self):
        pass

#Idk if viewing of feedback is done by factory
    # @classmethod
    # def viewFeedback(cls, feedbackObject):

    #     # if (isinstance(feedbackType, feedback.Feedback)):
    #     #     feedbackType = feedbackType.type

    #     if (feedbackObject.Type.lower() == "summative"):
    #         pass
    #         # return viewSummative(feedbackObject)

    #     if (feedbackObject.Type.lower() == "formative"):
    #         pass
    #         # return viewFormative(feedbackObject)

    #     return None

    @classmethod
    def makeFeedback(cls, feedbackObject): # I presume an object will be passed in here or soemthing

        if (feedbackObject.type.lower() == "summative"):
            print(feedbackObject)
            return createFeedback.SummativeFeedback(feedbackObject)

        if (feedbackObject.type.lower() == "formative"):
            print(feedbackObject)
            return createFeedback.FormativeFeedback(feedbackObject)


        return None