import feedback
import module
import component
import feedbackFactory
import compositeElement
import leafElement

#################################### Initialising dummy data for all feedback ####################################

inputFeedback1 = '{"id" : 1, "comments" : "hello", "type" : "summative"}'
inputFeedback2 = '{"id" : 1, "comments" : "hello world", "type" : "formative"}'

#################################### Initialising dummy data for all modules ####################################

# escaping my double quotes multiple times cause....json ¯\_(ツ)_/¯
moduleInput1 = '{"code": "ICT 2x01", "name": "Software Engineering", "description": "Best Mod", "professors": ["Alex \\"last min\\" surname", "Ah quah"], "students": ["Max Lao da", "Fake oscp gene", "Hardy mirza"]}'
moduleInput2 = '{"code": "ICT 2901", "name": "Career and Professional Development ", "description": "Rubbish Mod", "professors": ["Lao \\"If not as good as i write your resume\\" zha bor", "blazer lover prof"], "students" : ["Max \\"tio boh?\\" Moon", "still tilted af gene"]}'

#################################### Initialising dummy data for component 1 ####################################

componentInput11 = '{"id": 1, "name": "CA1", "marks": 80, "maxMarks": 100, "weightage": 20, "endDate": "2019-4-13", "createDate": "2019-1-10"}'
componentInput12 = '{"id": 2, "name": "CA2", "marks": 80, "maxMarks": 100, "weightage": 20, "endDate": "2019-4-13", "createDate": "2019-1-10"}'

#################################### Initialising dummy data for subcomponent 1 (I was lazy to create another subcomponent.py, idk if we actually need another) ####################################

subComponentInput11 = '{"id": 1, "name": "quiz", "marks": 85, "maxMarks": 90, "weightage": 5, "endDate": "2019-4-13", "createDate": "2019-1-10"}'
subComponentInput12 = '{"id": 1, "name": "quiz2", "marks": 55, "maxMarks": 30, "weightage": 10, "endDate": "2019-4-13", "createDate": "2019-1-10"}'

#################################### Initialising dummy data for component 2 ####################################

componentInput2 = '{"id": 1, "name": "CA2", "marks": 70, "maxMarks": 100, "weightage": 10, "endDate": "2019-8-20", "createDate": "2019-6-10"}'

#################################### Converting all feedback to an object ####################################

feedback_summative = feedback.Feedback(inputFeedback1)
feedback_formative = feedback.Feedback(inputFeedback2)

#################################### Converting module dict to an object ####################################

mod1 = module.Module(moduleInput1)
mod2 = module.Module(moduleInput2)

#################################### Converting component & subcomponent dict to an object ####################################

com11 = component.Component(componentInput11)
com12 = component.Component(componentInput12)

subCom11 = component.Component(subComponentInput11)
subCom12 = component.Component(subComponentInput12)

com2 = component.Component(componentInput2)

#################################### Creating compositeElement 1 ####################################

compositeModule1 = compositeElement.CompositeElement(mod1)

compositeComponent1 = compositeElement.CompositeElement(com11)
compositeComponent2 = compositeElement.CompositeElement(com12)

#################################### Creating leafElement 1 ####################################

leafSubComponent11 = leafElement.LeafElement(subCom11)
leafSubComponent12 = leafElement.LeafElement(subCom12)

#################################### Adding CompositeComponent 1 to CompositeModule 1 ####################################

compositeModule1.add(compositeComponent1)
compositeModule1.add(compositeComponent2)

#################################### Adding leafSubComponent 1 to compositeComponent 1 ####################################

compositeComponent1.add(leafSubComponent11)

#################################### Adding leafSubComponent 2 to compositeComponent 2 ####################################

compositeComponent2.add(leafSubComponent12)

#################################### Creating compositeElement 2 ####################################

compositeModule2 = compositeElement.CompositeElement(mod2)
compositeComponent2 = compositeElement.CompositeElement(com2)

#################################### Creating leafElement 2 ####################################

# leafComponent2 = leafElement.LeafElement(com2)

#################################### Adding CompositeComponent 2 to compositeModule 2 ####################################

compositeModule2.add(compositeComponent2)

#################################### Runner Code ####################################

print("\n#################################### Factory ####################################\n")
f1 = feedbackFactory.FeedbackFactory.makeFeedback(feedback_summative)
f2 = feedbackFactory.FeedbackFactory.makeFeedback(feedback_formative)

f1.executeCreateFeedback()
f2.executeCreateFeedback()

print("\n#################################### Composite ####################################\n")
compositeModule1.showDetails()
compositeModule2.showDetails()
