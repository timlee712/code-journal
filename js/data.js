/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
window.addEventListener('beforeunload', function () {
  var dataStringify = JSON.stringify(data);
  this.localStorage.setItem('data', dataStringify);
});

if (localStorage.getItem('data')) {
  data = JSON.parse(localStorage.getItem('data'));
}
