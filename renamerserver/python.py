import requests
import sys
import pyrebase
import json
import os
import re
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.applications.vgg16 import preprocess_input
from keras.applications.vgg16 import decode_predictions
from keras.applications.vgg16 import VGG16
import statistics


model = VGG16()

def load_image(filename):
    image = load_img(filename, target_size=(224, 224))

    return image


def convert_image(image):
    image = img_to_array(image)
    image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))
    image = preprocess_input(image)
    probabilities = model.predict(image)
    return probabilities

def get_name(prob):
    label = decode_predictions(prob)
    label = label[0][0]
    renamed = ('%s (%.2f%%)' % (label[1], label[2]*100))

    return renamed



directory = json.loads(sys.argv[1])
#directory = 'C:/Users/udith/Desktop/test'



file_paths = []
for root, directories, files in os.walk(directory):
   for filename in files:
        filepath = os.path.join(root, filename)
        this = filepath.replace('\\','/')
        file_paths.append(this)  
filename = file_paths

post_names = []
percentage_list = []
for i in filename:
    image = load_image(i)
    prob = convert_image(image)
    defin = get_name(prob)
    percentage = re.search(r'\((.*?)\)',defin).group(1)
    clean_percentage = percentage.replace("%","")
    percentage_list.append(clean_percentage)
    defin = defin.replace('(','')
    defin = defin.replace(')','')
    defin = defin.replace(' ','')
    defin = defin.replace('%','')
    defin = defin.replace('.','')
    defin = ''.join([i for i in defin if not i.isdigit()])
    new_image = '/'+defin+'.jpg'
    old_path = os.path.dirname(i)
    new_image_path = old_path+new_image
    post_names.append(new_image_path)



config = {
  "apiKey": "AIzaSyBwAoFjqObWRLKp3LiOYUMGhd2XbUG2LvM",
  "authDomain": "renamer-app.firebaseapp.com",
  "databaseURL": "https://renamer-app.firebaseio.com",
  "storageBucket": "renamer-app.appspot.com"
}
print(post_names)
joined_paths = filename+post_names


firebase = pyrebase.initialize_app(config)
db = firebase.database()
firebase_old_paths = joined_paths
db.child('/path').set(firebase_old_paths)
percentage_list = list(map(float, percentage_list))
accuracy = statistics.mean(percentage_list)
accuracy = round(accuracy,2)
db.child('/accuracy').set(accuracy)





    
        
