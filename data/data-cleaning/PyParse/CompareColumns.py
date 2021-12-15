import csv

def compareCol(csv1, csv2):
    
    col1 = []
    col2 = []

    with open(csv1) as table1:
        table1Reader = csv.reader(table1)
        for line in table1Reader:
            col1.append(line)

    with open(csv2) as table2:
        table2Reader = csv.reader(table2)
        for line in table2Reader:
            col2.append(line)

    print("\n===============\nTable 1 Header:\n===============")
    i = 0
    for attribute in col1[0]:
        print(i, "-", attribute)
        i += 1

    print("\n===============\nTable 2 Header:\n===============")
    j = 0
    for attribute in col2[0]:
        print(j, "-", attribute)
        j += 1

    print("\nSelect one index from each table to compare, separated by space (e.g. 1 5): ")
    compare = input().split()

    print("\nComparing Table 1 -", col1[0][int(compare[0])], "with Table 2 -", col2[0][int(compare[1])])

    set1 = set()
    i = 0
    for row1 in col1:
        if (i > 0):
            set1.add(col1[i][int(compare[0])])
        i += 1

    set2 = set()
    j = 0
    for row2 in col2:
        if (j > 0):
            set2.add(col2[j][int(compare[1])])
        j += 1

    print("\nSet sizes: Table 1 =", len(set1), ", Table 2 =", len(set2))
    print("Common values:", len(set1.intersection(set2)))
    print("In Set 1, but not Set 2:", len(set1.difference(set2)))
    print("In Set 2, but not Set 1:", len(set2.difference(set1)))


print("Enter 1st .csv filename (must be in same folder as this program): ")
csv1 = input() + ".csv"
print("Enter 2nd .csv filename (must be in same folder as this program): ")
csv2 = input() + ".csv"
compareCol(csv1, csv2)