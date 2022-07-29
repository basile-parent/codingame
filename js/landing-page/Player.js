class Player {
  name = null

  constructor(name) {
    this.name = name
  }

  render() {
    return `
        <i class="fa-solid fa-circle-user"></i> ${ this.name }
        `
  }
}