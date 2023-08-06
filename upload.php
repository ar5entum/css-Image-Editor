<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
  $targetDir = 'images/';
  $targetFile = $targetDir . basename($_FILES['file']['name']);
  $uploadOk = true;
  $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

  if (isset($_POST['submit'])) {
    $check = getimagesize($_FILES['file']['tmp_name']);
    if (!$check) {
      echo 'File is not an image.';
      $uploadOk = false;
    }
  }

  if (file_exists($targetFile)) {
    echo 'File already exists.';
    $uploadOk = false;
  }

  if ($_FILES['file']['size'] > 500000) {
    echo 'File is too large.';
    $uploadOk = false;
  }

  if ($imageFileType !== 'jpg' && $imageFileType !== 'png' && $imageFileType !== 'jpeg' && $imageFileType !== 'gif') {
    echo 'Only JPG, JPEG, PNG, and GIF files are allowed.';
    $uploadOk = false;
  }

  if ($uploadOk) {
    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
      echo 'File uploaded successfully.';
    } else {
      echo 'Error uploading the file.';
    }
  }
}
?>
