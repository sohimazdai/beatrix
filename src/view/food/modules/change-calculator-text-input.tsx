export function changeCalculatorTextInput(text: string) {
  if (!text) {
    this.setState({
      keyValue: '0',
      trailingDot: false,
      isValueEmpty: true,
    });

    return;
  }

  if (text.replace(/[^.]/g, '').length > 1 && text.slice(-1) === '.') {
    this.setState({
      keyValue: text.slice(0, -1),
      isValueEmpty: false,
    })

    return;
  }

  if (text.slice(-1) === '.') {
    this.setState({
      keyValue: text,
      trailingDot: true,
      isValueEmpty: false,
    })

    return;
  }

  if (text.slice(1, 2) !== '.' && text.slice(0, 1) == '0') {
    this.setState({
      keyValue: text.slice(1),
      trailingDot: false,
      isValueEmpty: false,
    })

    return;
  }

  this.setState({
    keyValue: text,
    trailingDot: false,
    isValueEmpty: false,
  })
}

