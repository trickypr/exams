import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators'

@customElement('ui-content')
export class Content extends LitElement {
  static styles = css`
    .content {
      max-width: 700px;
      margin: auto;
    }
  `

  render() {
    return html` <div class="content"><slot></div>`
  }
}
