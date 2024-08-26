// Redux: Actions
const UPDATE_MARKDOWN = 'UPDATE_MARKDOWN';

const updateMarkdown = (text) => ({
  type: UPDATE_MARKDOWN,
  payload: text
});

// Redux: Reducer
const initialState = {
  markdown: `
# Heading 1

## Heading 2

[Link to FreeCodeCamp](https://www.freecodecamp.org)

Inline code: \`const x = 10;\`

\`\`\`
function add(a, b) {
  return a + b;
}
\`\`\`

- List item 1
- List item 2
- List item 3

> This is a blockquote

![Image](https://via.placeholder.com/150)

**Bold text**

`
};

const markdownReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MARKDOWN:
      return {
        ...state,
        markdown: action.payload
      };
    default:
      return state;
  }
};

// Redux: Store
const { createStore } = Redux;
const store = createStore(markdownReducer);

// React: Components
const { useSelector, useDispatch, Provider } = ReactRedux;

// Editor Component
const Editor = () => {
  const markdown = useSelector(state => state.markdown);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(updateMarkdown(event.target.value));
  };

  return (
    <textarea id="editor" value={markdown} onChange={handleChange}></textarea>
  );
};

// Preview Component
const Preview = () => {
  const markdown = useSelector(state => state.markdown);

  // Configure marked to handle line breaks
  const preview = marked.parse(markdown, {
    gfm: true, // Use GitHub Flavored Markdown
    breaks: true // Convert line breaks to <br>
  });

  return (
    <div id="preview" dangerouslySetInnerHTML={{ __html: preview }}></div>
  );
};

// App Component
const App = () => (
  <div className="container">
    <div className="editor-container">
      <h2 className="header">Markdown Editor</h2>
      <Editor />
    </div>
    <div className="preview-container">
      <h2 className="header">Preview</h2>
      <Preview />
    </div>
  </div>
);

// React: Render
const { createElement } = React;
const { render } = ReactDOM;

render(
  createElement(Provider, { store },
    createElement(App)
  ),
  document.getElementById('root')
);
