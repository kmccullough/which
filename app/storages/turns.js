import StorageArray from 'ember-local-storage/local/array';

const Storage = StorageArray.extend();

Storage.reopenClass({
  initialState() {
    return [
      {
        name: 'Boolean',
        options: [ 'No', 'Yes' ],
        algorithm: 'random',
        spread: 0,
      }
    ];
  }
});

export default Storage;
