import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators'
import { secondary } from './colors'

@customElement('ui-content')
export class Content extends LitElement {
  static styles = css`
    .content {
      max-width: 768px;
      margin: auto;
    }
  `

  render() {
    return html`<div class="content"><slot></div>`
  }
}

@customElement('ui-grid')
export class Grid extends LitElement {
  static styles = css`
    .grid {
      grid-area: auto;
      gap: 16px;
    }
  `

  render() {
    return html`<div class="grid"><slot></div>`
  }
}

@customElement('ui-float-right')
export class FloatRight extends LitElement {
  static styles = css`
    .right {
      /* position: relative; */
      display: flex;
      flex-direction: row-reverse;
      gap: 8px;
    }
  `

  render() {
    return html`<div class="right"><slot></div>`
  }
}

@customElement('ui-spacer')
export class Spacer extends LitElement {
  @property()
  height: string = '8px'

  render() {
    return html`<div style="height: ${this.height}"></div>`
  }
}

@customElement('ui-color-secondary')
export class ColorSecondary extends LitElement {
  static styles = css`
    div {
      color: ${secondary()};
    }
  `

  render() {
    return html`<div><slot></div>`
  }
}
