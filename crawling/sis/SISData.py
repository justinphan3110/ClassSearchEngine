import xml.etree.ElementTree as ET
from pymongo import MongoClient

class SISData:
    # db = None
    def __init__(self):
        connection = MongoClient('34.69.198.55', 27017)
        # connection = MongoClient('localhost', 27017)
        self.db = connection['classCrawling']


    def reading(self, url):
        tree = ET.parse(url)
        root = tree.getroot()
        for term in root.iter('Term'):
            # print(term[0].text)
            self.classInfo(term, str(term[0].text).replace(" ", "").lower())

    def classInfo(self, term, termDescrip):
        self.db[termDescrip].drop()
        collection = self.db[termDescrip]  
        classes = term[1]
        print(termDescrip)
        for c in  classes:
            # print(c[27][0][0].tag)
            # print('Subject: ' + c.find('CourseTitleLong').text + ". meeting: " + str(c.find('Meeti')))
            # print(c[38].text)
            self.writeMongo(collection, c)

    def writeMongo(self,collection, classInfo):
        meetingInfo = self.parseMeeting(classInfo)

        collection.insert_one({
                            'Subject': classInfo.find('Subject').text
                          , 'Catalog': classInfo.find('CatalogNbr').text
                          , 'Title': classInfo.find('CourseTitleLong').text 
                          , 'Credit': classInfo.find('UnitsRange').text 
                          ,  'DayTime': meetingInfo['DaysTimes']
                          , 'Instructor': meetingInfo['Instructor']
                          , 'Room': meetingInfo['Room']
                          , 'Description': meetingInfo['Description']
                          , 'number': classInfo.attrib['number']
                          , 'Code': classInfo.find('Subject').text.lower() + classInfo.find('CatalogNbr').text
                          , 'Component' : classInfo.find('ComponentCode').text
                          })

    def parseMeeting(self, classInfo):
        meetings = classInfo.find('Meetings')
        meeting = None
        dayTime = None
        prof = None
        room = None
        descrip = None
        dayTimeText = ""
        profText= ""
        roomText = ""
        descripText = ""

        if meetings is not None:
            meeting = meetings.find('Meeting')
            if meeting is not None:
                dayTime = meeting.find('DaysTimes')
                prof = meeting.find('Instructor')
                room = meeting.find('Room')
                if dayTime is not None:
                    dayTimeText = dayTime.text
                if prof is not None:
                    profText = prof.text
                if room is not None:
                    roomText = room.text

        descrip = classInfo.find('Description')
        if descrip is not None:
            descripText = descrip.text
    
        table = {'DaysTimes': None, 'Instructor': None, 'Room': None, 'Description': None}
        table['DaysTimes'] = dayTimeText
        table['Instructor'] = profText
        table['Room'] = roomText
        table['Description'] = descripText
        return table

cleaner = SISData()
cleaner.reading('/home/lnp26/github/ClassSearchEngine/lib/soc.xml')



# tree = ET.parse('/home/long/github/ClassSearchEngine/lib/soc.xml')
# root = tree.getroot()
# year = 2019
# for classes in root.iter('Classes'):
#     print(str(year))
#     year += 1
#     for c in classes.iter('Class'):
#         print(c[3].text)
        # count += 1
    # print(str(count))

# for child in root:
#    print(child.tag, child.attrib)


# classes = data.getElementsByTagName('Class')

# print('hello')
# print(classes[0].attributes['CourseTitleLong'].value)

