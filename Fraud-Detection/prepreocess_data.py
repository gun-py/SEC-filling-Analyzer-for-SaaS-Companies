from pickle
from pickle import load
import pandas as pd

def process_data(data):
    scalar = load(open('scaler.pkl', 'rb'))
    X=data.drop('misstate' ,axis=1)
    scaled_testing = scalar.transform(X)

    # scaled_test = scalar.fit_transform(test_data_df)

    scaled_testing_df = pd.DataFrame(data = scaled_testing, columns=X.columns)
    scaled_testing_df=pd.concat([scaled_testing_df,data['misstate']],axis=0)

    try:
        scaled_testing_df=scaled_testing_df.drop(columns=['p_aaer','new_p_aaer'])
    except:
        print('Columns does not exists ')
    
    return scaled_testing_df