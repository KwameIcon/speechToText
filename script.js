document.addEventListener("DOMContentLoaded", () => {
  // get reference to the html elements
  const speakingImage = document.querySelector(".image");
  const startBtn = document.querySelector(".startbtn");
  const stopBtn = document.querySelector(".stopbtn");
  const outputField = document.getElementById("outputField");

  // on page load, blur the visibility of the stop button
  stopBtn.classList.add("setOpacity");

  // Check whether the browser supports the speechRecognition API
  if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    // create a new instance of the SpeechRecognition API
    let recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();

    // calling the interim property and setting it to true
    recognition.interimResults = true;

    // keep track of the state of the speech recognition
    let isListening = false;
    let lastResults = "";
    let transcript = "";

    // add an eventListener to the start button
    startBtn.addEventListener("click", () => {
      if (!isListening) {
        recognition.start();
        startBtn.classList.add("setOpacity");
        stopBtn.classList.remove("setOpacity");
        isListening = true;
        speakingImage.style.display = "block";
      }
    });

    // add eventListener to the stop button
    stopBtn.addEventListener("click", () => {
      if (isListening) {
        recognition.stop();
        startBtn.classList.remove("setOpacity");
        stopBtn.classList.add("setOpacity");
        isListening = false;
        speakingImage.style.display = "";
      }
    });

    // add eventListener to the results event of the speech recognition
    recognition.addEventListener("result", (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      // append only the new portion of the transcript
      const newTranscript = transcript.substring(lastResults.length);
      if (newTranscript.trim() !== "") {
        outputField.textContent += newTranscript;
      }
      lastResults = transcript;
    });

    // add eventListener to the end event of the speech recognition
    recognition.addEventListener("end", () => {
      if (isListening) {
        recognition.start();
      }
    });
  } else {
    alert(
      `Oops! Your browser does not support the SpeechRecognition API. Consider using a different browser to try.`
    );
  }
});
