import FileIO

def getKeys(table, index):
    keys = set()
    for row in table:
        keys.add(row[index])

    return keys

def allReferenceKeysExist(referenceKeySet, foreignKeys):
    for i in range(len(foreignKeys)):
        if foreignKeys[i] not in referenceKeySet[i]:
            return False

    return True


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

referenceKeys = []
for i in referenceKeyIndexes:
    keySet = getKeys(referenceTable, int(i))
    referenceKeys.append(keySet.copy())

cleanedForeignTable = []
offendingRows = []

for row in range(len(foreignTable)):
    foreignKeys = []
    for i in foreignKeyIndexes:
        foreignKeys.append(foreignTable[row][int(i)])

    if (allReferenceKeysExist(referenceKeys, foreignKeys)):
        cleanedForeignTable.append(foreignTable[row])

    else:
        offendingRows.append(row)

FileIO.writeCSV("cleaned_" + foreign, cleanedForeignTable)

print("\nInvalid rows:", len(offendingRows))
print("Valid rows:", len(foreignTable) - len(offendingRows) - 1, "\n")