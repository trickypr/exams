import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators'

import './button'

@customElement('pattern-footer')
export class Footer extends LitElement {
  static styles = css`
    footer {
      padding: 32px;
      text-align: center;
    }
  `

  render() {
    return html`<footer>&#169; TrickyPR ${new Date().getFullYear()}</footer>`
  }
}

@customElement('pattern-test-header')
export class HeaderTest extends LitElement {
  static styles = css`
    nav {
      padding: 16px;
    }
  `

  render() {
    const params = new URLSearchParams(location.search)

    return html`<nav>
      <ui-button type="text" link="/">Home</ui-button>
      <ui-button
        type="primary"
        link="./test.html?v=${Number(params.get('v') || '0') + 1}"
        >New test</ui-button
      >

      <ui-button type="text" link="./learn.html" style="float:right;"
        >Learn</ui-button
      >
      <ui-button
        type="text"
        link="./test.html?v=${Number(params.get('v') || '0')}&a=${params.get(
          'a'
        ) != 'true'}"
        style="float:right;"
        >Show / hide answers</ui-button
      >
    </nav>`
  }
}

@customElement('pattern-learn-header')
export class HeaderLearn extends LitElement {
  static styles = css`
    nav {
      padding: 16px;
    }
  `

  render() {
    return html`<nav>
      <ui-button type="text" link="/">Home</ui-button>
      <ui-button type="text" link="./test.html" style="float:right;"
        >Test</ui-button
      >
    </nav>`
  }
}
