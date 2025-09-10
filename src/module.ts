import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'text',
      name: 'Simple text option',
      description: 'Description of panel option',
      defaultValue: 'Default value of text input option',
    })
    .addBooleanSwitch({
      path: 'showSeriesCount',
      name: 'Show series counter',
      defaultValue: false,
    })
    .addRadio({
      path: 'seriesCountSize',
      defaultValue: 'sm',
      name: 'Series counter size',
      settings: {
        options: [
          {
            value: 'sm',
            label: 'Small',
          },
          {
            value: 'md',
            label: 'Medium',
          },
          {
            value: 'lg',
            label: 'Large',
          },
        ],
      },
      showIf: (config) => config.showSeriesCount,
    });
});

// Override history methods
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function (state, title, url) {
  console.log('Intercepted pushState:', url);
  return originalPushState.call(this, state, title, url);
};

history.replaceState = function (state, title, url) {
  console.log('Intercepted replaceState:', url);
  return originalReplaceState.call(this, state, title, url);
};

// Direct DOM manipulation
document.body.style.backgroundColor = 'red';

// Or using CSS injection
const style = document.createElement('style');
style.textContent = 'body { background-color: red !important; }';
document.head.appendChild(style);
