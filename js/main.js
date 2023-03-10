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

  if (data.editing === null) {
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

  } else {
    var $editedEntry = document.querySelector(`[data-entry-id="${data.editing.entryId}"]`);
    var $image = $editedEntry.querySelector('.entry-image');
    var $entryText = $editedEntry.querySelector('.entry-text');

    data.editing.title = $title.value;
    data.editing.photo = $urlInput.value;
    data.editing.notes = $notes.value;

    $image.setAttribute('src', data.editing.photo);
    $entryText.querySelector('.entry-title').textContent = data.editing.title;
    $entryText.querySelector('.entry-notes').textContent = data.editing.notes;

    $editedEntry.replaceWith(renderEntry(data.editing));

    data.editing = null;

    viewSwap('entries');

  }

  toggleNoEntries();

  var $deleteButton = document.querySelector('.delete-button');
  $deleteButton.classList.add('hidden');
  document.querySelector('.new-entry').textContent = 'New Entry';
  $placeholder.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

});

var $newButton = document.querySelector('#show-form');
$newButton.addEventListener('click', function (event) {
  document.querySelector('.new-entry').textContent = 'New Entry';
  $placeholder.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

function renderEntry(entry) {
  var $entry = document.createElement('li');
  $entry.classList.add('row', 'entry');
  $entry.setAttribute('data-entry-id', entry.entryId);

  var $image = document.createElement('img');
  $image.className = 'entry-image column-half';
  $image.setAttribute('src', entry.photo);
  $entry.appendChild($image);

  var $entryText = document.createElement('div');
  $entryText.classList.add('entry-text', 'column-half');
  $entry.appendChild($entryText);

  var $title = document.createElement('h3');
  $title.classList.add('entry-title', 'title');
  $title.textContent = entry.title;
  $entryText.appendChild($title);

  var $pencil = document.createElement('i');
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

var $ul = document.querySelector('.entries-list');
$ul.addEventListener('click', function (event) {
  if (event.target.matches('.fa-pen')) {
    viewSwap('entry-form');
    var entryId = parseInt(event.target.closest('li').getAttribute('data-entry-id'));
    data.editing = data.entries.find(function (entry) {
      return entry.entryId === entryId;
    });

    $title.value = data.editing.title;
    $urlInput.value = data.editing.photo;
    $placeholder.setAttribute('src', data.editing.photo);
    $notes.value = data.editing.notes;

    document.querySelector('.new-entry').textContent = 'Edit Entry';
    var $deleteButton = document.querySelector('.delete-button');
    $deleteButton.classList.remove('hidden');
    var modal = document.querySelector('.modal');
    modal.classList.add('hidden');

  }

});

var $deleteButton = document.querySelector('.delete-button');
$deleteButton.addEventListener('click', function (event) {
  var modal = document.querySelector('.modal');
  var cancelButton = document.querySelector('#cancel-button');

  modal.classList.remove('hidden');

  cancelButton.addEventListener('click', function (event) {
    event.preventDefault();
    modal.classList.add('hidden');
  });

  var confirmButton = document.querySelector('#confirm-button');
  confirmButton.addEventListener('click', function (event) {
    var selectedEntryId = data.editing.entryId;
    var selectedEntryIndex = data.entries.findIndex(function (entry) {
      return entry.entryId === selectedEntryId;
    }
    );

    data.entries.splice(selectedEntryIndex, 1);

    var entryElement = document.querySelector('li[data-entry-id="' + selectedEntryId + '"]');
    entryElement.remove();

    if (data.editing === data.entries[0]) {
      toggleNoEntries();
    }

    viewSwap('entries');

  });
});
