import * as templates from "./counter.template";

class MyElement extends HTMLElement {
  get odd() {
    return this.hasAttribute("odd");
  }

  set odd(isOdd) {
    this.setAttribute("odd", isOdd);
  }

  render() {
    this.shadowRoot.innerHTML = templates.main;
  }

  constructor() {
    super();
    // element created
    this.attachShadow({ mode: "open" });

    this.render();

    // element model
    this.modelSetup("counter");
  }

  static get observedAttributes() {
    // Indicate that we want to be notified
    // when the `odd` attribute is changed
    return ["odd"];
  }

  connectedCallback() {
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)

    this.counter = 0;
    this.updateModel("counter", this.counter);
    this.shadowRoot
      .querySelector("#increment-btn")
      .addEventListener("click", (e) => {
        this.increment(e);
      });
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    console.log(`${attrName}: ${oldValue}->${newValue}`);
    const event = new CustomEvent(
      `${attrName}OnChange`,
      {
        detail: {
          payload: newValue,
        },
      },
      false
    );
    document.dispatchEvent(event);
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }

  modelSetup(modelName) {
    this.template = {};
    const elements = this.shadowRoot.querySelectorAll(
      `[znb-model="${modelName}"]`
    );
    for (const element of elements) {
      this.template[`${modelName}-original`] = element.outerHTML;
    }
  }

  updateModel(modelName, value) {
    const elements = this.shadowRoot.querySelectorAll(
      `[znb-model="${modelName}"]`
    );
    for (const element of elements) {
      const html = this.template[`${modelName}-original`].replace(
        "{{value}}",
        value
      );
      element.outerHTML = html;
    }
  }

  increment(event) {
    event.preventDefault();

    this.counter += 1;
    if (this.counter % 2 !== 0) {
      this.odd = true;
    } else {
      this.odd = false;
    }
    this.updateModel("counter", this.counter);
  }
}

customElements.define("znb-counter", MyElement);
