class LeafElement():
    
    leafObj: object

    def __init__(self, leafObj: object):
        self.leafObj = leafObj

    def showDetails(self): 

        '''Prints the position of the child element.'''
        print("\t", end ="")
        print(self.leafObj.getName())