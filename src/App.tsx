import * as React from 'react'
import Layout from './Layout'
import Counter from './Counter'

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Layout>
        <div>
          <h1>Wug??le!</h1>
          <div>Mas now</div>
          <Counter />
        </div>
      </Layout>
    )
  }
}
