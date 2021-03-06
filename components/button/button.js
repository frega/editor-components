import { html, svg, css } from "lit-element";
import EditorElement from "../base/editor-element/editor-element";

const iconLink = svg`
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
    <path d="M7.8 24c0-3.42 2.78-6.2 6.2-6.2h8V14h-8C8.48 14 4 18.48 4 24s4.48 10 10 10h8v-3.8h-8c-3.42 0-6.2-2.78-6.2-6.2zm8.2 2h16v-4H16v4zm18-12h-8v3.8h8c3.42 0 6.2 2.78 6.2 6.2s-2.78 6.2-6.2 6.2h-8V34h8c5.52 0 10-4.48 10-10s-4.48-10-10-10z"/>
</svg>
`;

export default class Button extends EditorElement {
  static get properties() {
    return {
      target: { type: String, attribute: "link-target" }
    };
  }

  constructor() {
    super();
    this.target = null;
  }

  render() {
    return html`
      <div class="button ${this.target ? "linked" : "not-linked"}">
        <div class="button__content">
          <slot></slot>
        </div>
        <button @click="${this.inEditor ? this.selectLink : () => {}}">
          ${iconLink}
        </button>
      </div>
    `;
  }

  selectLink() {
    this.requestInformation("select-link", { target: this.target }, target => {
      if (target !== null) {
        this.modifyDocument(editor =>
          editor.attributes(this, {
            "link-target": target
          })
        );
      } else {
        this.modifyDocument(editor =>
          editor.removeAttribute(this, "link-target")
        );
      }
    });
  }
}

Button.styles = css`
  :host {
    display: inline-block;
    --icon-size: 2em;
    --icon-color: black;
    --background-color: #ffbb15;
    background: var(--background-color);
    border-radius: 3em;
    font-weight: bold;
  }

  .button {
    display: flex;
    align-items: center;
    padding: 0 1em;
  }

  .button__content {
    width: 100%;
  }

  .button button {
    width: var(--icon-size);
    border: none;
    padding: 0;
    background: none;
    flex-grow: 0;
    cursor: pointer;
    transition: transform 0.5s ease;
    outline: none;
    margin-left: 0.5em;
  }

  .button svg {
    padding: 0;
    display: block;
    fill: var(--icon-color);
    width: var(--icon-size);
  }

  .button.not-linked svg {
    opacity: 0.5;
  }
`;
