"""----------------------------------------------------------------------------------------------
--- Up to ALwin what he want to do
----------------------------------------------------------------------------------------------"""
#Formula for calculating position
# Get total score of components combined e.g. totalScore
# Get number of stars obtained e.g. totalStars ("A" Grade = 3 stars,"B" Grade = 2 stars "C" Grade = 1 stars, "D" or lower no stars) (Check from component grade)
# Get total achivements completed e.g. total Achievements
# Add them all together
# Store students score to a table with a row that has the maximum score possible to score.

#Formula for retrieving and updating position (Ladder is always in brackets of 20 people)
# Sort table by descending and retrieve index of row
# Check index of row in database (3 possibilities, if index <= 20, 20 < index <= 100, index > 100)
#  - First possibility = retrieve the picture and index of other students infront of user up to the first guy, and students behind the user up to the 20th guy and place accordingly
#  - Second possibility = Check the "tens" value of index then check the "ones" value, if tens value is even number, check ones value if it is 1 then just put at the top spot and
#                         get the other 19 people behind. if ones value is 2 or more then just set position accordingly and get the students infront and behind of the user.
#  - Third possibility = same as second possibility but need check the "hundreds" value then check if tens value is 0 first, then check the ones value. 101th position will be first in bracket.
#   
# Basically bracket will always go by 1-20, 21-40, 41-60 .... 81 - 100, 101 - 120, 121 - 140
# 
# 

class LadderPosition:

    position: int
    stars: int
    grade: str 

    def _init_self(self):
        pass

    def getPosition(self):
        return self.position

    def getStars(self):
        return self.stars

    def getGrade(self):
        return self.grade

    def setStars(self):
        tempstar = self.getGrade()
        if tempstar == "A":
            self.stars = 3
        elif tempstar == "B":
            self.stars = 2
        elif tempstar == "C":
            self.stars = 1
        else:
            self.stars = 0

    def calculatePosition(self):
        #Position = combined score of all components + number of stars +  number of achievements completed
        pass

    def comparePosition(self):
        pass
