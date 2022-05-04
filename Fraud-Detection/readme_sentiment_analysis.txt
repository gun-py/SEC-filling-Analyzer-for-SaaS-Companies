The module consists of 3 files
1. generic_parser.py
2. MOD_Load_MasterDictionary_v2022.py
3. Loughran-McDonald_MasterDictionary_1993-2021.csv


To perform sentiment analysis on any given text file(8-K,10-K) place the file in a folder (<folder_name>) and set the "TARGET_FILES" variable
of the (generic_parser.py) to that folder name.

Eg. If folder name is "fold"
    Then TARGET_FILES="fold/*.*"

Place all of the three mentioned files in the same directory

Run the generic_parser.py to get the results of sentiment analysis of the files present in the targeted folder.
The output will be present in a folder ("output") in a file "parser.csv".

The parser.csv provides a description of the whole text file in form of 6 variables (% negative, %positive, %uncertain, %litigious, %string modal, %constraining).
The categorization is done using the "Loughran-McDonald_MasterDictionary_1993-2021.csv" dictionary .
Each word in the text is extrated and is categorized into a specific category.

 