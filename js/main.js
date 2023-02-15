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

  data.entries.unshift(inputValues);
  data.nextEntryId++;

  var $entryList = document.querySelector('.entries-list');

  var $newEntryDOM = renderEntry(inputValues);
  $entryList.prepend($newEntryDOM);

  viewSwap('entries');

  toggleNoEntries();

  $placeholder.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

});

function renderEntry(entry) {
  var $entry = document.createElement('li');
  $entry.classList.add('row');
  $entry.setAttribute('data-entry-id', entry.entryId);

  var $image = document.createElement('img');
  $image.className = 'entry-image column-half';
  $image.setAttribute('src', entry.photo);
  $entry.appendChild($image);

  var $entryText = document.createElement('div');
  $entryText.classList.add('entry-text', 'column-half');
  $entry.appendChild($entryText);

  var $title = document.createElement('h3');
  $title.classList.add('entry-title');
  $title.textContent = entry.title;
  $entryText.appendChild($title);

  var $pencil = document.createElement('span');
  $pencil.classList.add('fa-solid', 'fa-sharp', 'fa-pen');
  $title.appendChild($pencil);

  var $notes = document.createElement('p');
  $notes.classList.add('entry-notes');
  $notes.textContent = entry.notes;
  $entryText.appendChild($notes);

  return $entry;

}

document.addEventListener('DOMContentLoaded', function () {
  var $entryList = document.querySelector('.entries-list');
  data.entries.forEach(function (entry) {
    var $entry = renderEntry(entry);
    $entryList.appendChild($entry);
  });

  viewSwap(data.view);
  toggleNoEntries(data.entries.length);
});

function toggleNoEntries() {
  var $noEntries = document.querySelector('.no-entries');

  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
}

function viewSwap(viewName) {
  var $entryList = document.querySelector('.entry-list');
  var $entryForm = document.querySelector('.entry-form');

  if (viewName === 'entries') {
    $entryList.classList.remove('hidden');
    $entryForm.classList.add('hidden');
    data.view = 'entries';
  } else if (viewName === 'entry-form') {
    $entryList.classList.add('hidden');
    $entryForm.classList.remove('hidden');
    data.view = 'entry-form';
  }
  toggleNoEntries();
}

var $viewEntriesLink = document.querySelector('#view-entries');

$viewEntriesLink.addEventListener('click', function (event) {
  event.preventDefault();
  viewSwap('entries');
});

var $showForm = document.querySelector('#show-form');

$showForm.addEventListener('click', function (event) {
  event.preventDefault();
  viewSwap('entry-form');
});
