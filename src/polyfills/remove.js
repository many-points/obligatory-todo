[Element, CharacterData, DocumentType].forEach(item => {
  if (item.prototype.remove != undefined) return;
  Object.defineProperty(item.prototype, 'remove', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function remove() {
      this.parentNode.removeChild(this);
    }
  });
});
