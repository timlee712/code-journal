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
  var listItem = document.createElement('li');
  var entryDiv = document.createElement('div');
  var entryImageDiv = document.createElement('div');
  var entryImage = document.createElement('img');
  var entryTextDiv = document.createElement('div');
  var entryTitle = document.createElement('h3');
  var entryNotes = document.createElement('p');

  listItem.appendChild(entryDiv);
  entryDiv.appendChild(entryImageDiv);
  entryImageDiv.appendChild(entryImage);
  entryDiv.appendChild(entryTextDiv);
  entryTextDiv.appendChild(entryTitle);
  entryTextDiv.appendChild(entryNotes);

  listItem.className = 'entry row';
  entryImageDiv.className = 'entry-image column-half';
  entryTextDiv.className = 'entry-text column-half';
  entryTitle.className = 'entry-title';
  entryNotes.className = 'entry-notes';

  entryImage.src = entry.photoURL;
  entryImage.alt = 'entry image';
  entryTitle.textContent = entry.title;
  entryNotes.textContent = entry.notes;

  return listItem;
}
renderEntry();
