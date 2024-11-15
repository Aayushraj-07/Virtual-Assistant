// Select the button, content, and voice elements from the HTML using their IDs
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

/**
 * Speak function - Converts text into speech using the Web Speech API.
 * @param {string} text - The text to be converted to speech.
 */
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text); // Create a new SpeechSynthesisUtterance object
    text_speak.rate = 0.9; // Set the speed of speech
    text_speak.pitch = 0.1; // Set the pitch of speech
    text_speak.volume = 1; // Set the volume
    text_speak.lang = "en-GB"; // Set the language to British English
    window.speechSynthesis.speak(text_speak); // Speak the text
}

/**
 * WishMe function - Greets the user based on the current time of the day.
 */
function wishMe() {
    let day = new Date(); // Get the current date and time
    let hours = day.getHours(); // Get the current hour
    if (hours >= 0 && hours < 12) {
        speak("Good Morning "); // Morning greeting
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon "); // Afternoon greeting
    } else {
        speak("Good Evening "); // Evening greeting
    }
}

// Add an event listener to the window that runs the WishMe function when the page loads
window.addEventListener('load', () => {
    wishMe();
});

// Speech recognition setup
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // Check for browser compatibility
let recognition = new speechRecognition(); // Create a new instance of SpeechRecognition

/**
 * On recognition result event - Processes the recognized speech.
 * @param {object} event - The event containing recognition results.
 */
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex; // Get the index of the current result
    let transcript = event.results[currentIndex][0].transcript; // Get the recognized speech
    content.innerText = transcript; // Display the recognized speech in the content element
    takeCommand(transcript.toLowerCase()); // Pass the transcript to the takeCommand function
};

// Add an event listener to the button for starting speech recognition
btn.addEventListener("click", () => {
    recognition.start(); // Start speech recognition
    voice.style.display = "block"; // Show the voice animation
    btn.style.display = "none"; // Hide the button
});

/**
 * TakeCommand function - Handles the user's spoken commands and performs actions accordingly.
 * @param {string} message - The recognized speech message.
 */
function takeCommand(message) {
    voice.style.display = "none"; // Hide the voice animation
    btn.style.display = "flex"; // Show the button

    // Check for various commands and respond accordingly
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello, what can I help you?");
    } else if (message.includes("what is your name?")) {
        speak("I am a virtual assistant, created by Ayush Raj using HTML, CSS, and JavaScript.");
    } else if (message.includes("who are you?")) {
        speak("I am Siri.");
    } else if (message.includes("how are you?")) {
        speak("I am good, what about you?");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank"); // Open YouTube in a new tab
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank"); // Open Google in a new tab
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com/", "_blank"); // Open Facebook in a new tab
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank"); // Open Instagram in a new tab
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://"); // Attempt to open calculator
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://"); // Attempt to open WhatsApp
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" }); // Get current time
        speak(time); // Speak the current time
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" }); // Get current date
        speak(date); // Speak the current date
    } else {
        // If no predefined command matches, perform a Google search for the query
        let finalText = "This is what I found on the internet regarding " + message.replace("siri", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("siri", "")}`, "_blank");
    }
}
