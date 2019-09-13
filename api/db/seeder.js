class Seeder {
  constructor(model, data) {
    this.model = model
    this.data = data
  }

  async shouldRun() {
    let count = await this.model.countDocuments().exec()
    console.log('There are %s %s in DB', count, this.model.name)
    return count === 0
  }

  async run() {
    console.log('Should insert %s %s', this.data.length, this.model.name)
    return await this.model.insertMany(this.data)
  }
}

export default Seeder
