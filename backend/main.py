# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models import ErrorInput, ErrorOutput
from error_rules import explain_error

app = FastAPI(title="Bug Explainer AI")

# allow frontend origin on localhost:3000 (create-react-app default)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/explain", response_model=ErrorOutput)
def explain(error_input: ErrorInput):
    """Explain the posted error message with explanation, fix, and learning."""
    if not error_input.error or not error_input.error.strip():
        raise HTTPException(status_code=400, detail="Error text cannot be empty")

    result = explain_error(error_input.error)
    return result
