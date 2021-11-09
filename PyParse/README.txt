PyParse contains a number of tools to clean, parse, and verify datasets prior to pushing to AWS RDS.
The motivation for these tools is that Datagrip takes an extremely long time to parse and upload datasets that contain errors, such as missing foreign key references.
The tools in PyParse can clean up and verify datasets at a much faster rate.

A brief description of each tool follows.

1) Column Parser
Allows user to select and reorder columns in a csv file. This is useful for csv files that are too big to open in Excel.
A new file is written to disk containing only the selected columns in the specified order.

2) Verify Key References
This tool checks if the keys and foreign keys between two tables match.
Uses psuedo-Huffman coding and hashing to execute the checks at substantially higher rate than Datagrip.
Only valid rows (i.e. where the foreign keys and keys are aligned) are kept. The cleaned dataset containing only valid rows is written to disk.

3) Compare Columns
Takes two tables as input and the user specifies the columns to compare. A set is created for the specified column from each table and compared.

4) Compare CSV
Checks if every field is identical between two .csv files.

5) FileIO
Simple csv reader/writer.

6) Update Attribute
Displays all tables from the database for the user to choose from. Then, user selects key and attribute to be updated. Next, user specifies csv with the new values and specifies the key and new value columns. Finally, the tool updates the database with these new values.

7) Retrieve Individual Tags
Retrieves all the tags from the Attraction and Restaurant tables in the database and puts them into sets, so as to extract distinct individual tags.
The individual tags are written to csv files - one for Attraction, and another for Restaurant.
