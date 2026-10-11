# Zinx

Zinx is a small, browser-based programming language and interpreter written in vanilla JavaScript. It provides an editor with syntax highlighting plus views of the token stream, abstract syntax tree (AST), and program output.

## Run locally

No dependencies or build step are required. Serve this directory with any static-file server, then open it in a browser:

```sh
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) and use the editor. The app is also available directly from `index.html` when your browser permits local ES modules.

## Language overview

Zinx programs consist of expressions and statements separated by whitespace. Newlines are optional where the syntax is unambiguous.

### Output and variables

Use `show` to print a value, and `set` to create or update a variable.

```zinx
set greeting "Hello, Zinx!"
set x 5
show greeting
show x + 10
```

Output:

```text
Hello, Zinx!
15
```

### Values

- Integers, such as `42`
- Booleans: `true` and `false`
- Double-quoted strings, such as `"hello"`
- Variables, beginning with a letter or `_` and optionally containing digits or `_`

Strings support `\"`, `\\`, `\n`, and `\t` escape sequences.

### Operators

| Category | Operators |
| --- | --- |
| Arithmetic | `+`, `-`, `*`, `/` |
| Equality | `==`, `!=` |
| Comparison | `>`, `<`, `>=`, `<=` |

Arithmetic and ordering comparisons require integer operands. Equality works with integers, booleans, and strings. Parentheses control grouping, while normal precedence applies otherwise: multiplication/division, addition/subtraction, then comparisons.

```zinx
show 5 + (2 * 3)
show 10 >= 8
show "zinx" != "Zinx"
```

### Comments

Use `//` for a comment through the end of the line.

```zinx
// Values can be reused later in the program.
set score 10
show score
```

### Conditionals

An `if` condition must evaluate to `true` or `false`. The selected branch is
executed; the other branch is skipped. Branch statements use the existing
parenthesized statement form.

```zinx
set score 72
if (score >= 50) (show "Pass") else (show "Try again")
```

## Using the editor

- **Run** resets the current program state and executes the full program.
- **Step** executes exactly one statement at a time. It preserves the current interpreter state until the editor content changes.
- Press **Cmd/Ctrl + Enter** to run; **Tab** inserts four spaces.
- The tokens and AST panels show the results of lexing and parsing.
- The history controls persist entered programs in browser local storage.

Runtime errors—including undefined variables, invalid operands, and division by zero—are shown in the output panel.

## Project structure

```text
index.html                      Application page
docs.html                       In-browser language reference
style.css                       Application styling
app.js                          Editor, execution, highlighting, and UI wiring
src/lexer/lexer.js              Source code → tokens
src/parser/parser.js            Tokens → AST
src/interpreter/interpreter.js  AST evaluation and runtime state
src/history.js                  Browser-local code history
```

## Status

The current implementation supports integers, booleans, strings, variables, arithmetic, comparisons, comments, conditionals, syntax highlighting, and statement-by-statement execution. Loops, functions, compilation, and a virtual machine are not implemented.
