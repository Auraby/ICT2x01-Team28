# from typing import Optional
from flask import Flask
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, request
# import componentManagement as componentManagement
# import backend.moduleReader as moudleReader
# import mongodb as mongodb
import json

"""
I want all the control class methods here, mapped to a REST API endpoint.
"""
app = Flask(__name__)
app.secret_key = "secretkey"


# app.config['MONGO_URI'] = ""

# mongo = PyMongo(app)


@app.route('/home')
def test():
    return "Hello"


@app.route('/view/module/<modnum>')
def viewMod(modnum):
    if modnum == 1:
        # mongodb.select()
        return "hello"

    elif modnum == 2:
        # mongodb.select()
        pass
    else:
        # mongodb.select()
        pass
    return "hello"


@app.route('/login')
def login():
    return "hello"


@app.route('/logout')
def logout():
    return "hello"


@app.route('/upload')
def upload():
    return "hello"


@app.route('/add/assessment/')
def addAssessment():
    mod = request.args.get('selectedModule')
    name = request.args.get('name')
    date = request.args.get('date')
    marks = request.args.get('maxMarks')
    weight = request.args.get('weightage')
    mongopost = {"name": name, "date": date, "marks": marks, "weight": weight}
    #mongodb.insert(mod, mongopost)

    return "Assessment added successfully"


@app.route('/add/subcomponent')
def addSubcomponent():
    mod = request.args.get('selectedModule')
    assess = request.args.get('selectedAssessment')
    name = request.args.get('name')
    marks = request.args.get('maxMarks')
    weight = request.args.get('weightage')
    return "hello"


@app.route('/add/feedback/<fbnum>')
def addFeedback(fbnum):
    if fbnum == 1:
        mod = request.args.get('selectedModule')
        student = request.args.get('selectedStudent')
        commenttype = request.args.get('commentType')
        comment = request.args.get('comment')
    elif fbnum == 2:
        pass
    elif fbnum == 3:
        pass

    return "hello"


@app.route('/edit/assessment/')
def editAssessment():
    return "hello"


@app.route('/edit/subcomponent/')
def editSubcomponent():
    subcomname = request.args.get('name')
    return "hello {}".format(subcomname)


@app.route('/edit/feedback/')
def editFeedback():
    return "hello"


@app.route('/select/assessment')
def selectAssessment():
    return "hello"


@app.route('/select/subcomponent')
def selectSubcomponent():
    return "hello"


@app.route('/delete/feedback/')
def deleteFeedback():
    return "hello"


@app.route('/view/assessment')
def viewAssessment():
    return "hello"


@app.route('/view/subcomponent')
def viewSubcomponent():
    return "hello"


@app.route('/view/feedback')
def viewFeedback():
    return "hello"


if __name__ == "__main__":
    app.run(debug=True)

# Example for get component
# @app.get("/get/assessment/{assessment_id}")
# def read_item(assessment_id: int):
#    assessment = componentManagement.getAssessment(assessment_id)
#    return json.dumps(assessment.__dict__)
