# error_rules.py
# AI-powered error explainer with rule-based fallback.

import os
import json
from typing import Optional
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def explain_error_with_ai(error_message: str) -> Optional[dict]:
    """Use OpenAI to explain the error message."""
    if not os.getenv("OPENAI_API_KEY"):
        return None

    try:
        prompt = f"""
You are an expert Python programming tutor. Explain this Python error in a beginner-friendly way.

Error message: {error_message}

Provide a JSON response with exactly these three fields:
- "explanation": A clear, simple explanation of what this error means
- "fix": Specific steps to fix this error
- "learning": What the user should learn from this error to avoid it in the future

Keep each field concise but helpful. Focus on being educational and encouraging.
"""

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful Python programming tutor who explains errors clearly."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.3
        )

        # Extract JSON from response
        content = response.choices[0].message.content.strip()

        # Try to parse as JSON
        if content.startswith('{') and content.endswith('}'):
            result = json.loads(content)
            # Validate required fields
            if all(key in result for key in ['explanation', 'fix', 'learning']):
                return result

        # If JSON parsing fails, extract manually
        return _parse_ai_response(content)

    except Exception as e:
        print(f"AI API error: {e}")
        return None

def _parse_ai_response(content: str) -> dict:
    """Parse AI response if JSON parsing fails."""
    try:
        # Simple parsing for common formats
        lines = content.split('\n')
        explanation = ""
        fix = ""
        learning = ""

        current_section = None
        for line in lines:
            line = line.strip()
            if line.lower().startswith('explanation:') or '"explanation":' in line.lower():
                current_section = 'explanation'
                explanation = line.split(':', 1)[1].strip().strip('"').strip(',')
            elif line.lower().startswith('fix:') or '"fix":' in line.lower():
                current_section = 'fix'
                fix = line.split(':', 1)[1].strip().strip('"').strip(',')
            elif line.lower().startswith('learning:') or '"learning":' in line.lower():
                current_section = 'learning'
                learning = line.split(':', 1)[1].strip().strip('"').strip(',')
            elif current_section and line:
                if current_section == 'explanation':
                    explanation += " " + line.strip().strip('"').strip(',')
                elif current_section == 'fix':
                    fix += " " + line.strip().strip('"').strip(',')
                elif current_section == 'learning':
                    learning += " " + line.strip().strip('"').strip(',')

        if explanation or fix or learning:
            return {
                "explanation": explanation or "AI explanation not available",
                "fix": fix or "Check your code syntax and logic",
                "learning": learning or "Practice debugging step by step"
            }
    except:
        pass

    return None

def explain_error(error_message: str) -> dict:
    """Return explanation, fix, and learning. Uses AI first, then rule-based fallback."""
    # Try AI explanation first
    ai_result = explain_error_with_ai(error_message)
    if ai_result:
        return ai_result

    # Fallback to rule-based system
    return explain_error_rule_based(error_message)

def explain_error_rule_based(error_message: str) -> dict:
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
