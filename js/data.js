/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
window.addEventListener('beforeunload', function () {
  JSON.stringify(data);
  this.localStorage.setItem(data);
});

if (localStorage.getItem(data)) {
  data = localStorage.parse(data);
}
