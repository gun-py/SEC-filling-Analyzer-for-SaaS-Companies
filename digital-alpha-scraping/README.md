# Digital-Alpha-Scraping

## Requirements
Install **BeautifulSoup**
```
$ pip install bs4
```

## Usage of scraping module
```python
from scraper.web_scraper import FinancialStatements, Attributes

calculation_file = "path"
label_file = "path"
extracted_file = "path"

x = FinancialStatements(calculation_file, extracted_file)
y = Attributes(label_file, extracted_file)

x.save_json()
y.save_json()
```
## Example
### Financial Statements
```json
{
    "ConsolidatedBalanceSheets": {
        "I20211203": {
            "us-gaap:cashandcashequivalentsatcarryingvalue": "3844000000",
            "us-gaap:shortterminvestments": "1954000000",
            "us-gaap:accountsreceivablenetcurrent": "1880000000",
            "us-gaap:prepaidexpenseandotherassetscurrent": "993000000",
            "us-gaap:assetscurrent": "8669000000",
            ...
        },
        "I20201127": {
            "us-gaap:cashandcashequivalentsatcarryingvalue": "4478000000",
            "us-gaap:shortterminvestments": "1514000000",
            "us-gaap:accountsreceivablenetcurrent": "1400000000",
            "us-gaap:prepaidexpenseandotherassetscurrent": "756000000",
            "us-gaap:assetscurrent": "8146000000",
            ...
        }
    }
    ...
}

```
### Attributes
```json
{   ...
    "us-gaap:netincomeloss": {
        "D20201128-20211203": "4822000000",
        "D20191130-20201127": "5260000000",
        "D20181201-20191129": "2951000000"
    },
    "us-gaap:operatingleaserightofuseasset": {
        "I20211203": "443000000",
        "I20201127": "487000000"
    },
    ...
}
```