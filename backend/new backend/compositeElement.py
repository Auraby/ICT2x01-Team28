# import abc from ABC
import module
import component

class CompositeElement():

    def __init__(self, compositeObj:object): 
        self.compsiteObj = compositeObj
        ''''Takes the first positional argument and assigns to member variable "position".'''
        self.children = []
        self.allDetails = []

    def add(self, child): 
  
        '''Adds the supplied child element to the list of children 
         elements "children".'''
        self.children.append(child) 
  
    def remove(self, child): 
  
        '''Removes the supplied child element from the list of 
        children elements "children".'''
        self.children.remove(child) 
  
    def showDetails(self): 
  
        '''Prints the details of the component element first. Then, 
        iterates over each of its children, prints their details by 
        calling their showDetails() method.'''

        if(isinstance(self.compsiteObj,module.Module)):
            print(self.compsiteObj.getName())

        if(isinstance(self.compsiteObj,component.Component)):
            print(self.compsiteObj.getName())

        for child in self.children: 
            print("\t", end ="") 
            child.showDetails() 
