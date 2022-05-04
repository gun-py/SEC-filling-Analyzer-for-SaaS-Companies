import os
from matplotlib.pyplot import yticks
import numpy as np
import tensorflow as tf
import semi_preprocess as make_data
import googleapiclient.discovery

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="cred.json"
CLOUD_PROJECT = 'digital-alpha'
BUCKET = 'gs://' + CLOUD_PROJECT + '-tf2-models'

def predict_json(project, model, instances, version=None):

    service = googleapiclient.discovery.build('ml', 'v1')
    name = 'projects/{}/models/{}'.format(project, model)

    if version is not None:
        name += '/versions/{}'.format(version)

    response = service.projects().predict(
        name=name,
        body={'instances': instances}
    ).execute()

    if 'error' in response:
        raise RuntimeError(response['error'])

    return response['predictions']

def predict_fraud(instance):
    instance=make_data.process_data(instance)
    if len(instance.shape)==1:
        instance=np.reshape(instance,(1,-1))
    preds=predict_json(CLOUD_PROJECT, 'fraud_less_features',instance.tolist())
    # y=[]
    # for dict in preds:
    #     for key in list(dict.keys()):
    #         y.append(dict[key][0])
    return preds

    

