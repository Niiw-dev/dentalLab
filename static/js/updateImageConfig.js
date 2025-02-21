function updateImage(event) {
    var reader = new FileReader();
    reader.onload = function () {
        document.getElementById('profilePicture').style.backgroundImage = 'url(' + reader.result + ')';
    };
    reader.readAsDataURL(event.target.files[0]);
}