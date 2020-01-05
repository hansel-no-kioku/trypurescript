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

const getCurWord = (cm) => {
  const cur = cm.getCursor();
  const curLine = cm.getLine(cur.line);
  const end = cur.ch;
  const test = str => {let res = word.exec(str); return res && res[0] === str;};
  let start = end;
  while (start && test(curLine.slice(start - 1, end))) --start;
  return {
    curWord: start < end && curLine.slice(start, end),
    from: CodeMirror.Pos(cur.line, start),
    to: CodeMirror.Pos(cur.line, end)
  };
};

const resolveAnyWords = (cm, curWord) => {
  const range = 500;
  const cur = cm.getCursor();
  let list = [];
  let seen = {};
  let re = new RegExp(word.source, "g");
  for (let dir = -1; dir <= 1; dir += 2) {
    let line = cur.line;
    const endLine = Math.min(Math.max(line + dir * range, cm.firstLine()), cm.lastLine()) + dir;
    for (; line != endLine; line += dir) {
      const text = cm.getLine(line);
      let m;
      while (m = re.exec(text)) {
        if (line == cur.line && m[0] === curWord) continue;
        if ((!curWord || m[0].lastIndexOf(curWord, 0) == 0) && !Object.prototype.hasOwnProperty.call(seen, m[0])) {
          seen[m[0]] = true;
          list.push(m[0]);
        }
      }
    }
  }
  return list;
};

CodeMirror.registerHelper("hint", "haskell", function(cm) {
  const {curWord, from, to} = getCurWord(cm);

  const kwList = resolvePursKeywords(curWord, pursKeywords);
  const symbolList = resolveOperators(curWord, pursUnicodeSyntax, "[u]");
  const operatorList = resolveOperators(curWord, pursOperators, "[U]");
  const pursList = kwList.concat(symbolList, operatorList);

  const anyResult = resolveAnyWords(cm, curWord);
  const anyList = anyResult.filter(k => !pursList.find(
                    p => typeof p === "string" ? p === k : p.text === k));

  const list = pursList.concat(anyList).sort((a, b) => {
    const strA = typeof a === "string" ? a : a.text;
    const strB = typeof b === "string" ? b : b.text;
    return strA.localeCompare(strB);
  });

  return { list: list, from: from, to: to }
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
    const {curWord} = getCurWord(cm);
    curWord && curWord.length == 1 && cm.showHint(showHintOptions);
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
  autoCloseBrackets: {pairs: "()[]{}\"\"", triples: "\""},
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
    const icon = annotation.type == "warning" ? "report_problem" : "error_outline"
    const text = annotation.text.replace('\n', '<br>');
    const marker = document.createElement('div');
    marker.className = 'annotation annotation-' + annotation.type;
    marker.innerHTML = '<i class="material-icons-outlined">' + icon + '</i>';
    const tip = tippy(marker.children[0],
      { content: text,
        theme: 'tp',
        arrow: false,
        trigger: "click",
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
