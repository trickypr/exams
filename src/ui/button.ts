import { html, LitElement, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { primary, secondary } from './colors'

@customElement('ui-button')
export class Button extends LitElement {
  static styles = css`
    .btn {
      background: none;
      border: none;
      padding: 8px 10px;
      border-radius: 4px;
      transition-duration: 0.2s;
      cursor: pointer;
    }

    .btn.primary {
      background-color: ${primary()};
      color: white;
    }

    .btn.primary:hover {
      background-color: ${primary(0.9)};
    }

    .btn.secondary {
      background-color: ${secondary()};
      color: white;
    }

    .btn.secondary:hover {
      background-color: ${secondary(0.9)};
    }

    .btn.text:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `

  @property()
  type: 'primary' | 'secondary' | 'text' = 'primary'

  @property()
  link?: string

  render() {
    if (this.link) {
      return html`<a href="${this.link}"
        ><button class="btn ${this.type}">
          <slot></slot></button
      ></a>`
    }

    return html`<button class="btn ${this.type}">
      <slot></slot>
    </button>`
  }
}
