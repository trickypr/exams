import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators'

@customElement('ui-card')
export class Card extends LitElement {
  static styles = css`
    .card {
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 4px;

      padding: 16px;
      width: max-content;
    }

    h1 {
      margin-top: 0;
    }
    p {
      margin-bottom: 0;
    }
  `

  @property()
  header?: string

  @property()
  text?: string

  render() {
    return html`<div class="card">
      ${this.header && html`<h1>${this.header}</h1>`}
      ${this.text && html`<p>${this.text}</p>`}
      <slot></slot>
    </div>`
  }
}
