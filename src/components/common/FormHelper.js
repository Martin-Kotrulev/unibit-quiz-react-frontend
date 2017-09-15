export default class FormHelper {
  static handleFormChange (event, stateField) {
    const target = event.target
    const field = target.name

    let value
    if (target.type === 'checkbox') {
      value = target.checked
    } else {
      value = target.value
    }

    let state = this.state[stateField]

    if (typeof state === 'object') {
      state[field] = value
    } else {
      state = value
    }

    this.setState({ [stateField]: state })
  }
}
