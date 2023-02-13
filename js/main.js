var $placeholder = document.querySelector('.placeholder-image');
var $urlInput = document.querySelector('.photo');

$urlInput.addEventListener('input', function () {
  $placeholder.src = $urlInput.value;
});
