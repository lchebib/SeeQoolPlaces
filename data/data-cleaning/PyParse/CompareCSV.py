import FileIO

def checkEquivalence(csv1, csv2):
    if len(csv1) == len(csv2):
        for row in range(len(csv1)):
            if len(csv1[row]) == len(csv2[row]):
                for col in range(len(csv1[row])):
                    if csv1[row][col] != csv2[row][col]:
                        print("\nContent in (", row, ",", col, "don't match")
                        return False
            else:
                print("\nNumber of cols in row", row, "don't match")
                return False
    else:
        print("\nNumber of rows don't match")
        return False

    return True

print("csv1 filename: ")
csv1Filename = input() + ".csv"
print("csv2 filename: ")
csv2Filename = input() + ".csv"

csv1 = FileIO.readCSV(csv1Filename)
csv2 = FileIO.readCSV(csv2Filename)

if checkEquivalence(csv1, csv2):
    print("CSV contents are identical")

else:
    print("CSV contents do not match")