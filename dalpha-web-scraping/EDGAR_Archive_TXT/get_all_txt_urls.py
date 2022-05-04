from tqdm import tqdm
import requests

ciks = [1459417.0, 1118974.0, 1556753.0, 1580808.0, 935036.0, 1085621.0, 1119691.0, 1342936.0, 1407847.0, 78749.0, 1459200.0, 1389217.0, 1689923.0, 1540755.0, 
        1013462.0, 1433195.0, 1441683.0, 873198.0, 1543739.0, 1477720.0, 884144.0, 1362190.0, 769397.0, 8670.0, 1348036.0, 1348334.0, 1031308.0, 849547.0, 1280058.0, 
        1567900.0, 1666134.0, 1073349.0, 1624512.0, 1449574.0, 1378590.0, 1341878.0, 1054721.0, 1088316.0, 813672.0, 1609702.0, 1022505.0, 877890.0, 827876.0, 
        1393548.0, 1582589.0, 1535379.0, 1477333.0, 1613011.0, 1103759.0, 1169561.0, 1401680.0, 1385867.0, 1535527.0, 1522787.0, 1084577.0, 1561550.0, 1133598.0, 
        1487906.0, 317788.0, 1261333.0, 1505952.0, 1467623.0, 1540400.0, 814549.0, 1437491.0, 1066194.0, 1088242.0, 900096.0, 813747.0, 1337619.0, 1437352.0, 1052054.0, 
        943894.0, 814547.0, 922521.0, 1653115.0, 1517413.0, 1288847.0, 1262039.0, 1451951.0, 1064722.0, 1020475.0, 1159464.0, 944480.0, 1682325.0, 1528396.0, 1021435.0, 
        1404655.0, 1031905.0, 941685.0, 714278.0, 1081745.0, 1285170.0, 736012.0, 896878.0, 829323.0, 1455926.0, 727634.0, 843006.0, 1397183.0, 1084048.0, 1006892.0, 
        1562594.0, 1102993.0, 1056696.0, 1389002.0, 1353499.0, 1540184.0, 1001601.0, 789019.0, 1050446.0, 807863.0, 1576914.0, 1470099.0, 1441816.0, 1423746.0, 1566895.0, 
        1022701.0, 1039280.0, 1031980.0, 1002517.0, 1618732.0, 1660134.0, 1020579.0, 1568100.0, 1017655.0, 1327567.0, 1084384.0, 50471.0, 879703.0, 723531.0, 1590955.0, 
        1591698.0, 1013857.0, 1603498.0, 1124217.0, 876167.0, 1212458.0, 1392972.0, 857005.0, 1583138.0, 1410384.0, 1036188.0, 892482.0, 1384365.0, 852437.0, 1046327.0, 
        1286225.0, 1506270.0, 1384905.0, 1351285.0, 1108524.0, 1158019.0, 1019671.0, 1468666.0, 1373715.0, 1506439.0, 846775.0, 1301991.0, 1366561.0, 948708.0, 354260.0, 
        1029744.0, 1353283.0, 1517375.0, 1092699.0, 1501919.0, 1643269.0, 1131554.0, 883241.0, 1389067.0, 1660280.0, 816761.0, 1066684.0, 1085280.0, 1554875.0, 939652.0, 
        1671933.0, 1447669.0, 860731.0, 1016125.0, 835270.0, 1505155.0, 1361113.0, 1393052.0, 1166388.0, 1615165.0, 1082324.0, 1479000.0, 1100981.0, 1445305.0, 1465509.0, 
        1511735.0, 1614178.0, 1463172.0, 855612.0, 1541054.0, 1423774.0]

base_url = r"https://www.sec.gov/Archives/edgar/data"

def make_url(base_url , comp):
    url = base_url
    for r in comp:
        url = '{}/{}'.format(url, r)    
    return url

for cik_num in tqdm(ciks):
    cik_num = str(cik_num)
    filings_url = make_url(base_url, [cik_num, 'index.json'])
    content = requests.get(filings_url, headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    decoded_content = content.json()

    text_urls = []

    for filing_number in decoded_content['directory']['item']:    
        if int(filing_number['last-modified'].split(' ')[0].split('-')[0]) >= 2019:
            filing_num = filing_number['name']
            filing_url = make_url(base_url, [cik_num, filing_num, 'index.json'])
            content = requests.get(filing_url, headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
            document_content = content.json()
            for document in document_content['directory']['item']:
                document_name = document['name']
                filing_url = make_url(base_url, [cik_num, filing_num, document_name])
                if filing_url.split('.')[-1] == 'txt':
                    text_urls.append(filing_url)

    textfile = open(cik_num + "_txt_urls.txt", "w")
    for element in text_urls:
        textfile.write(element + "\n")
    textfile.close()