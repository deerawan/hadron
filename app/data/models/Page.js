var marked = require('marked'),
  minimodel = require('minimodel'),
  hljs = require('highlight.js'),
  uuid = require('node-uuid');


marked.setOptions({
  highlight: function (code, lang) {
    if(lang) {
      return hljs.highlight(lang, code).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  }
});

var Page = minimodel.Model.extend({
  id: {
    type: String,
    default: function() {
      return uuid.v4();
    }
  },
  title: {
    type: String,
    required: true
  },
  isPublished: Boolean,
  createdDate: {
    type: Date,
    default: function() {
      return new Date();
    }
  },
  content: String,
  contentType: {
    type: String,
    default: 'markdown'
  },
  friendlyUrl: String
});

Page.prototype.getRenderedContent = function() {
  if(this.contentType === 'markdown') {
    //TODO cache/save this
    return marked(this.content || "");
  }
};

module.exports = Page;
module.exports.__module = {
  type: 'object'
};
