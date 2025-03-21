class ItemsController {
  constructor(currentId = 0) {
    this.items = [];
    this.currentId = currentId;
  }

  addItem(name, description, img) {
    const item = {
      id: this.currentId++,
      name: name,
      description: description,
      img: img, // Asegurar que coincide con la estructura JSON
    };

    this.items.push(item);
  }
}
