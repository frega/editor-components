import { html } from "lit-element";
import EditorElement from "../base/editor-element/editor-element";

export default class Container extends EditorElement {
  static get properties() {
    return {
      sections: { type: String, attribute: "ck-contains" },
      numberOfChildren: { type: Number },
      max: { type: Number, attribute: "ck-max" },
      min: { type: Number, attribute: "ck-min" },
    };
  }

  constructor() {
    super();
    this.observer = null;
    this.observer = new MutationObserver(() => this.processChildren());
    this.observer.observe(this, {
      attributes: false,
      childList: true,
      subtree: false
    });
  }

  firstUpdated() {
    this.processChildren();
  }

  connectedCallback() {
    super.connectedCallback();
    this.processChildren();
  }

  processChildren() {
    this.numberOfChildren = this.children.length;

    if (!this.max) {
      this.max = 0;
    }

    if (!this.min) {
      this.min = 0;
    }

    if (this.numberOfChildren >= this.min) {
      Array.from(this.children).forEach((child, index) => {
        child.dispatchEvent(
          new CustomEvent("containerUpdate", {
            detail: {
              inContainer: true,
              containerSections: this.sections,
              containerIndex: index,
              containerMax: this.max,
              containerItems: this.children.length || 0
            }
          })
        );
      });
    } else {
      const element = this.sections.split(" ").pop();
      this.modifyDocument(editor => {
        for (let i = this.numberOfChildren; i < this.min; i += 1) {
          editor.insert(element, this, "end");
        }
      });
    }
  }

  render() {
    return html`
      <div class="container"><slot></slot></div>
      ${
        this.inEditor && (this.numberOfChildren < this.max || this.max === 0)
          ? html`
              <ck-placeholder
                @ckEditorOperation="${this.appendHandler}"
                closed="true"
                sections="${this.sections}"
              >
              </ck-placeholder>
            `
          : null
      }
      </ck-placeholder>
    `;
  }

  appendHandler(event) {
    this.modifyDocument(editor =>
      editor.insert(event.detail.section, this, "end")
    );
  }
}
