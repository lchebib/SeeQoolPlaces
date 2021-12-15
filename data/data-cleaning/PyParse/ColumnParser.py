import FileIO

while (True):
    print("\n=============\nParse New CSV\n=============")
    print("\nEnter INPUT .csv filename without extension (must be in the same folder as this program): ")
    inputFilename = input() + ".csv"
    print("\nEnter OUTPUT .csv filename without extension (must be in the same folder as this program): ")
    outputFilename = input() + ".csv"
    # parseDataset(inputFilename, outputFilename)

    inputCSV = FileIO.readCSV(inputFilename)

    print("\n=======\nHeaders\n=======")
    for i in range(len(inputCSV[0])):
        print(i, "-", inputCSV[0][i])

    print("\nEnter attributes to keep, in order, separated by spaces (e.g. 2 1 3): ")
    cols = input().split()

    outputFileContents = []
    try:
        for row in inputCSV:
            line = []
            for col in cols:
                line.append(row[int(col)])
            outputFileContents.append(line.copy())
    except:
        print("\nError in row:", row)

    FileIO.writeCSV(outputFilename, outputFileContents)

    print("\nDone!!\n")