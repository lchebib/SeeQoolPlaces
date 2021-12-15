import mysql.connector
import csv

def getTagSet(cursor, table):
    query = "SELECT tags FROM " + table + " WHERE tags IS NOT NULL"
    cursor.execute(query)

    distinctTags = set()
    for tagField in cursor.fetchall():
        tags = tagField[0].split(",")
        for tag in tags:
            distinctTags.add(tag)

    return distinctTags

def writeSetToCsv(outputFilename, tagSet):
    tagList = list(tagSet)
    tagList.sort()

    with open(outputFilename, mode='w') as outputFile:
        csvWriter = csv.writer(outputFile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        for tag in tagList:
            csvWriter.writerow([tag])


print("\nConnecting to database...")

db = mysql.connector.connect(
  host = "cis550-groupproject.cmnyi6tdsaqq.ap-northeast-1.rds.amazonaws.com",
  user = "admin",
  password = "cis550DBA",
  db = "SeeQoolPlaces"
)
sql = db.cursor()

print("Retrieving tags...")

distinctAttractionTags = getTagSet(sql, "Attraction")
distinctRestaurantTags = getTagSet(sql, "Restaurant")

print("Writing tags to csv on disk...")

writeSetToCsv("distinctAttractionTags.csv", distinctAttractionTags)
writeSetToCsv("distinctRestaurantTags.csv", distinctRestaurantTags)

print("\nDone!!\n")