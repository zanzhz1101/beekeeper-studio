import _ from 'lodash'
import { SavedConnection } from '../common/appdb/models/saved_connection'
import platformInfo from '../common/platform_info'

export default {
  name: 'dev-8-fixtures',
  env: 'development',
  dbs: [
    {
      name: "[DEV] Docker Load Test PSQL",
      connectionType: 'postgresql',
      port: 5435,
      username: 'postgres',
      password: 'example',
      defaultDatabase: 'load_test_db'
    }
  ],

  async run() {

    const connections = this.dbs.map(db => {
      const connection = new SavedConnection()
      _.merge(connection, db)
      return connection
    })

    for (let i = 0; i < connections.length; i++) {
      const connection = connections[i];
      await connection.save()
    }

  }
}
