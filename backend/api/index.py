import json
import os
from error_rules import explain_error
from models import ErrorInput, ErrorOutput

def handler(request):
    """Vercel serverless function handler for the explain endpoint."""

    # Set OpenAI API key from environment if available
    if hasattr(request, 'headers') and 'openai-api-key' in request.headers:
        os.environ['OPENAI_API_KEY'] = request.headers['openai-api-key']

    # Only allow POST requests
    if request.method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'detail': 'Method not allowed'})
        }

    try:
        # Parse the request body
        if hasattr(request, 'body') and request.body:
            body = json.loads(request.body)
        else:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'detail': 'No request body'})
            }

        # Validate input
        error_input = ErrorInput(**body)

        if not error_input.error or not error_input.error.strip():
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'detail': 'Error text cannot be empty'})
            }

        # Process the error
        result = explain_error(error_input.error)

        # Return the response
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, openai-api-key'
            },
            'body': json.dumps(result)
        }

    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'detail': 'Invalid JSON'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'detail': f'Internal server error: {str(e)}'})
        }