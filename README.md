### Won the winner on education track: https://devpost.com/software/msign

Here are some documentation along developing:
### GOALs:
- video and text translator/text to video
- gui improvements
- more letters 
- data collection
### pitch:
1. Mostly, there are apps or learning sites that comes in handy when I want to learn a language, to communicate with different language users. But how about sign language. If you want to say hello to someone that uses sign languages. you actually want talk to him. But you even don't know what is the gesture for thankyou, or you are welcome. Well, here comes the MSign, it is a light weighted sign language interative learning site. Whenever you want to learn some sign language, click!
2. Go ahead and play around if you will. You can see on the top there is a search area. if you want to know what a particular phrase or letter mean, you can search here; Also, there is a webcam that can capture your sign and spit out the prediction by the model. On the button of the webcam is a start learning botton, hitting on it, there will be flash cards on the side. you will be learning the sign gestures interactively. This will give a far better effect than searching on youtube and watching videos.
4. there are tone of area where this web can be further improved.
5. In the future, i would want to have the sign to text translator work. I didn't find any suitable api for this. We can either train it using the WLASL dataset to train our own model. 
6. Also, for further improvement, the sign detections is based on a model training on 500 images, thus not performing that accurately. Also, it really depends on the environment of the users like lightings and background. I would want to use cv2 to further extract out the hand gesture part and train and predict model on it. Or, I can use the landmark features provided by sign language translator api to extract it into kinetic movement.
7. Also, I would also want to deploy a live translator inside for users to play around. 
