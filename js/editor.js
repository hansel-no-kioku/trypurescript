let tabKey = (cm) => {
  if (cm.getMode().name === 'null') {
    cm.execCommand('insertTab');
  } else {
    if (cm.somethingSelected()) {
      cm.execCommand('indentMore');
    } else {
      cm.execCommand('insertSoftTab');
    }
  }
};

let cm = CodeMirror(document.getElementById("code"), {
  mode: 'haskell',
  theme: 'idea',
  styleActiveLine: true,
  matchBrackets: true,
  tabSize: 2,
  lineNumbers: true,
  gutters: ["annotations", "CodeMirror-linenumbers"],
  inputStyle: 'contenteditable',
  extraKeys: {
    Tab: tabKey,
    'Shift-Tab': (cm) => cm.execCommand('indentLess'),
    'Ctrl-Space': 'autocomplete'
  }
});

var setEditorContent = (value) => {
  cm.setValue(value);
};

var onEditorChanged = (callback, millis) => {
  cm.on('changes', _.debounce(function() {
    callback(cm.getDoc().getValue());
  }, millis));
};

var cleanUpMarkers = () => {
  cm.getAllMarks().forEach(e => e.clear());
  cm.clearGutter("annotations");
};

var setAnnotations = (annotations) => {
  let makeMarker = annotation => {
    let icon = annotation.type == "warning" ? "report_problem" : "error_outline"
    let tooltip = annotation.text.replace('\n', '<br>');
    let marker = document.createElement('div');
    marker.className = 'annotation annotation-' + annotation.type;
    marker.innerHTML = '<i class="material-icons-outlined">' + icon + '</i>';
    tippy(marker.children[0],
      { content: tooltip,
        theme: 'tp',
        arrow: false,
        distance: 16,
        followCursor: true
      });
    return marker;
  };

  annotations.forEach(annotation =>
    cm.setGutterMarker(annotation.row, "annotations", makeMarker(annotation))
  );
};

var addMarker = (type, startLine, startColumn, endLine, endColumn) => {
  if (startLine === endLine && endColumn <= startColumn) {
    if (startColumn > 0) {
      startColumn = endColumn - 1;
    } else {
      endColumn = startColumn + 1;
    }
  }

  cm.markText(
    {line: startLine - 1, ch: startColumn - 1},
    {line: endLine - 1, ch: endColumn - 1},
    {className: "marker-error"}
  );
};
