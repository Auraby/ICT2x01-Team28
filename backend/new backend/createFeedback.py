from abc import ABC
import IFeedback

class CreateFeedback(ABC):

    def __init__(self, obj):
        self.obj = obj #Feedback object


class SummativeFeedback(IFeedback.iFeedback, CreateFeedback):

    def executeCeateFeedback(self):
        
        try:
            
            '''
            connect to db part here
            '''

            print(self.obj.id)
            print(self.obj.comments)
            print(self.obj.type)
            print("Summative Feedback created")
            
        except:

            print("Error creating summative Feedback")


class FormativeFeedback(IFeedback.iFeedback, CreateFeedback):

    def executeCeateFeedback(self):
        
        try:
            
            '''
            connect to db part here
            '''

            print(self.obj.id)
            print(self.obj.comments)
            print(self.obj.type)
            print("Formative Feedback created")
        
        except:

            print("Error creating Formative Feedback")

