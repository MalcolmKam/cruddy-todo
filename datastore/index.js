const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

// var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

//       Todo.create(text, addTodo);
// todo.create(text, addTodo)

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, uniqueId) => {
    fs.writeFile(path.join(exports.dataDir, `${uniqueId}.txt`), text, (err) => {
      callback(null, {'id': uniqueId, 'text': text});
    });
  });
  // // var id = counter.getNextUniqueId();
  // console.log('ID should be here', id);
  // items[id] = text;//possibly replace with writeFile
  // callback(null, { id, text }); //replace with readFile

  // create a new text file that is named equal to id
  //content of id file shold be text variable
  //invoke writeFile
  //parameters are exports.newFile and text
  //desired output is a new text file
  //callback retrieves the data from the text file
  //pass the callback into readFile


  // readfile -> id -> writefile -> file w/ id, text || callback (file w/ id, text)
  // ^^ dynamically create filename
};

exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// path.join(dataDir, 'dyanmicIDfilename')

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
