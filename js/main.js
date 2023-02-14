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

function renderEntry(entry) {
  var $entry = document.createElement('li');
  $entry.classList.add('entry');
  $entry.setAttribute('data-entry-id', entry.entryId);

  var $image = document.createElement('img');
  $image.classList.add('entry-image');
  $image.setAttribute('src', entry.photo);
  $entry.appendChild($image);

  var $entryContent = document.createElement('div');
  $entryContent.classList.add('entry-content');
  $entry.appendChild($entryContent);

  var $title = document.createElement('h3');
  $title.classList.add('entry-title');
  $title.textContent = entry.title;
  $entryContent.appendChild($title);

  var $notes = document.createElement('p');
  $notes.classList.add('entry-notes');
  $notes.textContent = entry.notes;
  $entryContent.appendChild($notes);

  return $entry;

}

document.addEventListener('DOMContentLoaded', function () {
  var $entryList = document.querySelector('.entry-list');
  data.entries.forEach(function (entry) {
    var $entry = renderEntry(entry);
    $entryList.appendChild($entry);
  });

});

function toggleNoEntries() {
  var $noEntries = document.querySelector('.no-entries');

  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
}
toggleNoEntries();
