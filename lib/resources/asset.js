(function() {
  var Asset, BaseChild,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseChild = require('./base_child');

  Asset = (function(_super) {

    __extends(Asset, _super);

    Asset.prototype.slug = "asset";

    Asset.prototype.child = "/assets";

    function Asset(parent, site) {
      this.parent = parent;
      this["delete"] = __bind(this["delete"], this);
      this.create = __bind(this.create, this);
      Asset.__super__.constructor.call(this, site);
    }

    Asset.prototype.create = function(parentId, fields, callback) {
      var url, _ref;
      if (typeof parentId === 'string' || typeof parentId === 'number') {
        parentId = '/' + parentId;
      }
      if (typeof fields === 'function') {
        _ref = [fields, parentId, ''], callback = _ref[0], fields = _ref[1], parentId = _ref[2];
      }
      url = this.resource.queryString("" + this.prefix + parentId + this.child);
      return this.resource.put(url, this.slug, fields, callback);
    };

    Asset.prototype.update = Asset.create;

    Asset.prototype["delete"] = function(parentId, key, callback) {
      var fields, url, _ref;
      if (typeof parentId === 'string' || typeof parentId === 'number') {
        parentId = '/' + parentId;
      }
      if (typeof key === 'function') {
        _ref = [id, parentId, ''], callback = _ref[0], key = _ref[1], parentId = _ref[2];
      }
      if (key == null) callback(new Error('missing key'));
      url = this.resource.queryString("" + this.prefix + parentId + this.child);
      fields = {
        key: key
      };
      return this.resource.__request__(url, this.slug, 'DELETE', fields, callback);
    };

    return Asset;

  })(BaseChild);

  module.exports = Asset;

}).call(this);
