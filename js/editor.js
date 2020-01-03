// ヒント生成
const pursSyntax = [
  "case",
  "class",
  "data",
  "do",
  "derive",
  "else",
  "false",
  "foreign",
  "if",
  "import",
  "in",
  "instance",
  "let",
  "module",
  "newtype",
  "of",
  "then",
  "true",
  "type",
  "where",
];

// Prim
// Prelude 4.1.1
// Prelude.Unicode 0.2.4
// "Hello, World"
const pursModulesAndTypes = [
  "Above",
  "Append",
  "Applicative",
  "Apply",
  "Array",
  "Beside",
  "Bind",
  "Boolean",
  "BooleanAlgebra",
  "Bounded",
  "Category",
  "Char",
  "CommutativeRing",
  "Compare",
  "Cons",
  "Console",
  "Control",
  "Discard",
  "DivisionRing",
  "Doc",
  "Effect",
  "EQ",
  "Eq",
  "EuclideanRing",
  "Fail",
  "False",
  "Field",
  "Function",
  "Functor",
  "GT",
  "HeytingAlgebra",
  "Int",
  "Lacks",
  "LT",
  "Main",
  "Monad",
  "Monoid",
  "NaturalTransformation",
  "Nil",
  "Nub",
  "Number",
  "Ord",
  "Ordering",
  "Partial",
  "Prelude",
  "Prim",
  "Quote",
  "QuoteLabel",
  "Record",
  "Ring",
  "Row",
  "RowList",
  "RowToList",
  "Semigroup",
  "Semigroupoid",
  "Semiring",
  "Show",
  "String",
  "Symbol",
  "Text",
  "True",
  "Type",
  "TypeError",
  "Union",
  "Unit",
  "Void",
  "Warn",
];

const pursFunctions = [
  "absurd",
  "add",
  "ap",
  "append",
  "apply",
  "between",
  "bind",
  "bottom",
  "clamp",
  "compare",
  "comparing",
  "compose",
  "conj",
  "const",
  "degree",
  "discard",
  "disj",
  "div",
  "eq",
  "flap",
  "flip",
  "gcd",
  "identity",
  "ifM",
  "join",
  "lcm",
  "liftA1",
  "liftM1",
  "log",
  "logShow",
  "main",
  "max",
  "map",
  "mempty",
  "min",
  "mod",
  "mul",
  "not",
  "notEq",
  "one",
  "otherwise",
  "pure",
  "recip",
  "show",
  "sub",
  "top",
  "unit",
  "unless",
  "unlessM",
  "void",
  "when",
  "whenM",
  "zero",
];

const pursUnicodeSyntax = [
  { text: "forall", ucText: "∀" },
  { text: "::",     ucText: "∷" },
  { text: "->",     ucText: "→" },
  { text: "<-",     ucText: "←" },
  { text: "=>",     ucText: "⇒" },
  { text: "<=",     ucText: "⇐" },
];

const pursOperators = [
  { name: "add",            text: "+" },
  { name: "append",         text: "<>",   ucText: "◇" },
  { name: "apply",          text: "<*>",  ucText: "⊛" },
  { name: "apply",          text: "$" },
  { name: "applyFirst",     text: "<*" },
  { name: "applyFlipped",   txt: "#" },
  { name: "applySecond",    text: "*>" },
  { name: "bind",           text: ">>=",  ucText: "⤜" },
  { name: "bindFlipped",    text: "=<<",  ucText: "⤛" },
  { name: "compose",        text: "<<<",  ucText: ["⋘", "∘"] },
  { name: "composeFlipped", text: ">>>",  ucText: "⋙" },
  { name: "composeKleisli", text: ">=>",  ucText: "↣" },
  { name: "composeKleisliFlipped",
                            text: "<=<",  ucText: "↢" },
  { name: "conj",           text: "&&",   ucText: "∧" },
  { name: "disj",           text: "||",   ucText: "∨" },
  { name: "div",            text: "/",    ucText: "÷" },
  { name: "eq",             text: "==",   ucText: "≡" },
  { name: "flap",           text: "<@>" },
  { name: "greaterThan",    text: ">" },
  { name: "greaterThanOrEq",text: ">=",   ucText: ["≥", "≮"] },
  { name: "lessThan",       texr: "<" },
  { name: "lessThanOrEq",   text: "<=",   ucText: ["≤", "≯"] },
  { name: "map",            text: "<$>",  ucText: "⊙" },
  { name: "mapFlipped",     text: "<#>" },
  { name: "mul",            text: "*",    ucText: "⋅" },
  { name: "nand",                         ucText: "⊼" },
  { name: "NaturalTransformation",
                            text: "~>",   ucText: "⟿" },
  { name: "nor",                          ucText: "⊽" },
  { name: "notDivides",                   ucText: "∤" },
  { name: "notEq",          text: "/=",   ucText: "≢" },
  { name: "notEq",                        ucText: "≠" },
  { name: "sub",            text: "-" },
  { name: "voidLeft",       text: "$>" },
  { name: "voidRight",      text: "<$" },
  { name: "xor",                          ucText: "⊻" },
];

const pursKeywords = pursSyntax.concat(pursModulesAndTypes, pursFunctions);

const getCurWord = (cm, result) => {
  const start = result.from.ch;
  const end = result.to.ch;
  return start < end && cm.getLine(result.from.line).slice(start, end);
};

const resolvePursKeywords = (curWord, keywords) => {
  return words = curWord ? keywords.filter(keyword => keyword.startsWith(curWord))
                         : keywords;
};

const apply = (cm, data, completion) => {
  const text = typeof completion == "string" ? completion
             : completion.replaceText        ? completion.replaceText
             :                                 completion.text;
  cm.replaceRange(text, completion.from || data.from,
                  completion.to || data.to, "complete");
};

const resolveOperators = (curWord, operators, ucPrefix) => {
  let list = [];

  operators.forEach(op => {
    const text = op.name && (!curWord || op.name.startsWith(curWord)) ? op.name
               : op.text && (!curWord || op.text.startsWith(curWord)) ? op.text
               :                                                        null
    if (text) {
      const postfix = op.name ? " (" + op.name + ")" : ""

      op.text && list.push({
        text: text,
        displayText: op.text + postfix,
        replaceText: op.text,
        hint: apply
      });

      const ucTextList = typeof op.ucText === "string" ? [op.ucText]
                       : Array.isArray(op.ucText)      ? op.ucText
                       :                                 [];
      ucTextList.forEach(ucText => {
        list.push({
          text: text,
          displayText: ucPrefix + ucText + postfix,
          replaceText: ucText,
          hint: apply
        });
      });
    }
  });

  return list;
};

// purescript/src/Language/PureScript/CST/Lexer.hs isSymbolChar
const word = /\w+|[:!#$%&\*\+\./<=>?@\\^|\-~]+/
const wordEx = /^\w+|^[:!#$%&\*\+\./<=>?@\\^|\-~]+/

CodeMirror.registerHelper("hint", "haskell", function(cm) {
  const anyResult = CodeMirror.hint.anyword
                      ? CodeMirror.hint.anyword(cm, {word: word})
                      : [];
  const curWord = anyResult && getCurWord(cm, anyResult);

  const kwList = resolvePursKeywords(curWord, pursKeywords);
  const symbolList = resolveOperators(curWord, pursUnicodeSyntax, "[u]");
  const operatorList = resolveOperators(curWord, pursOperators, "[U]");

  const pursList = kwList.concat(symbolList, operatorList);

  const anyList = anyResult.list.filter(k => !pursList.find(
                    p => typeof p === "string" ? p === k : p.text === k));

  const list = pursList.concat(anyList).sort((a, b) => {
    const strA = typeof a === "string" ? a : a.text;
    const strB = typeof b === "string" ? b : b.text;
    return strA.localeCompare(strB);
  });

  return { list: list, from: anyResult.from, to: anyResult.to }
});

const showHintOptions = {
  completeSingle: false,
  closeCharacters: /[\s()\[\]{};,]/,
};

const showHintByInput = (cm, changeObj) => {
  if (cm.showHint &&
      !cm.state.completionActive &&
      changeObj.origin == "+input" &&
      changeObj.from.line == changeObj.to.line &&
      changeObj.text[0] && changeObj.text[0].length > 0) {
    let cur = cm.getCursor(), curLine = cm.getLine(cur.line);
    let end = cur.ch, start = end;
    while (start && wordEx.test(curLine.slice(start - 1, end))) --start;
    if (start + 1 == end) cm.showHint(showHintOptions);
  }
};

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
  highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
  showTrailingSpace: true,
  tabSize: 2,
  lineNumbers: true,
  gutters: ["annotations", "CodeMirror-linenumbers"],
  inputStyle: 'contenteditable',
  extraKeys: {
    Tab: tabKey,
    'Shift-Tab': (cm) => cm.execCommand('indentLess'),
    'Ctrl-Space': (cm) => cm.showHint(showHintOptions),
    'Ctrl-/': 'toggleComment'
  }
});

// 単語入力開始時にヒントを表示する
cm.on('change', showHintByInput);

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
