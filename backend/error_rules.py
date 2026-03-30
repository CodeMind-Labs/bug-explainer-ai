# error_rules.py
# Simple rule-based error explainer.


def explain_error(error_message: str) -> dict:
    """Return explanation, fix, and learning based on common Python error name hints."""
    # normalize
    text = error_message.strip()
    lower = text.lower()

    if not text:
        return {
            "explanation": "No error message provided. Please paste the exact error text from your program.",
            "fix": "Type or paste the crash/error message and try again.",
            "learning": "Error analysis works best with concrete error lines, stack traces, and context."
        }

    # IndexError
    if "indexerror" in lower or "list index out of range" in lower or "tuple index out of range" in lower:
        return {
            "explanation": "Python raised an IndexError, which means your code tried to access an item at a position that does not exist in a list/tuple/sequence.",
            "fix": "Check the index you are using (e.g. i). Make sure it is between 0 and len(sequence)-1. Use len() and conditionals before indexing. Consider using a for loop over the sequence directly.",
            "learning": "In Python, sequence indexes are zero-based and raising IndexError is a sign of out-of-range access. Use safe iteration patterns to avoid this.",
        }

    # KeyError
    if "keyerror" in lower or "key error" in lower:
        return {
            "explanation": "Python raised a KeyError because your code tried to access a dictionary key that does not exist.",
            "fix": "Use dict.get(key, default), or check key in your_dict before dereferencing. If the key should exist, ensure your data is populated with that field.",
            "learning": "Dictionaries are mappings by key. KeyError is common with missing data; use .get() or error handling to support missing keys safely.",
        }

    # TypeError
    if "typeerror" in lower or "is not callable" in lower or "unsupported operand type" in lower:
        return {
            "explanation": "Python raised a TypeError meaning an operation was attempted on a value of the wrong type (e.g., adding str + int, calling non-callable object).",
            "fix": "Inspect the value types in your statement. Convert types explicitly (e.g., str(x), int(x)), or fix the logic to use compatible types.",
            "learning": "Type checks and assertions are useful during development. Use type hints and linters to catch type contradictions earlier.",
        }

    # SyntaxError
    if "syntaxerror" in lower or "invalid syntax" in lower or "unterminated string literal" in lower:
        return {
            "explanation": "Python raised a SyntaxError, meaning the code text is not valid Python grammar (missing colon, bad indentation, unmatched parentheses etc.).",
            "fix": "Open the file and line from the traceback and find the invalid syntax. Fix indentation, add missing symbols, and ensure code structure is correct.",
            "learning": "Syntax errors are caught before execution; run code frequently and use code editors with Python syntax checking.",
        }

    # Fallback generic explanation
    return {
        "explanation": "This error message is not handled by the simple rule-based engine. It looks like: '" + text + "'.",
        "fix": "Read the traceback to find the file and line where the error occurred. Look up the exception type and investigate your code state there.",
        "learning": "As you learn debugging, focus on one exception at a time, read the stack trace from the bottom, and replicate the issue in a minimal example.",
    }
