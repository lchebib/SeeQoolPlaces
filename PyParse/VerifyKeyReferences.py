import FileIO

def generateKeySet(table, indexes):
    keySet = set()

    for row in table:
        key = ""
        for i in indexes:
            key += row[int(i)]
        keySet.add(key.lower())

    return keySet

def allReferenceKeysExist(referenceTable, referenceKeyIndexes, foreignKeys):
    for row in referenceTable:
        if foreignKeys[0].lower() == row[int(referenceKeyIndexes[0])].lower():
            allKeysGood = True
            if len(foreignKeys) > 1:
                for i in range(1, len(foreignKeys)):
                    if foreignKeys[i].lower() != row[int(referenceKeyIndexes[i])].lower():
                        allKeysGood = False
            if allKeysGood:
                return True
    return False

print("\nEnter foreign key csv (must be in same folder as this program): ")
foreign = input() + ".csv"
print("\nEnter reference csv (must be in same folder as this program): ")
reference = input() + ".csv"

foreignTable = FileIO.readCSV(foreign)
referenceTable = FileIO.readCSV(reference)

print("\n============\nForeign Keys\n============")
for i in range(len(foreignTable[0])):
    print(i, "-", foreignTable[0][i])

print("\nSelect index(es) of FOREIGN key(s), separated by space (e.g. 2 4): ")
foreignKeyIndexes = input().split()

print("\n==============\nReference Keys\n==============")
for i in range(len(referenceTable[0])):
    print(i, "-", referenceTable[0][i])

print("\nSelect index(es) of REFERENCE key(s), separated by space (e.g. 2 4): ")
referenceKeyIndexes = input().split()
referenceKeySet = generateKeySet(referenceTable, referenceKeyIndexes)

validRows = []
invalidRows = []

# copy header
validRows.append(foreignTable[0])
invalidRows.append(foreignTable[0])

for row in range(1, len(foreignTable)):
    foreignKeys = ""
    for i in foreignKeyIndexes:
        foreignKeys += foreignTable[row][int(i)].lower()

    if (foreignKeys in referenceKeySet):
        validRows.append(foreignTable[row])

    else:
        invalidRows.append(row)

FileIO.writeCSV("cleaned_" + foreign, validRows)

print("\nValid rows:", len(foreignTable) - len(invalidRows))
print("Invalid rows:", len(invalidRows) - 1, "\n")
