// https://teachablemachine.withgoogle.com/models/oL9mfpM6X/

Webcam.set({
    width: 350,
    height:300,
    image_format:'png',
    png_quality:90
})

camera = document.getElementById('camera')
Webcam.attach('#camera')

function take_snapshot() {
    Webcam.snap(function(data_url) {
        document.getElementById('result').innerHTML = `<img id="captured_image" src="${data_url}"/>`
    })
}

console.log('ml5 version:', ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/oL9mfpM6X/model.json', modelLoaded)

function modelLoaded() {
    console.log('Model Loaded')
}

function speak() {
    var synth = window.speechSynthesis
    speak_data_1 = "The first prediction is "+ prediction_1
    speak_data_2 = "And the second prediction is "+prediction_2
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2)
    synth.speak(utterThis)
}
function check() {
    img = document.getElementById('captured_image')
    classifier.classify(img, gotResult)
}

function gotResult(error,results) {
    if (error){
        console.error(error)
    }
    else{
        document.getElementById('gesture_name').innerHTML = results[0].label
        document.getElementById('gesture_name2').innerHTML = results[1].label
        prediction_1 = results[0].label
        prediction_2 = results[1].label
        speak()
        if (prediction_1 == "Best"){
            document.getElementById('update_gesture').innerHTML = "&#128077"
        }
        if (prediction_1 == "Victory"){
            document.getElementById('update_gesture').innerHTML = "&#9996"
        }
        if (prediction_1 == "Amazing"){
            document.getElementById('update_gesture').innerHTML = "&#128076"
        }
        if (prediction_2 == "Best"){
            document.getElementById('update_gesture2').innerHTML = "&#128077"
        }
        if (prediction_2 == "Victory"){
            document.getElementById('update_gesture2').innerHTML = "&#9996"
        }
        if (prediction_2 == "Amazing"){
            document.getElementById('update_gesture2').innerHTML = "&#128076"
        }
    }
}