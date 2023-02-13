/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function () {
  this.localStorage.setItem(data);
  JSON.stringify(data);
});
