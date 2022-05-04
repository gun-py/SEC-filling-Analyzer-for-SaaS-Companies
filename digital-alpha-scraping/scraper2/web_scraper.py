from bs4 import BeautifulSoup
import json
import re

class FinancialStatements():
    """
    A class to represent and scrape Financial Statements from EDGAR data files.
    Currently only supports the following forms:
    - 10K
    - 10Q

    ...

    Attributes
    ----------
    calculation_file : str
        The path to the calculation file.
    extracted_file : str
        The path to the extracted file.
    financial_statements_list : list
        A list of the financial statements in the calculation file.
    financial_statements : dict
        A dictionary of the financial statements in the calculation file with the following structure:
        {
            'table_name': {
                'period': {
                    'attrib': 'value'
                }
            }
        }
    financial_statements_attributes : dict
        A dictionary of the financial statements attributes in the calculation file with the following structure:
        {
            'table_name': {
                'attribs': ['attrib1', 'attrib2', ...],
                'attribs_lower': ['attrib1', 'attrib2', ...]
            }
        }
    context_list : list
        A list of the contexts in the extracted file.
    attributes_list : list
        A list of all the attributes in alphabetical order.
    """
    
    def __init__(self, calculation_file, extracted_file):
        """
        Parameters
        ----------
        calculation_file : str
            The path to the calculation file.
        extracted_file : str
            The path to the extracted file.

        """
        self.calculation_file = calculation_file
        self.extracted_file = extracted_file
        self.financial_statements_list = []
        self.financial_statements = {}
        self.financial_statements_attributes = {}
        self.context_list = []
        self.attributes_list = []
        
        self.get_tables()
        self.get_values()
        self.replace_context()
        
    def get_tables(self):
        """
        Scrapes the calculation file for the financial statements.
        """
        with open(self.calculation_file) as file:
            soup = BeautifulSoup(file.read(), 'lxml')
        calculation_links = soup.find_all('link:calculationlink')
        for calculation_link in calculation_links:
            table_name = calculation_link['xlink:role'].split('/')[-1].split('_')[-1]
            self.financial_statements_list.append(table_name)
            self.financial_statements[table_name] = {}
            self.financial_statements_attributes[table_name] = {'attribs':[], 'attribs_lower':[]}
            table_loc = calculation_link.find_all("link:loc")
            for i in table_loc:
                attrib =':'.join(i['xlink:label'].split('_')[:2])
                if attrib not in self.financial_statements_attributes[table_name]['attribs']:
                    self.financial_statements_attributes[table_name]['attribs'].append(attrib)
                    self.financial_statements_attributes[table_name]['attribs_lower'].append(attrib.lower())
                    if attrib not in self.attributes_list:
                        self.attributes_list.append(attrib)
            self.attributes_list.sort()
    
    def get_values(self):
        """
        Scrapes the extracted file for the value of the attributes.
        """
        with open(self.extracted_file, encoding="mbcs") as file:
            soup = BeautifulSoup(file.read(), 'lxml')
            
        for table in self.financial_statements_list:
            contextref_count = {}
            
            for attrib in self.financial_statements_attributes[table]['attribs_lower']:
                contextref_list = []
                for tag in soup.find_all(attrib.lower()):
                    if tag['contextref'] not in contextref_list:
                        contextref_list.append(tag['contextref'])
                
                contextref_list.sort()
                contextref_list = " ".join(contextref_list)
                
                if contextref_list in contextref_count:
                    contextref_count[contextref_list]+=1
                else:
                    contextref_count[contextref_list]=1
                    
            contexts, _ = max(contextref_count.items(), key = lambda k : k[1])
            contexts = contexts.split()
            
            for context in contexts:
                attributes_by_context = soup.find_all(attrs = {'contextref':context})
                period = context
                self.financial_statements[table][period] = {}
                for tag in attributes_by_context:
                    if tag.name in self.financial_statements_attributes[table]['attribs_lower']:
                        self.financial_statements[table][period][tag.name] = tag.get_text()

    def replace_context(self):
        with open(self.extracted_file) as file:
            soup = BeautifulSoup(file.read(), 'lxml')

        context_list = soup.find_all('context')

        context_dict = {}
        for context in context_list:
            instant = context.find('instant')
            if instant:
                context_dict[context['id']] ='I'+instant.get_text().replace('-', '')
            else:
                period = context.find('period')
                context_dict[context['id']] = 'D'+period.startdate.get_text().replace('-','')+'-'+period.enddate.get_text().replace('-','')
        
        new_attributes = {}

        for attrib in self.financial_statements:
            new_attributes[attrib] = {}
            for period in self.financial_statements[attrib]:
                if period in context_dict:
                    new_attributes[attrib][context_dict[period]] = self.financial_statements[attrib][period]
        self.financial_statements = new_attributes

    def save_json(self, save_file_path=None, indent=4):
        """
        Saves the financial statements to a json file.
        """
        json_file = json.dumps(self.financial_statements, indent=indent)
        if save_file_path == None:
            save_file_path = self.calculation_file.replace('cal.xml', 'statements.json')

        with open(save_file_path, 'w') as file:
            file.write(json_file)

class Attributes():
    """
    A class to represent and scrape attributes from EDGAR data files.
    Currently only supports the following forms:
    - 10K
    - 10Q

    ...

    Attributes
    ----------
    label_file : str
        The path to the label file.
    extracted_file : str
        The path to the extracted file.
    attributes : dict
        A dictionary of the attributes in the label file with the following structure:
        {
            'attrib': {
                period1: value
                period2: value
                ...
            }
        }
    attributes_list : list
        A list of all the attributes in alphabetical order.
    """

    def __init__(self, label_file, extracted_file):
        """
        Parameters
        ----------
        label_file : str
            The path to the label file.
        extracted_file : str
            The path to the extracted file.
        """
        self.label_file = label_file
        self.extracted_file = extracted_file
        self.attributes = {}
        self.attribute_list = []
        
        self.get_attributes()
        self.replace_context()

    def get_attributes(self):
        """
        Scrapes the label file for the attributes.
        """
        with open(self.label_file) as file:
            soup = BeautifulSoup(file.read(), 'lxml')
            
        label_links = soup.find_all('link:label')
        label_list = []
        for label in label_links:
            attrib = ':'.join(label['xlink:label'].split('_')[0:2]).lower()
            if (attrib not in label_list):
                label_list.append(attrib.lower())
                
        with open(self.extracted_file) as file:
            soup = BeautifulSoup(file.read(), 'lxml')
            
        def isdigit(string):
            """
            Returns True if the string is a number.
            """
            return bool(re.match(r'[-+]?(?:\d+(?:\.\d*)?|\.\d+)', string))
        
        for label in label_list:
            attrib_with_context = soup.find_all(label)

            if attrib_with_context == []:
                continue

            if isdigit(attrib_with_context[0].get_text()) == False:
                continue

            self.attributes[label] = {}
            for attrib in attrib_with_context:
                contextref = attrib['contextref']
                period = contextref
                if period not in self.attributes[label]:
                    self.attributes[label][period] = attrib.get_text()
                    
        self.attribute_list = list(self.attributes.keys())
        self.attribute_list.sort()
    
    def replace_context(self):
        with open(self.extracted_file) as file:
            soup = BeautifulSoup(file.read(), 'lxml')

        context_list = soup.find_all('context')

        context_dict = {}
        for context in context_list:
            instant = context.find('instant')
            if instant:
                context_dict[context['id']] ='I'+instant.get_text().replace('-', '')
            else:
                period = context.find('period')
                context_dict[context['id']] = 'D'+period.startdate.get_text().replace('-','')+'-'+period.enddate.get_text().replace('-','')
        
        new_attributes = {}

        for attrib in self.attributes:
            new_attributes[attrib] = {}
            for period in self.attributes[attrib]:
                if period in context_dict:
                    new_attributes[attrib][context_dict[period]] = self.attributes[attrib][period]
        self.attributes = new_attributes

    def save_json(self, save_file_path=None, indent=4):
        """
        Saves the attributes to a json file.
        """
        json_file = json.dumps(self.attributes, indent=indent)
        if save_file_path == None:
            save_file_path = self.label_file.replace('lab.xml', 'attributes.json')

        with open(save_file_path, 'w') as file:
            file.write(json_file)
            
    def __len__(self):
        return len(self.attributes)
    
    def __getitem__(self, attrib, period=None):
        if period == None:
            return self.attributes[attrib]
        return self.attributes[attrib][period]