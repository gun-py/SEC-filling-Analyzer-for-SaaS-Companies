from pickle import load
from unittest.loader import VALID_MODULE_NAME
import json
import pandas as pd

dict_features={'txt':'comprehensiveincomenetoftax','csho':'commonstocksharesauthorized',
                'act':'assetscurrent','ni':'netincomeloss','xint':'incometaxexpensebenefit',
                'lct':'liabilitiescurrent','at':'assets','cogs':'costofgoodsandservicessold',
                'ni':'netincomeloss','lt':'liabilities',
                'ap':'accountspayablecurrent','ppegt':'propertyplantandequipmentnet',
                'rect':'billedcontractreceivables','pstk':'preferredstockvalue'}
dict_X={'txt':0,'csho':0,
                'act':0,'ni':0,'xint':0,
                'lct':0,'at':0,'cogs':0,
                'ni':0,'lt':0,
                'ap':0,'ppegt':0,
                'rect':0,'pstk':0}

def process_data(file):
    fl=open(file,'r')
    data=json.load(fl)
    scalar = load(open('scaler.pkl', 'rb'))
    for key,val in zip(list(data.keys()),list(data.values())):
        for j,v in zip(list(dict_features.values()),list(dict_features.keys())):
            # print("j is = ",j," key is = ",key.split(':')[1])
            if j==key.split(':')[1]:
                try:
                    vl=val[list(val.keys())[0]]
                    dict_X[v]=int(vl)/100
                except:
                    pass

    X=pd.DataFrame(dict_X,index=[0])

    scaled_testing = scalar.transform(X)

    # scaled_test = scalar.fit_transform(test_data_df)

    scaled_testing_df = pd.DataFrame(data = scaled_testing, columns=X.columns)
    scaled_testing_df.fillna(0)
    print("Returned Data shape = ",scaled_testing_df.shape)

    
    return scaled_testing_df.values