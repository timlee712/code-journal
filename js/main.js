var $placeholder = document.querySelector('.placeholder-image');
var $urlInput = document.querySelector('.photo');

$urlInput.addEventListener('input', function (event) {
  $placeholder.setAttribute('src', event.target.value);
});

var $form = document.querySelector('.entry-form');

var $title = document.querySelector('.title');
var $notes = document.querySelector('.notes');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var inputValues = {};
  inputValues.entryId = data.nextEntryId;
  inputValues.title = $title.value;
  inputValues.photo = $urlInput.value;
  inputValues.notes = $notes.value;

  data.entries.push(inputValues);
  data.nextEntryId++;

  $placeholder.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

});
