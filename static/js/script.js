// script.js

const video = document.getElementById('video');
const captureButton = document.getElementById('capture');
const predictionsElement = document.getElementById('predictions');
const loader = document.getElementById('loader');
const videoContainer = document.getElementById('video-container');

const gestureImage = document.getElementById('gesture-image');
const nextGestureButton = document.getElementById('next-gesture');
const gestureContainer = document.getElementById('gesture-container');

let isDetecting = false;
let gestureIndex = 0;

// List of gestures with corresponding images and labels
const gestures = [
    { label: 'A', image: '/static/gestures/A.jpg' },
    { label: 'B', image: '/static/gestures/B.jpg' },
    { label: 'C', image: '/static/gestures/C.jpg' },
    { label: 'D', image: '/static/gestures/D.jpg' },
    // Add more gestures as needed
];


// Initialize the gesture image
function loadGesture(index) {
    if (index >= gestures.length) {
        gestureIndex = 0; // Reset to the first gesture
    }
    const gesture = gestures[gestureIndex];
    gestureImage.src = gesture.image;
    gestureImage.alt = 'Gesture ' + gesture.label;
    gestureContainer.classList.remove('correct');
}

// Load the first gesture on page load
loadGesture(gestureIndex);

// Access the webcam
navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
}).catch((err) => {
    alert('Could not access the camera. Please allow camera access.');
    console.error('Error accessing camera:', err);
});

// Capture frames and send to Flask server
function captureFrame() {
    if (!isDetecting) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the frame to a Base64 string
    const dataUrl = canvas.toDataURL('image/jpeg');

    // Show loader
    loader.style.display = 'block';

    // Send the captured frame to the server
    fetch('/upload_frame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: dataUrl })
    })
    .then(response => response.json())
    .then(data => {
        // Hide loader
        loader.style.display = 'none';
        // Display predictions
        if (data.predictions.length > 0) {
            predictionsElement.textContent = data.predictions.join(', ');
            // Check if the prediction matches the current gesture
            const currentGesture = gestures[gestureIndex].label;
            if (data.predictions.includes(currentGesture)) {
                // User got the gesture correct
                gestureContainer.classList.add('correct');
                // Advance to the next gesture after a short delay
                setTimeout(() => {
                    gestureIndex++;
                    loadGesture(gestureIndex);
                }, 1500);
            }
        } else {
            predictionsElement.textContent = 'No predictions found.';
        }
        // Capture next frame after a short delay
        setTimeout(captureFrame, 1000);
    })
    .catch(error => {
        console.error('Error:', error);
        loader.style.display = 'none';
        predictionsElement.textContent = 'Error during prediction.';
    });
}

// Start or stop capturing frames
captureButton.addEventListener('click', () => {
    isDetecting = !isDetecting;
    if (isDetecting) {
        captureButton.textContent = 'Stop Detection';
        predictionsElement.textContent = 'Detecting...';
        captureFrame();
    } else {
        captureButton.textContent = 'Start Detection';
        predictionsElement.textContent = 'Detection stopped.';
        loader.style.display = 'none';
    }
});

// Skip to the next gesture manually
nextGestureButton.addEventListener('click', () => {
    gestureIndex++;
    loadGesture(gestureIndex);
});

