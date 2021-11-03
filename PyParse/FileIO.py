import csv

def readCSV(filename):
    with open(filename) as inputCSV:
        csvReader = csv.reader(inputCSV, delimiter=',')
        return list(csvReader)

def writeCSV(filename, content):
    with open(filename, mode='w') as outputFile:
        csvWriter = csv.writer(outputFile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        csvWriter.writerows(content)
        return