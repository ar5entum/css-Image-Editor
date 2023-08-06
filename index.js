document.addEventListener("DOMContentLoaded", function () {
  const brightnessSlider = document.getElementById("brightnessSlider");
  const contrastSlider = document.getElementById("contrastSlider");
  const dropArea = document.getElementById("dropArea");
  const exportBtn = document.getElementById("export");

  // Initial brightness and contrast values
  let brightnessValue = 100;
  let contrastValue = 100;

  // Update the image style when sliders are changed
  brightnessSlider.addEventListener("input", function () {
    brightnessValue = this.value;
    updateImageStyle();
  });

  contrastSlider.addEventListener("input", function () {
    contrastValue = this.value;
    updateImageStyle();
  });

  // Function to update image style with current brightness and contrast values
  function updateImageStyle() {
    dropArea.style.filter = `brightness(${brightnessValue}%) contrast(${contrastValue}%)`;
  }
});

// Prevent default behavior when dragging files over the drop area
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.style.backgroundColor = "#777";
});

// Restore background color when dragging leaves the drop area
dropArea.addEventListener("dragleave", () => {
  dropArea.style.backgroundColor = "transparent";
});

// Handle dropped files
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.style.backgroundColor = "transparent";

  const file = e.dataTransfer.files[0];
  console.log(file);
  displayImage(file);
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  displayImage(file);
});

var imageURL;
// Function to display the selected image
function displayImage(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    // editedImage.src = event.target.result;
    // editedImage.style.display = "block";
    imageURL = event.target.result;
    dropArea.style.backgroundImage = `url('${imageURL}')`;
  };
  reader.readAsDataURL(file);
  dropArea.style.backgroundImage = `url(${reader.result})`;
}

function processImage() {
  var fileInput = document.getElementById("fileInput");
  var file = fileInput.files[0];
  var formData = new FormData();
  formData.append("file", file);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log("File uploaded successfully!");
      } else {
        console.log("Error uploading file.");
      }
    }
  };
  xhr.open("POST", "upload.php", true);
  xhr.send(formData);
}
