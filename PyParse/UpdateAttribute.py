import FileIO
import mysql.connector

def getAllTables(cursor):
    cursor.execute(
        "SHOW Tables"
    )
    tables = []
    for col in cursor.fetchall():
        table = str(col[0]).split("'")
        tables.append(table[1])
    return tables

def getTableSchema(cursor, tableName):
    schema = []
    cursor.execute(
        "SHOW COLUMNS FROM " + tableName
    )
    for col in cursor.fetchall():
        schema.append(col[0])
    return schema

db = mysql.connector.connect(
  host = "cis550-groupproject.cmnyi6tdsaqq.ap-northeast-1.rds.amazonaws.com",
  user = "admin",
  password = "cis550DBA",
  db = "SeeQoolPlaces"
)
sql = db.cursor()

tables = getAllTables(sql)
print("\n======\nTables\n======")
for i in range(len(tables)):
    print(i, "-", tables[i])

print("\nEnter index of table to be updated: ")
targetTableIndex = int(input())
targetTable = tables[targetTableIndex]

schema = getTableSchema(sql, targetTable)
print("\n======\nSchema\n======")
for i in range(len(schema)):
    print(i, "-", schema[i])

print("\nSelect indexes of primary key and attribute to be updated, separated by space (e.g. 0 4): ")
tableKeyValue = input().split()
primaryKey = schema[int(tableKeyValue[0])]
targetAttribute = schema[int(tableKeyValue[1])]
print("Key =", primaryKey, ", Attribute =", targetAttribute)

print("\nEnter csv containing key and new attribute values (must be in same folder as this program): ")
newValuesFile = input() + ".csv"
newValues = FileIO.readCSV(newValuesFile)

print("\n======\nHeader\n======")
for i in range(len(newValues[0])):
    print(i, "-", newValues[0][i])

print("\nSelect indexes of primary key and new value, separated by space (e.g. 0 4): ")
keyValueIndexes = input().split()

print("\nUpdating database. Might take a few minutes...")
rowsUpdated = 0
for row in range(1, len(newValues)):
    print("Updating row", row + 1, "of", len(newValues), end='\r')
    try:
        targetKey = newValues[row][int(keyValueIndexes[0])]
        newValue = newValues[row][int(keyValueIndexes[1])]
        if (targetKey != "") and (newValue != ""):
            if (newValue.isnumeric() == False) and (newValue.lower() != "true") and (newValue.lower() != "false"):
                newValue = "\"" + newValue + "\""
            query = "UPDATE " + targetTable + " SET " + targetAttribute + " = " + newValue + " WHERE " + primaryKey + " = " + targetKey
            sql.execute(query)
            db.commit()
            rowsUpdated += 1
    except IndexError as e:
        print("Ignored \"list index out of range\" error in row", row)
        continue

print("\nDone!! Updated", rowsUpdated, "rows.\n")