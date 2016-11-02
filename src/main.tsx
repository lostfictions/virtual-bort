import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
)

render()

if(module.hot) {
  module.hot.accept('./App', render)
}

type Obj = {
  verts : [number, number, number][]
  elems : [number, number][]
}
const bort = require<Obj>('../data/bort.json')

const verts = bort.verts.map(v => v.map(vv => vv * 30))
const elems = bort.elems.map(pair => [pair[0] - 1, pair[1] - 1])

import * as Regl from 'regl'
const regl = Regl({
  canvas: document.getElementById('bort'),
  attributes: { antialias: false, alpha: false, depth: false }
})

const mat4 = require<any>('gl-mat4')

const drawBort = regl({
  vert: `
    precision mediump float;
    attribute vec3 position;
    uniform mat4 model, view, projection;
    void main() {
      gl_Position = projection * view * model * vec4(position, 1);
    }`,

  frag: `
    precision mediump float;
    uniform vec4 color;
    void main() {
      gl_FragColor = color;
    }`,

  // this converts the vertices of the mesh into the position attribute
  attributes: {
    position: verts
  },

  elements: elems,

  lineWidth: 1,

  uniforms: {
    color: [0, 0.3, 0, 1],
    model: mat4.identity([]),
    view: ({tick} : any) => {
      const t = 0.01 * tick
      return mat4.lookAt(
        [],
        [30 * Math.cos(t), 2.5, 30 * Math.sin(t)],
        [0, 2.5, 0],
        [0, 1, 0]
      )
    },
    projection: ({viewportWidth, viewportHeight} : any) => mat4.perspective(
      [],
      Math.PI / 4,
      viewportWidth / viewportHeight,
      0.01,
      1000
    )
  }
})

regl.frame(() => {
  regl.clear({
    depth: 1,
    color: [0, 0, 0, 1]
  })

  drawBort()
})
