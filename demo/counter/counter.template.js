export var main = `
    <h1 class="text-center text-muted">Counter component</h1>
    <div><p znb-model="counter">{{value}}</p></div>
    <button id="increment-btn" type="button">Click me!</button>
    <div>
      <slot></slot>
    </div>
  `;
