const { Seeder } = require('mongo-seeding')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const config = {
  database: `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  dropDatabase: false,
}

const seeder = new Seeder(config)
const collections = seeder.readCollectionsFromPath(path.resolve(__dirname, './data'))

seeder
  .import(collections)
  .then(() => {
    console.log('Seeding success')
  })
  .catch((err) => {
    console.log(err)
  })