import mongoose from '../src/config/mongoose'
import * as seeds from './seeds'
import * as models from '../src/models'

async function seed() {
  const seed_list = Object.values(seeds)

  for(let i = 0; i < seed_list.length; i++) {
    const seeder = seed_list[i]
    const should = await seeder.shouldRun()
    if(should) {
      await seeder.run()
    }
  }
}

async function drop() {
  const model_list = Object.values(models)

  for(let i = 0; i < model_list.length; i++) {
    const model = model_list[i]
    await model.collection.drop()
  }
}

function usage() {
  console.log('Usage:')
  console.log('npm run db [option]')
  console.log()
  console.log('Options:')
  console.log('  drop: drop tables ')// + models.join(', '))
  console.log('  seed: fill tables with data')
}

async function main() {
  const myArgs = process.argv.slice(2);

  switch(myArgs[0]) {
    case 'seed': await seed()
      break
    case 'drop': await drop()
      break
    default:
      usage()
  }
}

mongoose.connect()

main().then(() => process.exit())
