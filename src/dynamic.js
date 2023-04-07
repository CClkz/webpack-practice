// import { cloneDeep } from 'lodash-es'
// cloneDeep([1, 2])
function getComponent() {
  return import('lodash-es').then(({ default: _ }) => {
    return _
  })
}
export default getComponent
