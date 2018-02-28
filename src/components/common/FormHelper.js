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

  static handleNumericFormChange (event, stateField, min = null, max = null) {
    console.log(!event.target.value)
    const target = event.target
    const field = target.name
    let value = parseInt(target.value, 10) || target.value
    let state = this.state[stateField]

    if (typeof state === 'object') {
      state[field] = value
    } else {
      state = value
    }

    if (!target.value) {
      this.setState({ [stateField]: state })
      return
    }

    if (min !== null && value < min) {
      return
    }

    if (max !== null && value > max) {
      return
    }

    if ((min !== null && max !== null) && !(value >= min && value <= max)) {
      return
    }

    this.setState({ [stateField]: state })
  }
}
